import { createHmac } from 'crypto';
import { kv } from '@vercel/kv';

// Get Shopify webhook secret from env
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;

// Validate Shopify HMAC signature
function verifyShopifyWebhook(body, hmacHeader) {
  if (!SHOPIFY_WEBHOOK_SECRET) {
    console.error('SHOPIFY_WEBHOOK_SECRET not configured');
    return false;
  }

  const hash = createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');

  return hash === hmacHeader;
}

// Get country from request headers
function getCountryCode(req) {
  const country = req.headers['x-vercel-ip-country'] || 'unknown';
  const tracked = ['FR', 'BE', 'CH', 'CA', 'US'];
  return tracked.includes(country) ? country : 'other';
}

// Forward to Facebook CAPI
async function forwardToCapi(eventName, payload) {
  const FB_PIXEL_ID = process.env.FB_PIXEL_ID || process.env.VITE_FB_PIXEL_ID;
  const FB_CAPI_TOKEN = process.env.FB_CAPI_TOKEN;

  if (!FB_PIXEL_ID || !FB_CAPI_TOKEN) {
    console.warn('FB CAPI not configured, skipping');
    return { skipped: true };
  }

  const url = `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events`;

  const evt = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: payload.event_id,
    action_source: 'website',
    custom_data: {
      value: payload.value,
      currency: payload.currency,
      contents: payload.contents,
      content_type: 'product',
    },
    user_data: {
      // Server-side webhooks don't have client browser context
      // Could hash customer email/phone from Shopify order and add here
    },
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [evt],
        access_token: FB_CAPI_TOKEN
      })
    });
    const text = await res.text();
    return { status: res.status, body: text };
  } catch (error) {
    console.error('CAPI forward error:', error);
    return { error: error.message };
  }
}

// Vercel config to get raw body for HMAC validation
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read raw body
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get HMAC header from Shopify
    const hmacHeader = req.headers['x-shopify-hmac-sha256'];

    if (!hmacHeader) {
      console.error('Missing HMAC header');
      return res.status(401).json({ error: 'Missing HMAC header' });
    }

    // Get raw body for HMAC validation
    const rawBody = await getRawBody(req);

    // Verify webhook authenticity
    if (!verifyShopifyWebhook(rawBody, hmacHeader)) {
      console.error('Invalid HMAC signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Parse order data
    const order = JSON.parse(rawBody);

    console.log('Shopify order received:', {
      id: order.id,
      name: order.name,
      total: order.total_price,
    });

    // Extract order details
    const transactionId = order.name || order.id?.toString(); // Order #1234
    const totalValue = parseFloat(order.total_price) || 0;
    const currency = order.currency || 'EUR';

    // Extract line items (products)
    const lineItems = order.line_items || [];
    const contents = lineItems.map(item => ({
      id: item.variant_id?.toString() || item.product_id?.toString(),
      quantity: item.quantity || 1,
      item_price: parseFloat(item.price) || 0,
    }));

    // Track Purchase event to Facebook Pixel CAPI
    const event_id = `shopify_${order.id}`;
    await forwardToCapi('Purchase', {
      event_id,
      value: totalValue,
      currency,
      contents,
      content_type: 'product',
    });

    // Track to Vercel KV analytics
    const country = getCountryCode(req);
    const metrics = [
      'events:Purchase',
      `country:${country}`,
    ];

    await Promise.all(
      metrics.map(async metric => {
        try {
          await kv.incr(metric);
        } catch (e) {
          console.error(`Failed to increment ${metric}:`, e);
        }
      })
    );

    console.log('Purchase tracked successfully:', {
      transactionId,
      totalValue,
      currency,
      itemCount: contents.length,
    });

    // Respond to Shopify (must return 200 within 5 seconds)
    return res.status(200).json({
      success: true,
      tracked: metrics.length,
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: error.message });
  }
}
