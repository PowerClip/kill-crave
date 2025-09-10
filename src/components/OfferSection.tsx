import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { createCartAndGetCheckout, formatMoney, ShopifyProductVariant } from "@/lib/shopify";
import { useToast } from "@/hooks/use-toast";
import { trackViewContent, trackInitiateCheckout, trackAddToCart, trackOnce } from "@/lib/analytics";

const OfferSection = () => {
  // Fetch product / variant from Shopify
  const { product, variant, price, isLoading, isError, error, available } = useShopifyProduct();
  const { toast } = useToast();

  // Use Shopify images if present; fall back to local static assets for continuity
  const fallbackImages = [
    "/images/product/1.png",
    "/images/product/2.png",
    "/images/product/3.png",
    "/images/product/4.png",
    "/images/product/5.png",
    "/images/product/6.png",
  ];
  const productImages = (product?.images.nodes.length ? product.images.nodes.map(i => i.url) : fallbackImages).slice(0, 6);

  const [activeIndex, setActiveIndex] = useState(0);
  const [creatingCheckout, setCreatingCheckout] = useState(false);

  // Detect bundle variant: priority order -> env var -> title match -> price heuristic
  const bundleVariantIdEnv = import.meta.env.VITE_SHOPIFY_BUNDLE_VARIANT_ID as string | undefined;
  let bundleVariant: ShopifyProductVariant | undefined;
  if (product) {
    if (bundleVariantIdEnv) {
      bundleVariant = product.variants.nodes.find(v => v.id === bundleVariantIdEnv);
    }
    if (!bundleVariant) {
      bundleVariant = product.variants.nodes.find(v => /pack|bundle|offert|3x|3\s*spray/i.test(v.title));
    }
    if (!bundleVariant) {
      // Heuristic: look for variant whose price is < 3 * single price AND > single price
      const singlePrice = variant?.price ? parseFloat(variant.price.amount) : undefined;
      if (singlePrice) {
        bundleVariant = product.variants.nodes
          .filter(v => v.id !== variant?.id)
          .find(v => {
            const p = parseFloat(v.price.amount);
            return p > singlePrice && p < singlePrice * 3; // discounted bundle
          });
      }
    }
  }

  type PurchaseMode = "single" | "bundle";
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>("single");

  const purchaseVariant = purchaseMode === "bundle" ? bundleVariant : variant;
  const purchaseQuantity = purchaseMode === "bundle" && bundleVariant ? 1 : purchaseMode === "bundle" ? 3 : 1;

  const priceLabel = formatMoney(price, "24,90 €");
  const bundlePriceLabel = bundleVariant ? formatMoney(bundleVariant.price, "49,90 €") : "49,90 €";

  // Track product view (deduped with localStorage for fast remounts / re-renders)
  if (variant && typeof window !== 'undefined') {
    try {
      trackOnce('ViewContent', variant.id, {
        contents: [{ id: variant.id, quantity: 1, item_price: parseFloat(variant.price.amount) }],
        content_type: 'product',
        value: parseFloat(variant.price.amount),
        currency: variant.price.currencyCode || 'EUR'
      });
    } catch {}
  }

  async function handleBuy() {
    if (!purchaseVariant?.id) {
      toast({ title: "Indisponible", description: "Variant introuvable" });
      return;
    }
    try {
      setCreatingCheckout(true);
  const unitPrice = parseFloat(purchaseVariant.price.amount);
  // Fire both AddToCart + InitiateCheckout for funnel coverage
  trackAddToCart(purchaseVariant.id, purchaseQuantity, unitPrice);
  trackInitiateCheckout(purchaseVariant.id, unitPrice);
  const url = await createCartAndGetCheckout(purchaseVariant.id, purchaseQuantity);
      window.location.href = url;
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erreur", description: e.message || "Impossible de créer le panier" });
    } finally {
      setCreatingCheckout(false);
    }
  }

  return (
    <section id="offer" className="py-24 sm:py-28 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <Badge variant="secondary" className="rounded-full px-3 py-1">Le produit</Badge>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-primary">{product?.title || "Le Spray Bye Sweetie - Arrête le sucre totalement en 30 Jours"}</h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">Le spray Bye Sweetie coupe instantanément le goût sucré pour vous aider à contrôler vos envies et retrouver une énergie stable jour après jour.</p>
        </div>
  <div className="rounded-3xl border bg-card/70 backdrop-blur p-4 sm:p-6 lg:p-8 shadow-card">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl border bg-card shadow-card">
              <img
                src={productImages[activeIndex]}
                alt="Spray Bye Sweetie - 30 Jours"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3">
              {productImages.map((src, i) => (
                <button
                  key={src}
                  aria-current={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl border bg-card transition-shadow ${
                    i === activeIndex ? "ring-2 ring-accent-lavender" : "hover:ring-1 hover:ring-accent-lavender/60"
                  }`}
                >
                  <img src={src} alt={`Aperçu produit ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Bye Sweetie</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <span>4,7/5 – Adopté par des milliers de femmes</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setPurchaseMode("single")}
                  className={`flex-1 min-w-[180px] rounded-2xl border px-4 py-3 text-left transition ${
                    purchaseMode === "single" ? "border-accent-lavender ring-2 ring-accent-lavender/40 bg-card" : "hover:border-accent-lavender/60"
                  }`}
                  disabled={isLoading}
                >
                  <div className="text-sm font-medium text-primary">1 Spray</div>
                  <div className="text-primary font-serif text-2xl font-light">
                    {isLoading ? <span className="animate-pulse">...</span> : priceLabel}
                  </div>
                  <div className="text-xs text-muted-foreground">≈ 0,83€ / jour</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPurchaseMode("bundle")}
                  className={`flex-1 min-w-[200px] rounded-2xl border px-4 py-3 text-left relative transition ${
                    purchaseMode === "bundle" ? "border-accent-hot ring-2 ring-accent-hot/40 bg-card" : "hover:border-accent-hot/60"
                  }`}
                  disabled={isLoading || (!bundleVariant && !variant)}
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    Pack 3 <span className="rounded-md bg-accent-hot/10 text-accent-hot px-2 py-0.5 text-[10px] tracking-wide">2+1 offert</span>
                  </div>
                  <div className="text-primary font-serif text-2xl font-light">
                    {isLoading ? <span className="animate-pulse">...</span> : bundlePriceLabel}
                  </div>
                  <div className="text-xs text-muted-foreground">0,55€ / jour</div>
                </button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <div>90 doses — Pour 3 repas par jour</div>
              <div>Soit 0.9€ par jour pour supprimer ton envie de sucre</div>
            </div>

            <ul className="space-y-2 text-sm sm:text-base">
              {[
                "Goût sucré neutralisé en 60 secondes",
                "Moins de grignotages, plus de contrôle 🍫",
                "Peau plus nette & ventre moins gonflé",
                "Energie au top toute la journée, sans crash",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-primary">
                  <Check className="h-4 w-4 mt-1 text-emerald-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <Button
                variant="premium"
                size="lg"
                className="w-full sm:w-auto"
                disabled={creatingCheckout || isError || !available}
                onClick={handleBuy}
              >
                {creatingCheckout
                  ? "Redirection..."
                  : isError
                    ? "Erreur produit"
                    : !available
                      ? "Indisponible"
                      : purchaseMode === "bundle"
                        ? `Acheter le Pack 3 — ${bundlePriceLabel}`
                        : `Acheter maintenant — ${priceLabel}`}
              </Button>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Livraison gratuite en 3 à 5 jours ouvrés en France
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground/80">
                Expédié sous 24h • 30j satisfait ou remboursé
              </div>
              {isError && <div className="text-xs text-destructive">{error?.message}</div>}
              {purchaseMode === "bundle" && !bundleVariant && (
                <div className="text-[11px] text-muted-foreground/70">
                  Astuce: ajoutez une variante "Pack 3" dans Shopify ou définissez VITE_SHOPIFY_BUNDLE_VARIANT_ID pour un prix exact.
                </div>
              )}
            </div>

            <Accordion type="single" collapsible className="w-full rounded-2xl border divide-y bg-card px-4 sm:px-6">
              <AccordionItem value="contenu" className="px-0">
                <AccordionTrigger className="py-4 font-serif text-primary">Ce que vous recevez</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Spray Bye Sweetie (90 doses pour 30 jours), mini-guide d’utilisation, idées de petits-déjeuners riches en protéines.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="utilisation" className="px-0">
                <AccordionTrigger className="py-4 font-serif text-primary">Comment l’utiliser</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  1–2 pulvérisations avant les moments à risque (café de l’après-midi, dessert). Effet 30–60 minutes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients" className="px-0">
                <AccordionTrigger className="py-4 font-serif text-primary">Ingrédients</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <ul className="space-y-2 list-disc list-inside pl-1">
                    <li>
                      <span className="font-medium text-primary">Plante Gymnema sylvestre</span> — connue pour neutraliser temporairement
                      les récepteurs du goût sucré sur la langue.
                    </li>
                    <li>
                      <span className="font-medium text-primary">Extrait de thé vert & zinc</span> — soutien du métabolisme énergétique, aide
                      à brûler davantage de calories au quotidien.
                    </li>
                    <li>
                      <span className="font-medium text-primary">Goût menthe</span> — sensation fraîche et propre, sans arrière-goût.
                    </li>
                  </ul>
                  <div className="mt-3">Sans colorants ni édulcorants artificiels.</div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="px-0">
                <AccordionTrigger className="py-4 font-serif text-primary">Livraison & retours</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Livraison offerte en France métropolitaine, expédition sous 24h. Retour sous 30 jours si non ouvert.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
