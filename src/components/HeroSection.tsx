import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
      <div className="container mx-auto px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-12 lg:pr-8">
            <div className="space-y-8">
              <h1 className="font-serif text-6xl lg:text-8xl font-light text-primary leading-[0.9] tracking-tight">
                Éteignez le goût sucré
                <span className="block font-medium italic text-accent-lavender">en 60 secondes</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                Utilisez avant le dessert ou le café. Sentez-vous en contrôle, pas obligée. Les utilisateurs rapportent que le chocolat a un goût de "carton" juste après.
              </p>
            </div>
            
            <div className="space-y-6">
              <Button variant="hero" size="xl" className="w-full sm:w-auto shadow-premium">
                Commencez Bye Sweetie de 14 Jours — €39
              </Button>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span className="text-accent-peach">✨</span>
                  <span>Garantie sans risque</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-accent-peach">🚚</span>
                  <span>Livraison gratuite en France</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:pl-8">
            <div className="relative z-10 aspect-square">
              <img 
                src={heroImage} 
                alt="Premium French wellness mouth strips with radiant woman"
                className="w-full h-full object-cover rounded-3xl shadow-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-lavender/10 to-accent-peach/10 rounded-3xl"></div>
            </div>
            {/* Elegant decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-accent-lavender/30 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-accent-peach/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-4 w-2 h-20 bg-gradient-to-b from-accent-lavender to-accent-peach rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;