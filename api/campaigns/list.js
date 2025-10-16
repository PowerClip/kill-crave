import { kv } from '@vercel/kv';

const ANALYTICS_PASSWORD = process.env.ANALYTICS_PASSWORD;

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
    // Check password
    const authHeader = req.headers['authorization'];
    if (ANALYTICS_PASSWORD) {
      const providedPassword = authHeader?.replace('Bearer ', '');
      if (providedPassword !== ANALYTICS_PASSWORD) {
        return res.status(401).json({ error: 'unauthorized' });
      }
    }

    // Get all campaign slugs
    const slugs = await kv.smembers('campaigns:list');

    if (!slugs || slugs.length === 0) {
      return res.status(200).json({ campaigns: [] });
    }

    // Get all campaigns data
    const campaignsData = await Promise.all(
      slugs.map(async (slug) => {
        const campaign = await kv.hgetall(`campaign:${slug}`);

        // Get scan count from analytics
        const scans = await kv.get(`qr:${slug}:scans`) || 0;

        if (campaign && Object.keys(campaign).length > 0) {
          return {
            ...campaign,
            scans: parseInt(scans)
          };
        }
        return null;
      })
    );

    // Filter out null campaigns (in case some were deleted)
    const campaigns = campaignsData.filter(c => c !== null);

    // Sort by creation date (newest first)
    campaigns.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

    return res.status(200).json({ campaigns });
  } catch (e) {
    console.error('List campaigns error:', e);
    return res.status(500).json({ error: e.message });
  }
}
