import { Button } from "@/components/ui/button";
import productKit from "@/assets/product-kit.jpg";

const OfferSection = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24">
            <h2 className="font-serif text-5xl lg:text-6xl font-light text-primary mb-8 leading-tight">
              The 14-Day
              <span className="block font-medium italic text-accent-peach">Taste Reset Kit</span>
            </h2>
            <p className="text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
              Everything you need to transform your relationship with sugar
            </p>
          </div>

          {/* Product Showcase */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div className="relative">
              <img 
                src={productKit} 
                alt="Complete 14-day taste reset kit with premium packaging"
                className="w-full h-auto rounded-3xl shadow-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-lavender/10 to-accent-peach/10 rounded-3xl"></div>
            </div>

            <div className="space-y-10 lg:pl-8">
              <h3 className="font-serif text-4xl font-light text-primary tracking-wide">
                What's inside your kit
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 p-4 rounded-2xl hover:bg-accent/20 transition-smooth">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-peach to-accent-peach/60 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                    ✨
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-medium text-primary">28 Premium Mouth Strips</h4>
                    <p className="text-muted-foreground leading-relaxed">14-day supply (morning & evening ritual)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-4 rounded-2xl hover:bg-accent/20 transition-smooth">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-lavender to-accent-lavender/60 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                    📖
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-medium text-primary">Skin Glow Tracker</h4>
                    <p className="text-muted-foreground leading-relaxed">Beautiful journal to track your transformation</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-4 rounded-2xl hover:bg-accent/20 transition-smooth">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-warm to-accent-warm/60 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                    🥗
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-medium text-primary">Protein-Rich Breakfast Guide</h4>
                    <p className="text-muted-foreground leading-relaxed">14 easy recipes to stabilize your energy</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-4 rounded-2xl hover:bg-accent/20 transition-smooth">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-peach to-accent-peach/60 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                    💫
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-medium text-primary">Reset Ritual Guide</h4>
                    <p className="text-muted-foreground leading-relaxed">Your day-by-day transformation roadmap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-premium rounded-3xl p-12 text-center shadow-hero border border-accent-lavender/30 max-w-2xl mx-auto">
            <div className="mb-10">
              <p className="text-muted-foreground line-through text-2xl mb-4 font-light">
                Normally €89
              </p>
              <div className="flex items-center justify-center space-x-6 mb-6">
                <span className="font-serif text-6xl font-light text-primary tracking-tight">€39</span>
                <div className="bg-accent-peach text-primary px-6 py-3 rounded-full font-serif font-medium shadow-soft">
                  Save €50
                </div>
              </div>
            </div>

            <Button variant="hero" size="xl" className="mb-8 shadow-premium">
              Join the Reset — €39
            </Button>

            <div className="flex flex-wrap justify-center gap-6 text-base text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="text-accent-peach">✨</span>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-accent-peach">🚚</span>
                <span>Free shipping in France</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-accent-peach">📦</span>
                <span>Ships within 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;