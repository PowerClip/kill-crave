// Lightweight Shopify Storefront API helpers
// All read operations use the public Storefront token (can live in client env vars)
// Mutations here are only cart related (safe). DO NOT put Admin API logic client-side.

export interface ShopifyMoneyV2 {
  amount: string; // string per Storefront API
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoneyV2;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  images: { nodes: ShopifyImage[] };
  variants: { nodes: ShopifyProductVariant[] };
}

interface ProductQueryResult {
  product: ShopifyProduct | null;
}

const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined;
const API_VERSION = (import.meta.env.VITE_SHOPIFY_API_VERSION as string) || "2025-01";

function invariant(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  invariant(DOMAIN, "Missing VITE_SHOPIFY_STORE_DOMAIN env var");
  invariant(STOREFRONT_TOKEN, "Missing VITE_SHOPIFY_STOREFRONT_TOKEN env var");

  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify network error ${res.status}: ${text}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join("; "));
  }
  return json.data as T;
}

// Product by handle
const PRODUCT_QUERY = `#graphql\nquery ProductByHandle($handle: String!) {\n  product(handle: $handle) {\n    id\n    title\n    description\n    images(first:10){ nodes { url altText } }\n    variants(first:10){ nodes { id title availableForSale price { amount currencyCode } } }\n  }\n}`;

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<ProductQueryResult>(PRODUCT_QUERY, { handle });
  return data.product;
}

// Cart create (single or multiple lines)
interface CartCreateResult {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
}

const CART_CREATE = `#graphql\nmutation CartCreate($lines: [CartLineInput!]!) {\n  cartCreate(input:{ lines:$lines }) {\n    cart { id checkoutUrl }\n    userErrors { field message }\n  }\n}`;

export async function createCartAndGetCheckout(variantId: string, quantity = 1): Promise<string> {
  const data = await shopifyFetch<CartCreateResult>(CART_CREATE, {
    lines: [{ quantity, merchandiseId: variantId }],
  });
  const err = data.cartCreate.userErrors?.[0];
  if (err) throw new Error(err.message);
  if (!data.cartCreate.cart?.checkoutUrl) throw new Error("Checkout URL manquant");
  return data.cartCreate.cart.checkoutUrl;
}

export function formatMoney(m: ShopifyMoneyV2 | undefined, fallback = ""): string {
  if (!m) return fallback;
  const value = parseFloat(m.amount);
  if (Number.isNaN(value)) return fallback;
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: m.currencyCode }).format(value);
}
