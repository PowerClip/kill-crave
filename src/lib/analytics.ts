// Centralized analytics: Facebook Pixel (client) + server-side CAPI forwarding

interface TrackEventOptions {
  value?: number;
  currency?: string;
  contents?: Array<{ id: string; quantity?: number; item_price?: number }>;
  content_type?: string;
  event_id?: string; // used to dedupe pixel vs CAPI
  test_event_code?: string; // for FB test events
  external_id?: string; // hashed user identifier (future)
}

// Simple UUID v4 (not cryptographically perfect but fine for event correlation)
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getBrowserIds() {
  // _fbp cookie pattern: fb.1.<creation_time>.<random>
  const cookies = document.cookie.split(/;\s*/).reduce((acc, c) => { const [k,v] = c.split('='); acc[k] = v; return acc; }, {} as Record<string,string|undefined>);
  const fbp = cookies['_fbp'];
  // _fbc only present after clickthru with fbclid param; we can synthesize if fbclid exists in URL (FB recommended fallback)
  let fbc = cookies['_fbc'];
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  if (!fbc && fbclid) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return { fbp, fbc, fbclid };
}

export function track(eventName: string, opts: TrackEventOptions = {}) {
  const event_id = opts.event_id || uuidv4();
  const { fbp, fbc, fbclid } = typeof document !== 'undefined' ? getBrowserIds() : { fbp: undefined, fbc: undefined, fbclid: undefined };
  const payload = {
    ...opts,
    event_id,
    fbp,
    fbc,
    fbclid,
    page: typeof location !== 'undefined' ? location.href : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    ts: Date.now(),
  };
  try {
    if (window.fbq) {
      window.fbq('track', eventName, payload, { eventID: event_id });
    }
  } catch (e) {
    console.debug('Pixel track failed', e);
  }

  // Fire-and-forget to CAPI endpoint (server will enrich)
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName, payload }),
    keepalive: true,
  }).catch(() => {});
}

// --- Dedupe helpers (localStorage) -------------------------------------------------
const DEDUPE_PREFIX = 'fb_evt_once:'; // key pattern: fb_evt_once:EventName:CustomKey
const DEDUPE_TTL_MS = 1000 * 60 * 30; // 30 min (adjust as needed)

function now() { return Date.now(); }

function getStore(): Storage | undefined {
  try { return window.localStorage; } catch { return undefined; }
}

function hasRecentFire(key: string) {
  const store = getStore();
  if (!store) return false;
  try {
    const raw = store.getItem(key);
    if (!raw) return false;
    const { t } = JSON.parse(raw);
    if (typeof t !== 'number') return false;
    if (now() - t > DEDUPE_TTL_MS) { store.removeItem(key); return false; }
    return true;
  } catch { return false; }
}

function markFire(key: string) {
  const store = getStore();
  if (!store) return;
  try { store.setItem(key, JSON.stringify({ t: now() })); } catch {}
}

export function trackOnce(eventName: string, uniqueKey: string, opts: TrackEventOptions = {}) {
  const key = `${DEDUPE_PREFIX}${eventName}:${uniqueKey}`;
  if (hasRecentFire(key)) return; // skip duplicate within TTL
  track(eventName, opts);
  markFire(key);
}

export function trackViewContent(variantId?: string, price?: number, currency = 'EUR') {
  track('ViewContent', {
    contents: variantId ? [{ id: variantId, quantity: 1, item_price: price }] : undefined,
    content_type: 'product',
    value: price,
    currency,
  });
}

export function trackInitiateCheckout(variantId: string, price?: number, currency = 'EUR') {
  track('InitiateCheckout', {
    contents: [{ id: variantId, quantity: 1, item_price: price }],
    content_type: 'product',
    value: price,
    currency,
  });
}

export function trackAddToCart(variantId: string, quantity: number, price?: number, currency = 'EUR') {
  track('AddToCart', {
    contents: [{ id: variantId, quantity, item_price: price }],
    content_type: 'product',
    value: price ? price * quantity : undefined,
    currency,
  });
}

declare global {
  interface Window { fbq?: (...args: any[]) => void; __PIXEL_ENABLED__?: boolean }
}
