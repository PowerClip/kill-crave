import { kv } from '@vercel/kv';

// Determine country based on request headers (Vercel auto-populates X-Vercel-IP-Country)
function getCountryCode(req) {
  const country = req.headers['x-vercel-ip-country'] || 'unknown';
  const tracked = ['FR', 'BE', 'CH', 'CA', 'US'];
  return tracked.includes(country) ? country : 'other';
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event, metrics, device } = req.body;

    if (!event) {
      return res.status(400).json({ error: 'Missing event name' });
    }

    // Auto-detect country
    const country = getCountryCode(req);
    const countryMetric = `country:${country}`;

    // Combine all metrics to increment
    const allMetrics = [
      ...(metrics || []),
      countryMetric,
    ];

    // Increment all metrics in parallel
    await Promise.all(
      allMetrics.map(async metric => {
        try {
          await kv.incr(metric);
        } catch (e) {
          console.error(`Failed to increment ${metric}:`, e);
        }
      })
    );

    return res.status(200).json({ success: true, tracked: allMetrics.length });
  } catch (e) {
    console.error('Track error:', e);
    return res.status(500).json({ error: e.message });
  }
}
