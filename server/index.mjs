// Minimal Express-like server using native Node (if you run a server) for Meta CAPI forwarding.
// This is a placeholder; integrate with your actual deployment environment (e.g. serverless function).

import http from 'http';
import crypto from 'crypto';
import { createHash } from 'crypto';
import { kv } from '@vercel/kv';

const PORT = process.env.PORT || 8787;
const FB_PIXEL_ID = process.env.FB_PIXEL_ID || process.env.VITE_FB_PIXEL_ID; // allow reuse
const FB_CAPI_TOKEN = process.env.FB_CAPI_TOKEN; // You must set this (System User token)
const ANALYTICS_PASSWORD = process.env.ANALYTICS_PASSWORD; // Optional password for analytics page

function json(res, code, data) {
	res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
	res.end(JSON.stringify(data));
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

async function forwardToCapi(eventName, payload, req) {
	if (!FB_PIXEL_ID || !FB_CAPI_TOKEN) return { skipped: true, reason: 'missing pixel or token' };
	const url = `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events`;
	// Basic enrichment
	const userAgent = req.headers['user-agent'];
	const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
	const evt = {
		event_name: eventName,
		event_time: Math.floor(Date.now() / 1000),
		event_id: payload.event_id,
		action_source: 'website',
		custom_data: {
			value: payload.value,
			currency: payload.currency,
			contents: payload.contents,
			content_type: payload.content_type,
			// optional: add order_id / content_category later
		},
		user_data: {
			// hashed identifiers (add when you have them: emails, phones)
			client_user_agent: userAgent,
			client_ip_address: ip,
			fbp: payload.fbp,
			fbc: payload.fbc,
		},
		custom_properties: {
			page: payload.page,
			referrer: payload.referrer,
			fbclid: payload.fbclid,
		},
	};

	// Basic hashing placeholder if you add emails/phones later
	const requestBody = { data: [evt] };
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...requestBody, access_token: FB_CAPI_TOKEN })
	});
	const text = await res.text();
	return { status: res.status, body: text };
}

// ============= Analytics KV Functions =============

// Detect country from Vercel headers
function getCountry(req) {
	// Vercel provides x-vercel-ip-country header
	const country = req.headers['x-vercel-ip-country'] || 'XX';
	const topCountries = ['FR', 'BE', 'CH', 'CA', 'US'];
	return topCountries.includes(country) ? country : 'other';
}

// Increment multiple metrics in KV
async function incrementMetrics(metrics) {
	if (!metrics || metrics.length === 0) return;
	try {
		// Increment all metrics in parallel
		await Promise.all(
			metrics.map(metric => kv.incr(metric).catch(e => {
				console.error(`Failed to increment ${metric}:`, e);
			}))
		);
	} catch (e) {
		console.error('Failed to increment metrics:', e);
	}
}

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
			'events:view_content',
			'events:add_to_cart',
			'events:initiate_checkout',
			// QR Codes
			'qr:flyers:scans',
			// Clicks
			'clicks:cta',
		];

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

const server = http.createServer(async (req, res) => {
	// Enable CORS for local development
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
	}

	// Analytics tracking endpoint
	if (req.method === 'POST' && req.url === '/api/analytics/track') {
		let body = '';
		req.on('data', chunk => { body += chunk; if (body.length > 1e6) req.destroy(); });
		req.on('end', async () => {
			try {
				const { event, metrics, device } = JSON.parse(body || '{}');
				if (!event) return json(res, 400, { error: 'missing event' });

				// Add country metric
				const country = getCountry(req);
				const allMetrics = [...(metrics || []), `country:${country}`];

				// Increment metrics in KV
				await incrementMetrics(allMetrics);

				json(res, 200, { ok: true });
			} catch (e) {
				json(res, 500, { error: e.message });
			}
		});
		return;
	}

	// Get analytics stats endpoint
	if (req.method === 'GET' && req.url === '/api/analytics/stats') {
		try {
			// Optional: check password if set
			const authHeader = req.headers['authorization'];
			if (ANALYTICS_PASSWORD) {
				const providedPassword = authHeader?.replace('Bearer ', '');
				if (providedPassword !== ANALYTICS_PASSWORD) {
					return json(res, 401, { error: 'unauthorized' });
				}
			}

			const stats = await getAnalyticsStats();
			json(res, 200, stats);
		} catch (e) {
			json(res, 500, { error: e.message });
		}
		return;
	}

	// Original Facebook CAPI endpoint
	if (req.method === 'POST' && req.url === '/api/track') {
		let body = '';
		req.on('data', chunk => { body += chunk; if (body.length > 1e6) req.destroy(); });
		req.on('end', async () => {
			try {
				const { eventName, payload } = JSON.parse(body || '{}');
				if (!eventName) return json(res, 400, { error: 'missing eventName' });

				// Track to KV for analytics (if KV is configured)
				try {
					const metrics = [];
					if (eventName === 'ViewContent') metrics.push('events:view_content');
					if (eventName === 'AddToCart') metrics.push('events:add_to_cart');
					if (eventName === 'InitiateCheckout') metrics.push('events:initiate_checkout');
					if (metrics.length > 0) {
						const country = getCountry(req);
						await incrementMetrics([...metrics, `country:${country}`]);
					}
				} catch (kvError) {
					// KV not configured in local dev - that's ok
					console.debug('KV tracking skipped:', kvError.message);
				}

				const capi = await forwardToCapi(eventName, payload || {}, req);
				json(res, 200, { ok: true, capi });
			} catch (e) {
				json(res, 500, { error: e.message });
			}
		});
		return;
	}

	// health
	if (req.url === '/health') return json(res, 200, { ok: true });
	res.writeHead(404); res.end('Not found');
});

if (process.env.ENABLE_SERVER) {
	server.listen(PORT, () => {
		console.log(`Server listening on :${PORT}`);
	});
}

export {}; // keep module type
