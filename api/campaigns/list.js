import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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

    // Get all campaigns from Prisma
    const campaigns = await prisma.campaign.findMany({
      select: {
        slug: true,
        name: true,
        destination: true,
        description: true,
        scans: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format dates to ISO strings for JSON serialization
    const formattedCampaigns = campaigns.map(campaign => ({
      ...campaign,
      createdAt: campaign.createdAt.toISOString(),
    }));

    return res.status(200).json({ campaigns: formattedCampaigns });
  } catch (e) {
    console.error('List campaigns error:', e);
    return res.status(500).json({ error: e.message });
  } finally {
    await prisma.$disconnect();
  }
}
