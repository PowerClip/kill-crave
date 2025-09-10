// Minimal Express-like server using native Node (if you run a server) for Meta CAPI forwarding.
// This is a placeholder; integrate with your actual deployment environment (e.g. serverless function).

import http from 'http';
import crypto from 'crypto';
import { createHash } from 'crypto';

const PORT = process.env.PORT || 8787;
const FB_PIXEL_ID = process.env.FB_PIXEL_ID || process.env.VITE_FB_PIXEL_ID; // allow reuse
const FB_CAPI_TOKEN = process.env.FB_CAPI_TOKEN; // You must set this (System User token)

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

const server = http.createServer(async (req, res) => {
	if (req.method === 'POST' && req.url === '/api/track') {
		let body = '';
		req.on('data', chunk => { body += chunk; if (body.length > 1e6) req.destroy(); });
		req.on('end', async () => {
			try {
				const { eventName, payload } = JSON.parse(body || '{}');
				if (!eventName) return json(res, 400, { error: 'missing eventName' });
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
