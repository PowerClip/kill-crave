import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/typography";
import { trackCTA } from "@/lib/gtm";

const FinalCTASection = () => {
  return (
    <section id="checkout" className="py-24 sm:py-32 bg-secondary text-center border-t border-secondary/40 text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-background/95 backdrop-blur border border-secondary/40 shadow-hero p-8 sm:p-12 space-y-6">
          <div className="space-y-3">
            <H2 className="leading-tight font-normal font-serif text-secondary">Kill Crave • Pack 30 Jours</H2>
            <P className="text-muted-foreground">
              Blackout Sugar neutralise le goût sucré en 30 secondes. Coupez les envies, stabilisez votre énergie, gardez le contrôle.
            </P>
          </div>

          <div className="flex items-end justify-center gap-4">
            <div className="font-heading text-5xl sm:text-6xl tracking-[0.18em] text-secondary">24,90€</div>
            <div className="text-muted-foreground line-through text-lg">39€</div>
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

          <div className="text-xs sm:text-sm text-muted-foreground flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>Livraison offerte</span>
            <span>•</span>
            <span>Expédié sous 24h</span>
            <span>•</span>
            <span>30j satisfait ou remboursé</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
