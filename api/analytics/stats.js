import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ANALYTICS_PASSWORD = process.env.ANALYTICS_PASSWORD;

// Get analytics stats for a date range
async function getAnalyticsStats(startDate, endDate) {
  try {
    // Default to last 30 days if not specified
    if (!startDate || !endDate) {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 30);
      startDate = start.toISOString().split('T')[0];
      endDate = end.toISOString().split('T')[0];
    }

    // Fetch all daily metrics in date range
    const dailyMetrics = await prisma.dailyMetric.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      select: {
        date: true,
        metric: true,
        value: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Format daily data for charts (grouped by date)
    const dailyByDate = {};
    dailyMetrics.forEach(m => {
      const dateKey = m.date.toISOString().split('T')[0];
      if (!dailyByDate[dateKey]) {
        dailyByDate[dateKey] = {};
      }
      dailyByDate[dateKey][m.metric] = m.value;
    });

    // Convert to array format
    const daily = Object.entries(dailyByDate).map(([date, metrics]) => ({
      date,
      ...metrics,
    }));

    // Calculate totals by summing all values for each metric
    const totals = {};
    dailyMetrics.forEach(m => {
      if (!totals[m.metric]) {
        totals[m.metric] = 0;
      }
      totals[m.metric] += m.value;
    });

    // Get campaigns (not date-filtered, these are totals)
    const campaigns = await prisma.campaign.findMany({
      select: {
        slug: true,
        scans: true,
      },
    });

    // Add campaign scans to totals
    campaigns.forEach(campaign => {
      totals[`qr:${campaign.slug}:scans`] = campaign.scans;
    });

    return {
      daily,
      totals,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    };
  } catch (e) {
    console.error('Failed to fetch analytics stats:', e);
    return {
      daily: [],
      totals: {},
      dateRange: { start: startDate, end: endDate },
    };
  }
}

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
    // Optional: check password if set
    const authHeader = req.headers['authorization'];
    if (ANALYTICS_PASSWORD) {
      const providedPassword = authHeader?.replace('Bearer ', '');
      if (providedPassword !== ANALYTICS_PASSWORD) {
        return res.status(401).json({ error: 'unauthorized' });
      }
    }

    // Get date range from query params
    const { start_date, end_date, totals_only } = req.query;

    const stats = await getAnalyticsStats(start_date, end_date);

    // If only totals requested (for backward compatibility)
    if (totals_only === 'true') {
      return res.status(200).json(stats.totals);
    }

    return res.status(200).json(stats);
  } catch (e) {
    console.error('Stats error:', e);
    return res.status(500).json({ error: e.message });
  } finally {
    await prisma.$disconnect();
  }
}
