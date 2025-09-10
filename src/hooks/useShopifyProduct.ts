import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";

interface UseShopifyProductOptions {
  handle?: string; // allow override for future extensibility
  enabled?: boolean;
}

// Centralized hook so multiple sections (Hero / Offer) share cached data.
export function useShopifyProduct({ handle, enabled = true }: UseShopifyProductOptions = {}) {
  const finalHandle = handle || (import.meta.env.VITE_SHOPIFY_PRODUCT_HANDLE as string) || "bye-sweetie";

  const query = useQuery<ShopifyProduct | null, Error>({
    queryKey: ["shopifyProduct", finalHandle],
    queryFn: () => fetchProductByHandle(finalHandle),
    enabled: enabled && Boolean(finalHandle),
    staleTime: 1000 * 60 * 5,
  });

  const primaryVariant = query.data?.variants.nodes[0];

  return {
    ...query,
    product: query.data,
    variant: primaryVariant,
    price: primaryVariant?.price,
    available: Boolean(primaryVariant?.availableForSale),
  };
}
