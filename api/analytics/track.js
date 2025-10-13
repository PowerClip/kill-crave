import { kv } from '@vercel/kv';

// Detect country from Vercel headers
function getCountry(req) {
  const country = req.headers['x-vercel-ip-country'] || 'XX';
  const topCountries = ['FR', 'BE', 'CH', 'CA', 'US'];
  return topCountries.includes(country) ? country : 'other';
}

// Increment multiple metrics in KV
async function incrementMetrics(metrics) {
  if (!metrics || metrics.length === 0) return;
  try {
    await Promise.all(
      metrics.map(metric => kv.incr(metric).catch(e => {
        console.error(`Failed to increment ${metric}:`, e);
      }))
    );
  } catch (e) {
    console.error('Failed to increment metrics:', e);
  }
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
    const { event, metrics = [] } = req.body || {};

    if (!event) {
      return res.status(400).json({ error: 'missing event' });
    }

    // Add country metric
    const country = getCountry(req);
    const allMetrics = [...metrics, `country:${country}`];

    // Increment metrics in KV
    await incrementMetrics(allMetrics);

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Track error:', e);
    return res.status(500).json({ error: e.message });
  }
}
