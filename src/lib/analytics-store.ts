// Client-side analytics tracking to Vercel KV via API

export interface DeviceInfo {
  type: 'iphone' | 'android' | 'mac' | 'windows' | 'other';
  isMobile: boolean;
}

export function detectDevice(): DeviceInfo {
  const ua = navigator.userAgent.toLowerCase();

  // Mobile detection
  const isMobile = /mobile|android|iphone|ipad|ipod/.test(ua);

  // Device type detection
  if (/iphone|ipad|ipod/.test(ua)) {
    return { type: 'iphone', isMobile: true };
  }
  if (/android/.test(ua) && isMobile) {
    return { type: 'android', isMobile: true };
  }
  if (/mac os x/.test(ua) && !isMobile) {
    return { type: 'mac', isMobile: false };
  }
  if (/windows/.test(ua)) {
    return { type: 'windows', isMobile: false };
  }

  return { type: 'other', isMobile };
}

export interface TrackEventPayload {
  event: string;
  metrics?: string[]; // list of metrics to increment
  device?: DeviceInfo;
  timestamp?: number;
}

// Check if we're in production (deployed on Vercel)
function isProduction() {
  return window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
}

// Send tracking data to server
export async function trackToKV(payload: TrackEventPayload) {
  // Skip tracking in local development
  if (!isProduction()) {
    console.debug('[Dev] Analytics KV tracking skipped (local environment)');
    return;
  }

  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        device: payload.device || detectDevice(),
        timestamp: payload.timestamp || Date.now(),
      }),
      keepalive: true,
    });
  } catch (e) {
    console.debug('Analytics KV tracking failed', e);
  }
}

// Track a page visit with device info
export function trackVisit() {
  const device = detectDevice();
  const metrics = [
    'visits:total',
    `device:${device.type}`,
    device.isMobile ? 'device:mobile' : 'device:desktop',
  ];

  trackToKV({
    event: 'page_view',
    metrics,
  });
}

// Track a CTA click
export function trackCTAClick(location: string) {
  trackToKV({
    event: 'cta_click',
    metrics: ['clicks:cta', `clicks:cta:${location}`],
  });
}

// Fetch stats from server
export async function fetchAnalyticsStats() {
  // In local development, return mock data
  if (!isProduction()) {
    console.warn('[Dev] Using mock analytics data (local environment)');
    return {
      'visits:total': 0,
      'visits:unique': 0,
      'device:iphone': 0,
      'device:android': 0,
      'device:mac': 0,
      'device:windows': 0,
      'device:mobile': 0,
      'device:desktop': 0,
      'country:FR': 0,
      'country:BE': 0,
      'country:CH': 0,
      'country:CA': 0,
      'country:US': 0,
      'country:other': 0,
      'events:ViewContent': 0,
      'events:AddToCart': 0,
      'events:InitiateCheckout': 0,
      'events:Purchase': 0,
      'qr:flyers:scans': 0,
      'clicks:cta': 0,
    };
  }

  try {
    const response = await fetch('/api/analytics/stats');
    if (!response.ok) throw new Error('Failed to fetch stats');
    return await response.json();
  } catch (e) {
    console.error('Failed to fetch analytics stats', e);
    return null;
  }
}
