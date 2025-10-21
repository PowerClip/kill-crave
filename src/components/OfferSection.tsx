import { Button } from "@/components/ui/button";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { createCartAndGetCheckout, formatMoney } from "@/lib/shopify";
import { H2, P } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { trackAddToCart, trackOnce } from "@/lib/analytics";
import { trackBeginCheckout, trackAddToCartGTM } from "@/lib/gtm";

const DOSES_PER_BOTTLE = 90; // matches product claim
const USES_PER_DAY = 3; // 3 repas / moments à risque / jour
const DAYS_PER_BOTTLE = DOSES_PER_BOTTLE / USES_PER_DAY; // 30

function safeParsePrice(amount: string | undefined): number | undefined {
  if (!amount) return undefined;
  const value = parseFloat(amount);
  return Number.isNaN(value) ? undefined : value;
}

function inferUnitCount(title: string): number | undefined {
  const lower = title.toLowerCase();

  const packMatch = lower.match(/pack\s*(\d+)/);
  if (packMatch) return parseInt(packMatch[1] || "", 10) || undefined;

  const lotMatch = lower.match(/lot\s*(\d+)/);
  if (lotMatch) return parseInt(lotMatch[1] || "", 10) || undefined;

  const xMatch = lower.match(/(\d+)\s*[x×]/);
  if (xMatch) return parseInt(xMatch[1] || "", 10) || undefined;

  const plusMatch = title.match(/(\d+)\s*\+\s*(\d+)/);
  if (plusMatch) {
    const values = plusMatch.slice(1).map(Number);
    const sum = values.reduce((acc, n) => acc + (Number.isNaN(n) ? 0 : n), 0);
    if (sum > 0) return sum;
  }

  const spraysMatch = lower.match(/(\d+)\s*(?:sprays?|flacons?|bouteilles?)/);
  if (spraysMatch) return parseInt(spraysMatch[1] || "", 10) || undefined;

  return undefined;
}

function formatDailyValue(n?: number): string {
  if (n === undefined || Number.isNaN(n)) return "…";
  return n.toFixed(2).replace(".", ",") + "€";
}

const OfferSection = () => {
  // Fetch product / variant from Shopify
  const { product, variant: primaryVariant, variants = [], price, isLoading, isError, error, available } = useShopifyProduct();
  const { toast } = useToast();

  // Use Shopify images if present; fall back to local static assets for continuity
  const fallbackImages = [
    "/images/product/Pic1.png",
    "/images/product/Pic2.png",
    "/images/product/Pic3.png",
    "/images/product/Pic4.png",
  ];
  const productImages = (product?.images.nodes.length ? product.images.nodes.map(i => i.url) : fallbackImages).slice(0, 4);
  const galleryImages = productImages.length ? productImages : fallbackImages;

  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const totalImages = galleryImages.length;

  // Handle image load errors by falling back to local images
  const handleImageError = (failedSrc: string, index: number) => {
    setFailedImages(prev => new Set(prev).add(failedSrc));
  };

  // Get the effective image URL with fallback logic
  const getEffectiveImageUrl = (originalUrl: string, index: number) => {
    if (failedImages.has(originalUrl) && index < fallbackImages.length) {
      return fallbackImages[index];
    }
    return originalUrl;
  };

  useEffect(() => {
    if (activeIndex >= totalImages) {
      setActiveIndex(0);
    }
  }, [activeIndex, totalImages]);

  // auto-advance gallery every 5 seconds
  useEffect(() => {
    if (totalImages <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % totalImages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalImages]);

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

  // Touch/swipe functionality for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // The minimum swipe distance required to trigger a slide change
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && totalImages > 1) {
      handleNext();
    }
    if (isRightSwipe && totalImages > 1) {
      handlePrev();
    }
  };
  const [creatingCheckout, setCreatingCheckout] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>();

  const variantList = variants.length ? variants : primaryVariant ? [primaryVariant] : [];
  const baseVariant = variantList[0];
  const basePriceNumber = baseVariant ? safeParsePrice(baseVariant.price.amount) : undefined;

  useEffect(() => {
    if (!selectedVariantId && primaryVariant?.id) {
      setSelectedVariantId(primaryVariant.id);
    }
  }, [primaryVariant?.id, selectedVariantId]);

  const bundleVariantIdEnv = import.meta.env.VITE_SHOPIFY_BUNDLE_VARIANT_ID as string | undefined;

  const optionDetails = useMemo(() => {
    return variantList.map((currentVariant, index) => {
      const priceNumber = safeParsePrice(currentVariant.price.amount);
      const parsedUnits = inferUnitCount(currentVariant.title);
      const approxUnits = !parsedUnits && index > 0 && basePriceNumber
        ? Math.max(1, Math.round((priceNumber || 0) / basePriceNumber))
        : undefined;
      // Explicit mapping requested:
      // - 2nd pack (index 1) => 3 sprays
      // - 3rd pack (index 2) => 5 sprays
      const explicitUnitsByIndex = index === 1 ? 3 : index === 2 ? 5 : undefined;
      const units = explicitUnitsByIndex ?? (index === 0 ? 1 : parsedUnits || approxUnits);

      const totalDoses = units ? units * DOSES_PER_BOTTLE : undefined;
      const totalDays = units ? units * DAYS_PER_BOTTLE : undefined;
      // €/jour rules (custom): based on pack index
      // - 2nd pack (index 1) => price / 90
      // - 3rd pack (index 2) => price / 150
      // - Others               => price divided by total days (30 days per unit)
      let dailyCostNumber: number | undefined;
      if (priceNumber !== undefined) {
        if (index === 1) {
          dailyCostNumber = priceNumber / 90;
        } else if (index === 2) {
          dailyCostNumber = priceNumber / 150;
        } else if (units) {
          dailyCostNumber = priceNumber / (DAYS_PER_BOTTLE * units);
        } else {
          dailyCostNumber = undefined;
        }
      }
      const dailyCostLabel = dailyCostNumber !== undefined ? formatDailyValue(dailyCostNumber) : undefined;
      let savingsPct: number | undefined;
      if (units && basePriceNumber && priceNumber !== undefined) {
        const fullPrice = basePriceNumber * units;
        if (fullPrice > 0) {
          const pct = Math.round((1 - priceNumber / fullPrice) * 100);
          if (pct > 0) savingsPct = pct;
        }
      }

      const baseFallback = baseVariant ? formatMoney(baseVariant.price, "24,90 €") : "24,90 €";
      const priceFallback = index === 0 ? "24,90 €" : baseFallback;

      return {
        variant: currentVariant,
        index,
        priceLabel: formatMoney(currentVariant.price, priceFallback),
        priceNumber,
        units,
        totalDoses,
        totalDays,
        dailyCostNumber,
        dailyCostLabel,
        savingsPct,
      };
    });
  }, [variantList, basePriceNumber, baseVariant]);

  // Show the popularity label specifically on the 2nd pack when available
  const recommendedVariantId = useMemo(() => {
    return optionDetails[1]?.variant.id;
  }, [optionDetails]);

  const selectedOption = optionDetails.find(opt => opt.variant.id === selectedVariantId) || optionDetails[0];
  const purchaseVariant = selectedOption?.variant || primaryVariant;
  const purchaseQuantity = 1;

  const priceLabel = formatMoney(price, "24,90 €");
  const selectedPriceLabel = selectedOption?.priceLabel || priceLabel;
  const selectedUnits = selectedOption?.units || 1;
  const selectedAvailable = selectedOption?.variant.availableForSale ?? available;
  const selectedSavingsPct = selectedOption?.savingsPct;
  const selectedTotalDays = selectedOption?.totalDays;
  const selectedTotalDoses = selectedOption?.totalDoses;
  const selectedDailyLabel = selectedOption?.dailyCostLabel;

  const buttonLabel = creatingCheckout
    ? "Redirection..."
    : isError
      ? "Erreur produit"
      : !selectedAvailable
        ? "Indisponible"
        : selectedUnits > 1
          ? `Pack x${selectedUnits} — ${selectedPriceLabel}`
          : `Commander — ${selectedPriceLabel}`;

  const buttonLabelMobile = creatingCheckout
    ? "Redirection..."
    : isError
      ? "Erreur"
      : !selectedAvailable
        ? "Indisponible"
        : selectedUnits > 1
          ? `Pack x${selectedUnits}`
          : "Commander";

  // Track product view (deduped with localStorage for fast remounts / re-renders)
  if (primaryVariant && typeof window !== 'undefined') {
    try {
      trackOnce('ViewContent', primaryVariant.id, {
        contents: [{ id: primaryVariant.id, quantity: 1, item_price: parseFloat(primaryVariant.price.amount) }],
        content_type: 'product',
        value: parseFloat(primaryVariant.price.amount),
        currency: primaryVariant.price.currencyCode || 'EUR'
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
      const unitPrice = selectedOption?.priceNumber ?? safeParsePrice(purchaseVariant.price.amount);
      if (unitPrice !== undefined) {
        // Track AddToCart (InitiateCheckout now tracked via Shopify webhook only)
        trackAddToCart(purchaseVariant.id, purchaseQuantity, unitPrice);
      }
      const url = await createCartAndGetCheckout(purchaseVariant.id, purchaseQuantity);
      window.location.href = url;
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erreur", description: e.message || "Impossible de créer le panier" });
    } finally {
      setCreatingCheckout(false);
    }
  }

  const normalizedTitle = product?.title?.replace(/blockout/gi, "Blackout");

  const productTitle =
    normalizedTitle && normalizedTitle !== "Kill Crave"
      ? normalizedTitle
      : "Kill Crave — le spray Blackout Sugar";

  return (
    <section
      id="offer"
      className="relative isolate bg-transparent scroll-mt-28 sm:scroll-mt-24 md:scroll-mt-20 lg:pt-20 lg:pb-16"
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-16">
        {/* Gallery */}
        <div className="relative w-full lg:w-1/2 lg:pr-10 lg:self-stretch">
          <div className="relative overflow-hidden rounded-3xl shadow-sm aspect-square sm:aspect-[4/3] lg:sticky lg:top-24 lg:min-h-[calc(100vh-6rem)] lg:max-h-[calc(100vh-6rem)] lg:aspect-auto lg:overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out touch-pan-y"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {galleryImages.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={getEffectiveImageUrl(image, index)}
                  alt={`Spray Kill Crave - Image ${index + 1}`}
                  className="w-full h-auto lg:h-full object-cover flex-shrink-0"
                  onError={() => handleImageError(image, index)}
                />
              ))}
            </div>
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
                <div className="absolute bottom-4 right-4 text-sm font-medium tracking-wide text-black drop-shadow-[0_1px_6px_rgba(255,255,255,0.7)]">
                  {activeIndex + 1}/{totalImages}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex w-full flex-col lg:w-1/2">
          <div className="px-4 pb-8 sm:px-6 lg:px-0 lg:pb-0">
            <div className="h-full p-6 sm:p-8 lg:p-10 text-black">
              <div className="flex h-full flex-col gap-5 lg:gap-6">
                <div className="space-y-2">
                <H2 className="text-black text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-[0.18em]">{productTitle}</H2>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-black/70">
                    <div className="flex items-center text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                      ))}
                    </div>
                    <a href="#reviews" className="underline underline-offset-2 text-black/80 hover:text-black">
                      109 avis
                    </a>
                  </div>
                  <ul className="space-y-2 text-sm sm:text-base">
                    {["Goût sucré neutralisé en 30 secondes", "Cravings stoppés avant qu'ils ne dérapent", "Formule Blackout Sugar fabriquée en France", "0 sucre ajouté, 0 alcool — uniquement des plantes actives"].map((b) => (
                      <li key={b} className="flex items-start gap-2 text-black/90">
                        <Check className="h-4 w-4 mt-1 text-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 pt-2 text-sm uppercase tracking-[0.18em] text-black/65">
                    <span>Fabriqué en France</span>
                    <span className="flex overflow-hidden rounded-sm border border-black/20">
                      <span className="h-2 w-2 bg-[#0055A4]" />
                      <span className="h-2 w-2 bg-white" />
                      <span className="h-2 w-2 bg-[#EF4135]" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {optionDetails.map(option => {
                    const isSelected = selectedOption?.variant.id === option.variant.id;
                    const isRecommended = recommendedVariantId === option.variant.id; // keep highlight on 2nd pack
                    const unitsText = option.units ? (option.units > 1 ? `${option.units} sprays` : "1 spray") : undefined;
                    const dosesDaysText = option.totalDoses && option.totalDays
                      ? `${option.totalDoses} doses — ${option.totalDays} jours`
                      : undefined;
                    const labelText = option.index === 1
                      ? "Offre la plus populaire"
                      : option.index === 2
                        ? "Meilleure offre"
                        : undefined;
                    const paddingClasses = labelText ? "px-4 py-4" : "px-4 py-4";

                    return (
                      <button
                        key={option.variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(option.variant.id)}
                        className={`group relative w-full sm:flex-1 sm:min-w-[220px] rounded-2xl border ${paddingClasses} text-left transition-all duration-300 ${
                          isSelected
                            ? "border-primary/60 ring-2 ring-primary/20 bg-[#fbe5e3]"
                            : "border-black/10 hover:border-primary/40 bg-white/90"
                        } ${
                          isRecommended
                            ? "bg-gradient-to-br from-[rgba(251,229,227,0.5)] via-white to-transparent"
                            : ""
                      }`}
                      disabled={isLoading}
                      aria-pressed={isSelected}
                    >
                      {labelText && (
                        <div
                          className={`absolute -top-2 right-2 sm:right-3 px-2.5 py-[3px] rounded-full text-[12px] font-medium tracking-wide shadow-sm backdrop-blur-sm transition-all ${
                            isSelected
                              ? "bg-primary text-primary-foreground ring-1 ring-black/20 shadow-md"
                              : "bg-black/10 text-black ring-1 ring-black/10 group-hover:bg-black/15"
                          }`}
                        >
                          {labelText}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm font-medium text-black">
                        <span className="truncate" title={option.variant.title}>{option.variant.title}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-primary font-serif text-2xl font-light">
                            {isLoading ? <span className="animate-pulse">...</span> : option.priceLabel}
                          </div>
                          <div className={`text-sm ${isSelected ? "text-black" : "text-black/70"}`}>
                            {option.dailyCostLabel ? `≈ ${option.dailyCostLabel} / jour` : "Tarif spécial"}
                          </div>
                        </div>
                        {option.savingsPct ? (
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-[3px] text-[12px] font-semibold tracking-wide whitespace-nowrap ${
                              isSelected ? "bg-primary text-primary-foreground ring-1 ring-black/20 shadow-sm" : "bg-black/5 text-black group-hover:bg-black/10"
                            }`}
                          >
                            -{option.savingsPct}% SAVE
                          </span>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-sm text-black/80">
              {selectedTotalDoses && selectedTotalDays ? (
                <>
                  <div>{selectedTotalDoses} doses — {selectedTotalDays} jours (3 utilisations/jour)</div>
                  {selectedDailyLabel && (
                    <div>
                      ≈ {selectedDailyLabel} / jour
                      {selectedSavingsPct ? (
                        <span className="ml-2 inline-flex items-center rounded-full bg-black/5 px-2.5 py-[2px] text-[12px] font-medium tracking-wide text-black">
                          -{selectedSavingsPct}%
                        </span>
                      ) : null}
                    </div>
                  )}
                </>
              ) : selectedDailyLabel ? (
                <div>≈ {selectedDailyLabel} / jour</div>
              ) : (
                <div>Choisissez la variante qui vous convient.</div>
              )}
            </div>

            <div className="space-y-2">
              <Button
                variant="hero"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6"
                disabled={creatingCheckout || isError || !selectedAvailable}
                onClick={() => {
                  if (!purchaseVariant) return;
                  try {
                    const unitPrice = selectedOption?.priceNumber ?? safeParsePrice(purchaseVariant.price.amount);
                    const totalValue = unitPrice != null ? unitPrice * purchaseQuantity : undefined;
                    const common = {
                      currency: purchaseVariant.price.currencyCode || 'EUR',
                      value: totalValue,
                      item_id: purchaseVariant.id,
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
                <span className="block sm:hidden">{buttonLabelMobile}</span>
                <span className="hidden sm:block">{buttonLabel}</span>
              </Button>
              <div className="text-sm text-black/75">
                Livraison gratuite en 3 à 5 jours ouvrés en France
              </div>
              <div className="text-sm text-black/70">
                Expédié sous 24h • 30j satisfait ou remboursé
              </div>
              {/* Anchor target to land at the bottom of the purchase block */}
              <div id="offer-bottom" aria-hidden className="scroll-mt-28 sm:scroll-mt-24 md:scroll-mt-20" />
              {isError && <div className="text-sm text-destructive">{error?.message}</div>}
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
