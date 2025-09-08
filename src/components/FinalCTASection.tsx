import { Button } from "@/components/ui/button";

const FinalCTASection = () => {
  return (
    <section id="checkout" className="py-24 sm:py-32 bg-gradient-premium/60 text-center border-t border-accent-lavender/20">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-card/90 backdrop-blur border shadow-card p-8 sm:p-12 space-y-6">
          <div className="space-y-3">
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-primary leading-tight">Kit Bye Sweetie — 30 jours</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Arrêtez entièrement le sucre en 60 secondes. Un rituel simple, des résultats concrets et durables.
            </p>
          </div>

          <div className="flex items-end justify-center gap-4">
            <div className="font-serif text-5xl sm:text-6xl font-light text-primary tracking-tight">24,90€</div>
            <div className="text-muted-foreground line-through text-lg">€39</div>
          </div>

          <div className="pt-2">
            <Button variant="hero" size="lg" className="w-full sm:w-auto shadow-premium" asChild>
              <a href="#offer">Acheter maintenant — 24,90€</a>
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