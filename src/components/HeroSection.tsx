import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="how" className="relative min-h-[80vh] bg-gradient-hero flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-8 lg:pr-8 order-2 lg:order-none">
            <div className="space-y-8">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-primary leading-[1.05] tracking-tight">
                Le spray qui coupe tes envies de sucre en 60s
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                Un pschitt sur la langue → le goût sucré disparaît en 60 secondes. Jour après jour tu retrouves un corps plus léger, une peau plus nette et une énergie qui reste stable toute la journée.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="hero"
                size="xl"
                className="w-full sm:w-auto shadow-hero ring-2 ring-accent-hot/30 hover:ring-accent-hot/50 hover:-translate-y-0.5 active:translate-y-0 rounded-3xl drop-shadow-xl bg-gradient-to-r from-accent-hot to-accent-electric hover:from-accent-electric hover:to-accent-hot text-white border-transparent"
                asChild
              >
                <a href="#offer">Commencer ma Cure de 30 Jours – 24,90€</a>
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
          <div className="relative lg:pl-8 order-1 lg:order-none">
            <div className="relative z-10 aspect-square">
              <img 
                src="/images/hero.jpg" 
                alt="Bye Sweetie spray anti-sucre avec femme radieuse"
                className="w-full h-full object-cover rounded-3xl shadow-hero"
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