import tasteDemo from "@/assets/taste-demo.jpg";
import { H2, H3, P } from "@/components/ui/typography";

const ProofSection = () => {
  return (
    <section className="py-24 sm:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Visual Demo */}
          <div className="space-y-12">
            <div className="bg-card rounded-3xl p-8 sm:p-12 shadow-card border border-secondary/20">
              <H3 className="text-3xl sm:text-4xl font-normal mb-10 text-center tracking-wide">Le Moment Magique</H3>
              
              <div className="flex items-center justify-center space-x-12 mb-10">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-tertiary rounded-full flex items-center justify-center text-3xl mb-3 shadow-soft">
                    🍫
                  </div>
                  <P className="text-sm text-muted-foreground font-medium">Avant la bande</P>
                  <P className="font-serif text-lg text-primary">Paradis sucré</P>
                </div>
                
                <div className="text-3xl text-tertiary font-light animate-pulse">→</div>
                
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-3xl mb-3 shadow-soft">
                    📄
                  </div>
                  <P className="text-sm text-muted-foreground font-medium">Après la bande</P>
                  <P className="font-serif text-lg text-primary">Goût de carton</P>
                </div>
              </div>
              
              <img 
                src={tasteDemo} 
                alt="Démonstration Bye Sweetie avec chocolat"
                className="w-full h-64 object-cover rounded-2xl shadow-soft"
              />
            </div>
          </div>

          {/* Scientific Backing */}
          <div className="space-y-12 lg:pl-8">
            <div className="space-y-8">
              <H2 className="text-5xl lg:text-6xl font-normal leading-tight">
                Sagesse Ancienne,
                <span className="block font-medium italic text-tertiary drop-shadow-lg">Chic Français Moderne</span>
              </H2>
              <P className="text-2xl text-muted-foreground leading-relaxed">
                Les actifs botaniques se lient aux récepteurs sucrés de votre langue → le sucré devient plat pendant ~30-60 min. Gardez-le dans votre sac. Une bande avant le plateau de pâtisseries, une avant le café de 15h.
              </P>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-card border border-secondary/30">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center flex-shrink-0 text-2xl shadow-soft animate-pulse">
                  📊
                </div>
                <div className="space-y-3">
                  <H3 className="text-2xl font-normal tracking-wide">Étudié Cliniquement</H3>
                  <P className="text-lg text-muted-foreground leading-relaxed">
                    Dans les études, les gens ont mangé 21% moins de chocolat après des pastilles de Gymnema. Imaginez ce que notre spray premium peut faire pour vos envies.
                  </P>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-card border border-secondary/30">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center flex-shrink-0 text-2xl shadow-soft animate-pulse">
                  🌿
                </div>
                <div className="space-y-3">
                  <H3 className="text-2xl font-normal tracking-wide">Naturel & Sûr</H3>
                  <P className="text-lg text-muted-foreground leading-relaxed">
                    Extrait de plante pure, sans additifs artificiels. Juste la façon de la nature de vous aider à dire "non" au sucre.
                  </P>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
