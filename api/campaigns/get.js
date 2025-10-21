import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    // Get campaign data from Prisma
    const campaign = await prisma.campaign.findUnique({
      where: { slug },
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    return res.status(200).json({
      campaign: {
        ...campaign,
        createdAt: campaign.createdAt.toISOString(),
      },
    });
  } catch (e) {
    console.error('Get campaign error:', e);
    return res.status(500).json({ error: e.message });
  } finally {
    await prisma.$disconnect();
  }
}
