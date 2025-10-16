import { kv } from '@vercel/kv';

const ANALYTICS_PASSWORD = process.env.ANALYTICS_PASSWORD;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check password
    const authHeader = req.headers['authorization'];
    if (ANALYTICS_PASSWORD) {
      const providedPassword = authHeader?.replace('Bearer ', '');
      if (providedPassword !== ANALYTICS_PASSWORD) {
        return res.status(401).json({ error: 'unauthorized' });
      }
    }

    const { slug } = req.body;

    if (!slug || !slug.trim()) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    // Check if campaign exists
    const campaign = await kv.hgetall(`campaign:${slug}`);

    if (!campaign || Object.keys(campaign).length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Delete campaign data
    await kv.del(`campaign:${slug}`);

    // Remove from campaigns list
    await kv.srem('campaigns:list', slug);

    // Note: We don't delete the analytics data (qr:${slug}:scans) to preserve historical data

    return res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (e) {
    console.error('Delete campaign error:', e);
    return res.status(500).json({ error: e.message });
  }
}
