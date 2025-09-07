import tasteDemo from "@/assets/taste-demo.jpg";

const ProofSection = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Demo */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-serif text-3xl font-light text-primary mb-6 text-center">
                The Magic Moment
              </h3>
              
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-peach rounded-full flex items-center justify-center text-2xl mb-2">
                    🍫
                  </div>
                  <p className="text-sm text-muted-foreground">Before strip</p>
                  <p className="font-medium">Sweet heaven</p>
                </div>
                
                <div className="text-2xl text-accent-lavender">→</div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-2xl mb-2">
                    📄
                  </div>
                  <p className="text-sm text-muted-foreground">After strip</p>
                  <p className="font-medium">Tastes like cardboard</p>
                </div>
              </div>
              
              <img 
                src={tasteDemo} 
                alt="Chocolate taste demonstration"
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Scientific Backing */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-primary mb-6">
                Ancient Wisdom,
                <span className="block font-medium">Modern French Chic</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Gymnema Sylvestre has been used for centuries in Ayurveda. Now, we've transformed this powerful plant into a chic, modern French ritual.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-lavender rounded-full flex items-center justify-center flex-shrink-0">
                  📊
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium text-primary mb-2">
                    Clinically Studied
                  </h4>
                  <p className="text-muted-foreground">
                    In studies, people ate 21% less chocolate after Gymnema mints. Imagine what our premium strips can do for your cravings.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-peach rounded-full flex items-center justify-center flex-shrink-0">
                  🌿
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium text-primary mb-2">
                    Natural & Safe
                  </h4>
                  <p className="text-muted-foreground">
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