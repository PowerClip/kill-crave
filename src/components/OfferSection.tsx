import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { createCartAndGetCheckout, formatMoney, ShopifyProductVariant } from "@/lib/shopify";
import { H2, P } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { trackInitiateCheckout, trackAddToCart, trackOnce } from "@/lib/analytics";
import { trackBeginCheckout, trackAddToCartGTM } from "@/lib/gtm";

const OfferSection = () => {
  // Fetch product / variant from Shopify
  const { product, variant, price, isLoading, isError, error, available } = useShopifyProduct();
  const { toast } = useToast();

  // Use Shopify images if present; fall back to local static assets for continuity
  const fallbackImages = [
    "/images/product/1.webp",
    "/images/product/2.webp",
    "/images/product/3.webp",
    "/images/product/4.webp",
    "/images/product/5.webp",
  ];
  const productImages = (product?.images.nodes.length ? product.images.nodes.map(i => i.url) : fallbackImages).slice(0, 5);
  const galleryImages = productImages.length ? productImages : fallbackImages;

  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = galleryImages.length;

  useEffect(() => {
    if (activeIndex >= totalImages) {
      setActiveIndex(0);
    }
  }, [activeIndex, totalImages]);

  const activeImage = galleryImages[activeIndex] ?? galleryImages[0] ?? fallbackImages[0];
  const showControls = totalImages > 1;

  const handlePrev = () => {
    if (!totalImages) return;
    setActiveIndex(prev => (prev - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    if (!totalImages) return;
    setActiveIndex(prev => (prev + 1) % totalImages);
  };
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

  // Derived metrics for dynamic copy
  const DOSES_PER_BOTTLE = 90; // matches product claim
  const USES_PER_DAY = 3; // 3 repas / moments à risque / jour
  const DAYS_PER_BOTTLE = DOSES_PER_BOTTLE / USES_PER_DAY; // 30
  const BOTTLES_IN_BUNDLE = 3; // Pack 3 (2+1 offert)

  const singlePriceNumber = variant ? parseFloat(variant.price.amount) : undefined;
  const bundlePriceNumber = purchaseMode === "bundle"
    ? (bundleVariant ? parseFloat(bundleVariant.price.amount) : (singlePriceNumber ? singlePriceNumber * BOTTLES_IN_BUNDLE : undefined))
    : undefined;

  const dailySingle = singlePriceNumber ? singlePriceNumber / DAYS_PER_BOTTLE : undefined; // 30 days
  const dailyBundle = bundlePriceNumber ? bundlePriceNumber / (DAYS_PER_BOTTLE * BOTTLES_IN_BUNDLE) : undefined; // 90 days

  let savingsPct: number | undefined;
  if (singlePriceNumber && bundlePriceNumber) {
    const full = singlePriceNumber * BOTTLES_IN_BUNDLE;
    savingsPct = Math.max(0, Math.round((1 - bundlePriceNumber / full) * 100));
  }

  const formatDaily = (n?: number) => {
    if (n === undefined || Number.isNaN(n)) return "…";
    // Force European decimal comma & 2 decimals trimmed to 2 -> e.g. 0,83€
    return n.toFixed(2).replace(".", ",") + "€";
  };

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

  const productTitle =
    product?.title && product.title !== "Bye Sweetie"
      ? product.title
      : "Le spray naturel qui coupe vos envies de sucre";

  return (
    <section
      id="offer"
      className="relative isolate bg-background scroll-mt-28 sm:scroll-mt-24 md:scroll-mt-20 lg:pt-20 lg:pb-16"
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-16">
        {/* Gallery */}
        <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] lg:w-1/2 lg:pr-10 lg:self-stretch">
          <div className="relative overflow-hidden rounded-3xl shadow-sm lg:sticky lg:top-24 lg:min-h-[calc(100vh-6rem)] lg:max-h-[calc(100vh-6rem)] lg:overflow-hidden">
            <img
              src={activeImage}
              alt="Spray Bye Sweetie - 30 Jours"
              className="w-full h-auto lg:h-full object-cover"
            />
            {showControls && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-8 w-8 drop-shadow-[0_1px_6px_rgba(255,255,255,0.6)]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="h-8 w-8 drop-shadow-[0_1px_6px_rgba(255,255,255,0.6)]" />
                </button>
                <div className="absolute bottom-4 right-4 text-xs font-medium tracking-wide text-black drop-shadow-[0_1px_6px_rgba(255,255,255,0.7)]">
                  {activeIndex + 1}/{totalImages}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex w-full flex-col lg:w-1/2">
          <div className="px-4 pb-8 sm:px-6 lg:px-0 lg:pb-0">
            <div className="flex h-full flex-col gap-5 lg:gap-6">
              <div className="space-y-2">
                <H2 className="font-serif text-3xl font-light text-primary lg:text-4xl leading-tight">{productTitle}</H2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center text-foreground">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-black fill-black" />
                      ))}
                    </div>
                    <a href="#reviews" className="underline underline-offset-2">
                      109 avis
                    </a>
                  </div>
                  <ul className="space-y-2 text-sm sm:text-base">
                    {["Un spray coupe le goût sucré immédiatement", "Moins de grignotages, plus de contrôle", "Peau plus nette & ventre moins gonflé", "Énergie au top toute la journée, sans crash"].map((b) => (
                      <li key={b} className="flex items-start gap-2 text-primary">
                        <Check className="h-4 w-4 mt-1 text-black" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => setPurchaseMode("single")}
                    className={`w-full sm:flex-1 sm:min-w-[180px] rounded-2xl border px-4 py-3 text-left transition ${
                      purchaseMode === "single" ? "border-tertiary ring-2 ring-tertiary/40 bg-card" : "hover:border-tertiary/60"
                    }`}
                    disabled={isLoading}
                  >
                    <div className="text-sm font-medium text-primary">1 Spray</div>
                    <div className="text-primary font-serif text-2xl font-light">
                      {isLoading ? <span className="animate-pulse">...</span> : priceLabel}
                    </div>
                    <div className="text-xs text-muted-foreground">≈ {formatDaily(dailySingle)} / jour</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurchaseMode("bundle")}
                    className={`group w-full sm:flex-1 sm:min-w-[200px] rounded-2xl border px-4 py-3 text-left relative transition-all duration-300 ${
                      purchaseMode === "bundle"
                        ? "border-secondary ring-2 ring-secondary/60 bg-gradient-to-br from-secondary/60 via-secondary/25 to-white shadow-lg sm:scale-[1.02] sm:ring-offset-2 sm:ring-offset-white"
                        : "hover:border-secondary/60 bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent"
                    }`}
                    disabled={isLoading || (!bundleVariant && !variant)}
                  >
                    <div
                      className={`absolute -top-2 right-2 sm:right-3 px-2 py-[3px] rounded-full text-[10px] font-medium tracking-wide shadow-sm backdrop-blur-sm transition-all ${
                        purchaseMode === "bundle"
                          ? "bg-secondary text-white ring-1 ring-white/50 shadow-md animate-pulse"
                          : "bg-secondary/25 text-secondary-foreground ring-1 ring-secondary/40 group-hover:bg-secondary/40"
                      }`}
                    >
                      Meilleure offre
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      Pack 3 <span className="rounded-md bg-secondary/20 text-secondary-foreground px-2 py-0.5 text-[10px] tracking-wide">2+1 offert</span>
                    </div>
                    <div className="text-primary font-serif text-2xl font-light">
                      {isLoading ? <span className="animate-pulse">...</span> : bundlePriceLabel}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">0,55€ / jour</span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-semibold tracking-wide transition-colors ${
                          purchaseMode === "bundle"
                            ? "bg-secondary text-white shadow-sm"
                            : "bg-secondary/25 text-secondary-foreground group-hover:bg-secondary/40"
                        }`}
                      >
                        -33% SAVE
                      </span>
                    </div>
                  </button>
                </div>

                <div className="text-sm text-muted-foreground">
                  {purchaseMode === "single" ? (
                    <div>{DOSES_PER_BOTTLE} doses — {DAYS_PER_BOTTLE} jours (3 utilisations/jour)</div>
                  ) : (
                    <>
                      <div>{DOSES_PER_BOTTLE * BOTTLES_IN_BUNDLE} doses — {DAYS_PER_BOTTLE * BOTTLES_IN_BUNDLE} jours (3 utilisations/jour)</div>
                      <div>
                        ≈ {formatDaily(dailyBundle)} / jour
                        {savingsPct && savingsPct > 0 && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-secondary/20 px-2 py-[1px] text-[10px] font-medium tracking-wide text-secondary-foreground">
                            -{savingsPct}%
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="premium"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={creatingCheckout || isError || !available}
                  onClick={() => {
                    try {
                      const unitPrice = purchaseVariant ? parseFloat(purchaseVariant.price.amount) : undefined;
                      const common = {
                        currency: purchaseVariant?.price.currencyCode || 'EUR',
                        value: unitPrice,
                        item_id: purchaseVariant?.id,
                        item_name: product?.title,
                        quantity: purchaseQuantity,
                        price: unitPrice,
                      } as const;
                      trackAddToCartGTM(common);
                      trackBeginCheckout(common);
                    } catch {}
                    handleBuy();
                  }}
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
                <div id="offer-bottom" aria-hidden className="scroll-mt-28 sm:scroll-mt-24 md:scroll-mt-20" />
                {isError && <div className="text-xs text-destructive">{error?.message}</div>}
                {purchaseMode === "bundle" && !bundleVariant && (
                  <div className="text-[11px] text-muted-foreground/70">
                    Astuce: ajoutez une variante "Pack 3" dans Shopify ou définissez VITE_SHOPIFY_BUNDLE_VARIANT_ID pour un prix exact.
                  </div>
                )}
              </div>

              <Accordion type="single" collapsible className="w-full divide-y bg-transparent px-0">
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
                    <ul className="list-inside list-disc space-y-2 pl-1">
                      <li>
                        <span className="font-medium text-primary">Plante Gymnema sylvestre</span> — connue pour neutraliser temporairement
                        les récepteurs du goût sucré sur la langue.
                      </li>
                      <li>
                        <span className="font-medium text-primary">Extrait de thé vert & zinc</span> — soutien du métabolisme énergétique, aide
                        à brûler davantage de calories au quotidien.
                      </li>
                      <li>
                        <span className="font-medium text-primary">Menthe poivrée</span> — sensation fraîche et propre, sans arrière-goût.
                      </li>
                      <li>
                        <span className="font-medium text-primary">Glycérine végétale</span> — base douce et stabilisante pour la formule.
                      </li>
                    </ul>
                    <div className="mt-3">Sans colorants ni édulcorants artificiels.</div>
                    <div className="mt-2">Sans alcool dans la formulation.</div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="px-0">
                  <AccordionTrigger className="py-4 font-serif text-primary">Livraison & retours</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Livraison offerte en France métropolitaine, expédition sous 24h. Retour sous 30 jours si non ouvert.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="pt-4">
                <P className="text-[11px] sm:text-xs text-muted-foreground/70">
                  Utilisation: avant dessert, café sucré, grignotage potentiel. Effet 30–60 min. Ne remplace pas une prise en charge médicale. Déconseillé aux femmes enceintes/allaitantes et personnes sous traitement sans avis professionnel.
                </P>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
