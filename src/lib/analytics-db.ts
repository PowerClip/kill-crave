import { prisma } from './prisma';

/**
 * Increment a daily metric for a specific date
 * If the metric doesn't exist for that date, it will be created
 */
export async function incrementDailyMetric(
  date: Date | string,
  metric: string,
  amount: number = 1
): Promise<void> {
  const dateString = typeof date === 'string' ? date : date.toISOString().split('T')[0];

  await prisma.dailyMetric.upsert({
    where: {
      date_metric: {
        date: new Date(dateString),
        metric,
      },
    },
    update: {
      value: {
        increment: amount,
      },
    },
    create: {
      date: new Date(dateString),
      metric,
      value: amount,
    },
  });
}

/**
 * Increment multiple metrics for today
 */
export async function incrementTodayMetrics(metrics: string[]): Promise<void> {
  const today = new Date().toISOString().split('T')[0];

  await Promise.all(
    metrics.map(metric => incrementDailyMetric(today, metric))
  );
}

/**
 * Track a raw event (for audit and detailed analytics)
 */
export async function trackRawEvent(data: {
  eventName: string;
  metric?: string;
  country?: string;
  device?: string;
  isMobile?: boolean;
  metadata?: any;
}): Promise<void> {
  await prisma.rawEvent.create({
    data: {
      eventName: data.eventName,
      metric: data.metric,
      country: data.country,
      device: data.device,
      isMobile: data.isMobile ?? false,
      metadata: data.metadata,
    },
  });
}

/**
 * Get daily stats for a date range
 */
export async function getDailyStats(
  startDate: Date | string,
  endDate: Date | string
): Promise<{
  daily: Array<{ date: string; metric: string; value: number }>;
  totals: Record<string, number>;
}> {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // Get all daily metrics in the date range
  const dailyMetrics = await prisma.dailyMetric.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
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

  // Format daily data
  const daily = dailyMetrics.map(m => ({
    date: m.date.toISOString().split('T')[0],
    metric: m.metric,
    value: m.value,
  }));

  // Calculate totals by summing all values for each metric
  const totals: Record<string, number> = {};
  for (const metric of dailyMetrics) {
    if (!totals[metric.metric]) {
      totals[metric.metric] = 0;
    }
    totals[metric.metric] += metric.value;
  }

  return { daily, totals };
}

/**
 * Get stats for today
 */
export async function getTodayStats(): Promise<Record<string, number>> {
  const today = new Date().toISOString().split('T')[0];
  const { totals } = await getDailyStats(today, today);
  return totals;
}

/**
 * Get stats grouped by date for charting
 */
export async function getStatsByDate(
  startDate: Date | string,
  endDate: Date | string,
  metrics: string[]
): Promise<Array<{ date: string; [key: string]: any }>> {
  const { daily } = await getDailyStats(startDate, endDate);

  // Group by date
  const grouped: Record<string, Record<string, number>> = {};

  for (const item of daily) {
    if (!metrics.includes(item.metric)) continue;

    if (!grouped[item.date]) {
      grouped[item.date] = {};
    }
    grouped[item.date][item.metric] = item.value;
  }

  // Convert to array format for recharts
  return Object.entries(grouped).map(([date, values]) => ({
    date,
    ...values,
  }));
}

/**
 * Get the last N days of stats
 */
export async function getLastNDaysStats(days: number): Promise<{
  daily: Array<{ date: string; metric: string; value: number }>;
  totals: Record<string, number>;
}> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return getDailyStats(startDate, endDate);
}

/**
 * Clean up old raw events (keep only last N days)
 */
export async function cleanupOldEvents(daysToKeep: number = 7): Promise<number> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

  const result = await prisma.rawEvent.deleteMany({
    where: {
      timestamp: {
        lt: cutoffDate,
      },
    },
  });

  return result.count;
}
