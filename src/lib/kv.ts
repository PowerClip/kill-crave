// Vercel KV connection - only used server-side
// Client-side will call API endpoints instead

export type AnalyticsMetric =
  | `visits:${string}`
  | `device:${string}`
  | `country:${string}`
  | `events:${string}`
  | `qr:${string}`
  | `clicks:${string}`;

export interface AnalyticsStats {
  // Visits
  'visits:total': number;
  'visits:unique': number;

  // Devices
  'device:iphone': number;
  'device:android': number;
  'device:mac': number;
  'device:windows': number;
  'device:mobile': number;
  'device:desktop': number;

  // Top countries
  'country:FR': number;
  'country:BE': number;
  'country:CH': number;
  'country:CA': number;
  'country:US': number;
  'country:other': number;

  // Events
  'events:ViewContent': number;
  'events:AddToCart': number;
  'events:InitiateCheckout': number;
  'events:Purchase': number;

  // QR Codes
  'qr:flyers:scans': number;

  // Clicks
  'clicks:cta': number;

  // Allow any other metric
  [key: string]: number;
}

// Type guard to check if we're on server side
export const isServer = () => typeof window === 'undefined';
