import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ANALYTICS_PASSWORD = process.env.ANALYTICS_PASSWORD;

// Generate a unique slug from campaign name
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD') // Normalize to decompose accents
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
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

    const { name, destination, description } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Default destination to Kill Crave homepage
    const finalDestination = destination && destination.trim() ? destination.trim() : 'https://www.kill-crave.com';

    // Generate slug
    let slug = generateSlug(name);

    // Check if slug already exists
    const existingCampaign = await prisma.campaign.findUnique({
      where: { slug },
    });

    if (existingCampaign) {
      // Add a timestamp suffix to make it unique
      const timestamp = Date.now().toString(36);
      slug = `${slug}-${timestamp}`;
    }

    // Create campaign in Prisma
    const campaign = await prisma.campaign.create({
      data: {
        slug,
        name: name.trim(),
        destination: finalDestination,
        description: description?.trim() || '',
        scans: 0,
      },
    });

    return res.status(201).json({
      success: true,
      campaign: {
        ...campaign,
        createdAt: campaign.createdAt.toISOString(),
      },
    });
  } catch (e) {
    console.error('Create campaign error:', e);
    return res.status(500).json({ error: e.message });
  } finally {
    await prisma.$disconnect();
  }
}
