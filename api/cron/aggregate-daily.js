import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Vercel Cron Secret for authentication
const CRON_SECRET = process.env.CRON_SECRET;

export default async function handler(req, res) {
  try {
    // Verify cron secret if set
    if (CRON_SECRET) {
      const authHeader = req.headers['authorization'];
      if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    console.log('[CRON] Starting daily aggregation and cleanup...');

    // Clean up old raw events (keep only last 7 days)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);

    const deletedEvents = await prisma.rawEvent.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate,
        },
      },
    });

    console.log(`[CRON] Deleted ${deletedEvents.count} old raw events`);

    // Optional: Pre-calculate weekly/monthly aggregates here if needed
    // For now we just clean up old events

    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      deletedEvents: deletedEvents.count,
    };

    console.log('[CRON] Daily aggregation completed:', result);

    return res.status(200).json(result);
  } catch (e) {
    console.error('[CRON] Error during daily aggregation:', e);
    return res.status(500).json({
      error: e.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    await prisma.$disconnect();
  }
}
