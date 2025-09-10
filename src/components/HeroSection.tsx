import { Button } from "@/components/ui/button";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { formatMoney } from "@/lib/shopify";
import { H1, Lead } from "@/components/ui/typography";
// Use the same hero image on all devices via public path

const HeroSection = () => {
  const { price, isLoading } = useShopifyProduct();
  const priceLabel = isLoading ? "…" : formatMoney(price, "24,90 €");

  return (
  <section id="how" className="relative min-h-[60vh] md:min-h-[75vh] bg-secondary flex items-center overflow-x-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-16 items-center mx-auto">
          {/* Content */}
          <div className="space-y-8 lg:pr-8 order-1 lg:order-none">
            <div className="space-y-6">
              <H1 className="leading-[1.08] break-words [text-wrap:balance]">
                Le spray qui coupe tes envies de sucre en 60s
              </H1>
              <Lead className="max-w-xl">
                Un pschitt sur la langue → le goût sucré disparaît en 60 secondes. Jour après jour tu retrouves un corps plus léger, une peau plus nette et une énergie qui reste stable toute la journée.
              </Lead>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="hero"
                size="sm"
                className="w-full max-w-[300px] sm:max-w-none sm:w-auto mx-auto sm:mx-0 rounded-xl px-4 py-5 sm:py-3"
                asChild
              >
                <a href="#offer" className="text-sm sm:text-base">Commencer ma Cure de 30 Jours – {priceLabel}</a>
              </Button>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-tertiary">✨</span>
                  <span>Garantie sans risque</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-tertiary">🚚</span>
                  <span>Livraison gratuite en France</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative px-1 lg:px-0 lg:pl-8 order-2 lg:order-none">
      <div className="relative z-10 aspect-square sm:aspect-square lg:aspect-square w-full max-w-[520px] sm:max-w-[560px] lg:max-w-none mx-auto overflow-hidden rounded-3xl">
              <img 
                src="/images/hero.png" 
                alt="Bye Sweetie spray anti-sucre avec femme radieuse"
        className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-tertiary/10 rounded-3xl"></div>
            </div>
            {/* Subtle accents only for cleanliness */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
