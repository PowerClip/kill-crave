import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/typography";
import { trackCTA } from "@/lib/gtm";
import SectionGradient from "@/components/SectionGradient";

const FinalCTASection = () => {
  return (
    <SectionGradient id="checkout" className="py-24 sm:py-32 text-center text-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white/12 backdrop-blur-lg shadow-hero p-8 sm:p-12 space-y-6">
          <div className="space-y-3">
            <H2 className="leading-tight font-normal font-serif text-white">Kill Crave • Pack 30 Jours</H2>
            <P className="text-white/75">
              Blackout Sugar neutralise le goût sucré en 30 secondes. Coupez les envies, stabilisez votre énergie, gardez le contrôle.
            </P>
          </div>

          <div className="flex items-end justify-center gap-4">
            <div className="font-heading text-5xl sm:text-6xl tracking-[0.18em] text-primary">24,90€</div>
            <div className="text-white/50 line-through text-lg">39€</div>
          </div>

          <div className="pt-2">
            <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
              <a
                href="#offer"
                onClick={() => trackCTA('final_cta', 'Commander Kill Crave', '#offer', 'final_cta')}
              >
                Commander Kill Crave — 24,90€
              </a>
            </Button>
          </div>

          <div className="text-sm text-white/70 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>Livraison offerte</span>
            <span>•</span>
            <span>Expédié sous 24h</span>
            <span>•</span>
            <span>30j satisfait ou remboursé</span>
          </div>
        </div>
      </div>
    </SectionGradient>
  );
};

export default FinalCTASection;
