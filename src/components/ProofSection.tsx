import tasteDemo from "@/assets/taste-demo.jpg";

const ProofSection = () => {
  return (
    <section className="py-32 bg-gradient-hero">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          {/* Visual Demo */}
          <div className="space-y-12">
            <div className="bg-card rounded-3xl p-12 shadow-card border border-accent-lavender/20">
              <h3 className="font-serif text-4xl font-light text-primary mb-10 text-center tracking-wide">
                Le Moment Magique
              </h3>
              
              <div className="flex items-center justify-center space-x-12 mb-10">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent-peach to-accent-peach/60 rounded-full flex items-center justify-center text-3xl mb-3 shadow-soft">
                    🍫
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Avant la bande</p>
                  <p className="font-serif text-lg text-primary">Paradis sucré</p>
                </div>
                
                <div className="text-3xl text-accent-lavender font-light">→</div>
                
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-3xl mb-3 shadow-soft">
                    📄
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Après la bande</p>
                  <p className="font-serif text-lg text-primary">Goût de carton</p>
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
              <h2 className="font-serif text-5xl lg:text-6xl font-light text-primary leading-tight">
                Sagesse Ancienne,
                <span className="block font-medium italic text-accent-lavender">Chic Français Moderne</span>
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed font-light">
                Les actifs botaniques se lient aux récepteurs sucrés de votre langue → le sucré devient plat pendant ~30-60 min. Gardez-le dans votre sac. Une bande avant le plateau de pâtisseries, une avant le café de 15h.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-card border border-accent-lavender/20 hover:shadow-hero transition-smooth">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-lavender to-accent-lavender/60 rounded-full flex items-center justify-center flex-shrink-0 text-2xl shadow-soft">
                  📊
                </div>
                <div className="space-y-3">
                  <h4 className="font-serif text-2xl font-light text-primary tracking-wide">
                    Étudié Cliniquement
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed font-light">
                    Dans les études, les gens ont mangé 21% moins de chocolat après des pastilles de Gymnema. Imaginez ce que nos bandes premium peuvent faire pour vos envies.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-card border border-accent-peach/20 hover:shadow-hero transition-smooth">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-peach to-accent-peach/60 rounded-full flex items-center justify-center flex-shrink-0 text-2xl shadow-soft">
                  🌿
                </div>
                <div className="space-y-3">
                  <h4 className="font-serif text-2xl font-light text-primary tracking-wide">
                    Naturel & Sûr
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed font-light">
                    Extrait de plante pure, sans additifs artificiels. Juste la façon de la nature de vous aider à dire "non" au sucre.
                  </p>
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