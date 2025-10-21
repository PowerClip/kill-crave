import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Determine country based on request headers (Vercel auto-populates X-Vercel-IP-Country)
function getCountryCode(req) {
  const country = req.headers['x-vercel-ip-country'] || 'unknown';
  const tracked = ['FR', 'BE', 'CH', 'CA', 'US'];
  return tracked.includes(country) ? country : 'other';
}

// Detect device type from user agent
function detectDevice(userAgent) {
  if (!userAgent) return { type: 'other', isMobile: false };

  const ua = userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|ipod/.test(ua);

  if (/iphone|ipad|ipod/.test(ua)) return { type: 'iphone', isMobile: true };
  if (/android/.test(ua) && isMobile) return { type: 'android', isMobile: true };
  if (/mac os x/.test(ua) && !isMobile) return { type: 'mac', isMobile: false };
  if (/windows/.test(ua)) return { type: 'windows', isMobile: false };

  return { type: 'other', isMobile };
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
    const { event, metrics, device: clientDevice } = req.body;

    if (!event) {
      return res.status(400).json({ error: 'Missing event name' });
    }

    // Auto-detect country
    const country = getCountryCode(req);
    const countryMetric = `country:${country}`;

    // Detect device if not provided
    const deviceInfo = clientDevice || detectDevice(req.headers['user-agent']);

    // Combine all metrics to increment
    const allMetrics = [
      ...(metrics || []),
      countryMetric,
    ];

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Track raw event for audit
    await prisma.rawEvent.create({
      data: {
        eventName: event,
        metric: allMetrics[0],
        country,
        device: deviceInfo.type,
        isMobile: deviceInfo.isMobile,
      },
    }).catch(e => {
      console.error('Failed to track raw event:', e);
      // Non-blocking - continue even if raw event fails
    });

    // Increment all daily metrics in parallel
    await Promise.all(
      allMetrics.map(async metric => {
        try {
          await prisma.dailyMetric.upsert({
            where: {
              date_metric: {
                date: new Date(today),
                metric,
              },
            },
            update: {
              value: {
                increment: 1,
              },
            },
            create: {
              date: new Date(today),
              metric,
              value: 1,
            },
          });
        } catch (e) {
          console.error(`Failed to increment ${metric}:`, e);
        }
      })
    );

    return res.status(200).json({ success: true, tracked: allMetrics.length });
  } catch (e) {
    console.error('Track error:', e);
    return res.status(500).json({ error: e.message });
  } finally {
    await prisma.$disconnect();
  }
}
