import { Button } from "@/components/ui/button";
import productKit from "@/assets/product-kit.jpg";

const OfferSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-primary mb-6">
              The 14-Day Taste Reset Kit
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to transform your relationship with sugar
            </p>
          </div>

          {/* Product Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src={productKit} 
                alt="Complete 14-day taste reset kit with premium packaging"
                className="w-full h-auto rounded-2xl shadow-card"
              />
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-3xl font-light text-primary">
                What's inside your kit
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent-peach rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                    ✨
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">28 Premium Mouth Strips</h4>
                    <p className="text-muted-foreground text-sm">14-day supply (morning & evening ritual)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent-lavender rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                    📖
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">Skin Glow Tracker</h4>
                    <p className="text-muted-foreground text-sm">Beautiful journal to track your transformation</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent-warm rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                    🥗
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">Protein-Rich Breakfast Guide</h4>
                    <p className="text-muted-foreground text-sm">14 easy recipes to stabilize your energy</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent-peach rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                    💫
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">Reset Ritual Guide</h4>
                    <p className="text-muted-foreground text-sm">Your day-by-day transformation roadmap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-card rounded-3xl p-8 text-center shadow-hero">
            <div className="mb-6">
              <p className="text-muted-foreground line-through text-xl mb-2">
                Normally €89
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className="font-serif text-5xl font-light text-primary">€39</span>
                <div className="bg-accent-peach text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Save €50
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg" className="mb-6">
              Join the Reset — €39
            </Button>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✨ 30-day money-back guarantee</span>
              <span>🚚 Free shipping in France</span>
              <span>📦 Ships within 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;