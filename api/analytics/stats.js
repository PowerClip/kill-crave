import { kv } from '@vercel/kv';

const ANALYTICS_PASSWORD = process.env.ANALYTICS_PASSWORD;

// Get all analytics stats
async function getAnalyticsStats() {
  try {
    const keys = [
      // Visits
      'visits:total',
      'visits:unique',
      // Devices
      'device:iphone',
      'device:android',
      'device:mac',
      'device:windows',
      'device:mobile',
      'device:desktop',
      // Countries
      'country:FR',
      'country:BE',
      'country:CH',
      'country:CA',
      'country:US',
      'country:other',
      // Events
      'events:ViewContent',
      'events:AddToCart',
      'events:InitiateCheckout',
      'events:Purchase',
      // Clicks
      'clicks:cta',
    ];

    // Get all campaign slugs
    const campaignSlugs = await kv.smembers('campaigns:list');

    // Add QR code metrics for each campaign
    if (campaignSlugs && campaignSlugs.length > 0) {
      campaignSlugs.forEach(slug => {
        keys.push(`qr:${slug}:scans`);
      });
    }

    // Also keep legacy flyers for backward compatibility
    keys.push('qr:flyers:scans');

    const values = await Promise.all(
      keys.map(async key => {
        const val = await kv.get(key);
        return [key, val || 0];
      })
    );

    return Object.fromEntries(values);
  } catch (e) {
    console.error('Failed to fetch analytics stats:', e);
    return {};
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Optional: check password if set
    const authHeader = req.headers['authorization'];
    if (ANALYTICS_PASSWORD) {
      const providedPassword = authHeader?.replace('Bearer ', '');
      if (providedPassword !== ANALYTICS_PASSWORD) {
        return res.status(401).json({ error: 'unauthorized' });
      }
    }

    const stats = await getAnalyticsStats();
    return res.status(200).json(stats);
  } catch (e) {
    console.error('Stats error:', e);
    return res.status(500).json({ error: e.message });
  }
}
