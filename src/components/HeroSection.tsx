import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { formatMoney } from "@/lib/shopify";
import { H1, Lead, P } from "@/components/ui/typography";
import { Star, Check } from "lucide-react";
import { trackCTA } from "@/lib/gtm";
import SectionGradient from "@/components/SectionGradient";
// Use the same hero image on all devices via public path

const HeroSection = () => {
  const { price, isLoading } = useShopifyProduct();
  const priceLabel = isLoading ? "…" : formatMoney(price, "24,90 €");

  return (
    <SectionGradient id="how" className="py-12 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 text-white">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Text */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="px-3 py-1 font-medium bg-white/10 text-white ring-1 ring-white/20">Plus de 2000 exemplaires vendus le mois dernier</Badge>
                <div className="flex items-center gap-1 text-[13px] font-serif text-white/70">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                  <span className="ml-1">4,8/5</span>
                </div>
              </div>
              <H1 className="leading-[1.05] tracking-tight font-serif font-normal text-white">
                Le spray naturel qui coupe vos envies de sucre
              </H1>
              <Lead className="max-w-lg text-white/75">
                1 à 2 sprays sur la langue. Le goût sucré disparaît temporairement et vous n'en avez plus envie. Vous perdez ainsi du poids naturellement et sans frustration.
              </Lead>
              {/* Mobile: place the visual directly under the "frustration." line */}
              <div className="lg:hidden pt-4">
                <div className="relative max-w-md mx-auto">
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/15 bg-black/60 shadow-hero">
                  <img
                  src="/images/hero.webp"
                  alt="Spray anti-envie de sucre Kill Crave"
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 via-black/40 to-red-800/40 mix-blend-multiply" />
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 text-[15px] text-white/80 max-w-md font-serif">
              {[
                'Coupe immédiatement la perception du goût sucré',
                'Coupe les envies et les grignotages',
                'Formulé et fabriqué en France',
                'Composition naturelle, actif d\'origine asiatique',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span className="leading-snug tracking-[0.1px]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="sm" className="sm:h-12 px-8 rounded-xl" asChild>
                <a
                  href="#offer"
                  onClick={() => trackCTA('hero_primary', 'Commencer', '#offer', 'hero')}
                >
                  Commencer – {priceLabel}
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="sm:h-12 px-8 rounded-xl border border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                <a
                  href="#ingredients"
                  onClick={() => trackCTA('hero_secondary', 'Voir comment ça marche', '#ingredients', 'hero')}
                >
                  Voir comment ça marche
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-sm font-medium tracking-wide text-white/65 uppercase">
              <span className="relative pl-0 after:content-[''] after:absolute after:-right-2 after:top-1/2 after:-translate-y-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-white/40">Formulation Française</span>
              <span className="relative pl-0 after:content-[''] after:absolute after:-right-2 after:top-1/2 after:-translate-y-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-white/40">Actifs Standardisés</span>
              <span>Garantie 30 Jours</span>
            </div>
          </div>

          {/* Image / Visual */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="relative max-w-xl mx-auto">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/15 bg-black/60 shadow-hero">
                <img
                  src="/images/hero.webp"
                  alt="Spray anti-envie de sucre Kill Crave"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 via-black/35 to-red-800/40 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden sm:block h-32 w-32 rounded-full bg-primary/35 blur-3xl" />
              <div className="absolute -top-6 -right-6 hidden sm:block h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            </div>
          </div>
        </div>
        {/* Usage note moved below Offer section on the page */}
      </div>
    </SectionGradient>
  );
};

export default HeroSection;
