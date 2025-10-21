import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

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
    const { slug } = req.body;

    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    // Increment scan counter for campaign
    const campaign = await prisma.campaign.update({
      where: { slug },
      data: {
        scans: {
          increment: 1,
        },
      },
    }).catch(() => null);

    if (!campaign) {
      // Campaign not found, but don't fail the tracking
      console.warn(`Campaign not found: ${slug}`);
      return res.status(200).json({ success: true, scans: 0 });
    }

    return res.status(200).json({
      success: true,
      scans: campaign.scans,
    });
  } catch (e) {
    console.error('Increment scan error:', e);
    // Don't fail tracking even if increment fails
    return res.status(200).json({ success: true, error: e.message });
  } finally {
    await prisma.$disconnect();
  }
}
