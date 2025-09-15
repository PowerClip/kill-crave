// Minimal GTM helper utilities
export type GTMEvent = Record<string, any> & { event: string };

export function gtmPush(ev: GTMEvent) {
  try {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(ev);
  } catch {
    // no-op
  }
}

export function trackCTA(id: string, text: string, destination?: string, section?: string) {
  gtmPush({
    event: 'cta_click',
    cta_id: id,
    cta_text: text,
    cta_destination: destination,
    cta_section: section,
  });
}

export function trackBeginCheckout(params: {
  currency: string;
  value?: number;
  item_id?: string;
  item_name?: string;
  quantity?: number;
  price?: number;
}) {
  const { currency, value, item_id, item_name, quantity, price } = params;
  gtmPush({
    event: 'begin_checkout',
    ecommerce: {
      currency,
      value,
      items: item_id
        ? [
            {
              item_id,
              item_name,
              quantity,
              price,
            },
          ]
        : undefined,
    },
  });
}

export function trackAddToCartGTM(params: {
  currency: string;
  value?: number;
  item_id?: string;
  item_name?: string;
  quantity?: number;
  price?: number;
}) {
  const { currency, value, item_id, item_name, quantity, price } = params;
  gtmPush({
    event: 'add_to_cart',
    ecommerce: {
      currency,
      value,
      items: item_id
        ? [
            {
              item_id,
              item_name,
              quantity,
              price,
            },
          ]
        : undefined,
    },
  });
}
