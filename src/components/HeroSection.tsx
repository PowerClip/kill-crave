import { Button } from "@/components/ui/button";
// Use the same hero image on all devices via public path

const HeroSection = () => {
  return (
  <section id="how" className="relative min-h-[60vh] md:min-h-[75vh] bg-gradient-hero flex items-center overflow-x-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-16 items-center mx-auto">
          {/* Content */}
          <div className="space-y-8 lg:pr-8 order-1 lg:order-none">
            <div className="space-y-6">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.08] tracking-tight break-words [text-wrap:balance]">
                Le spray qui coupe tes envies de sucre en 60s
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                Un pschitt sur la langue → le goût sucré disparaît en 60 secondes. Jour après jour tu retrouves un corps plus léger, une peau plus nette et une énergie qui reste stable toute la journée.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="hero"
                size="sm"
                className="w-full max-w-[300px] sm:max-w-none sm:w-auto mx-auto sm:mx-0 ring-1 ring-accent-hot/30 hover:ring-accent-hot/50 hover:-translate-y-0.5 active:translate-y-0 rounded-xl bg-gradient-to-r from-accent-hot to-accent-electric hover:from-accent-electric hover:to-accent-hot text-white border-transparent px-4 py-5 sm:py-3"
                asChild
              >
                <a href="#offer" className="text-sm sm:text-base">Commencer ma Cure de 30 Jours – 24,90€</a>
              </Button>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-accent-electric">✨</span>
                  <span>Garantie sans risque</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent-coral">🚚</span>
                  <span>Livraison gratuite en France</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative px-1 lg:px-0 lg:pl-8 order-2 lg:order-none">
      <div className="relative z-10 aspect-square sm:aspect-square lg:aspect-square w-full max-w-[520px] sm:max-w-[560px] lg:max-w-none mx-auto overflow-hidden rounded-3xl">
              <img 
                src="/images/hero.jpg" 
                alt="Bye Sweetie spray anti-sucre avec femme radieuse"
        className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-lavender/10 to-accent-peach/10 rounded-3xl"></div>
            </div>
            {/* Subtle accents only for cleanliness */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
