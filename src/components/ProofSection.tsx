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
                The Magic Moment
              </h3>
              
              <div className="flex items-center justify-center space-x-12 mb-10">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent-peach to-accent-peach/60 rounded-full flex items-center justify-center text-3xl mb-3 shadow-soft">
                    🍫
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Before strip</p>
                  <p className="font-serif text-lg text-primary">Sweet heaven</p>
                </div>
                
                <div className="text-3xl text-accent-lavender font-light">→</div>
                
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-3xl mb-3 shadow-soft">
                    📄
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">After strip</p>
                  <p className="font-serif text-lg text-primary">Tastes like cardboard</p>
                </div>
              </div>
              
              <img 
                src={tasteDemo} 
                alt="Chocolate taste demonstration"
                className="w-full h-64 object-cover rounded-2xl shadow-soft"
              />
            </div>
          </div>

          {/* Scientific Backing */}
          <div className="space-y-12 lg:pl-8">
            <div className="space-y-8">
              <h2 className="font-serif text-5xl lg:text-6xl font-light text-primary leading-tight">
                Ancient Wisdom,
                <span className="block font-medium italic text-accent-lavender">Modern French Chic</span>
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed font-light">
                Gymnema Sylvestre has been used for centuries in Ayurveda. Now, we've transformed this powerful plant into a chic, modern French ritual.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-card border border-accent-lavender/20 hover:shadow-hero transition-smooth">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-lavender to-accent-lavender/60 rounded-full flex items-center justify-center flex-shrink-0 text-2xl shadow-soft">
                  📊
                </div>
                <div className="space-y-3">
                  <h4 className="font-serif text-2xl font-light text-primary tracking-wide">
                    Clinically Studied
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed font-light">
                    In studies, people ate 21% less chocolate after Gymnema mints. Imagine what our premium strips can do for your cravings.
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
                    Natural & Safe
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed font-light">
                    Pure plant extract, no artificial additives. Just nature's way of helping you say "non" to sugar.
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