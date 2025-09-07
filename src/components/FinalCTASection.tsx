import { Button } from "@/components/ui/button";

const FinalCTASection = () => {
  return (
    <section className="py-32 bg-gradient-premium text-center border-t border-accent-lavender/20">
      <div className="container mx-auto px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-8">
            <h2 className="font-serif text-5xl lg:text-7xl font-light text-primary leading-tight">
              Ready to reset your
              <span className="block font-medium italic text-accent-lavender">relationship with sugar?</span>
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed font-light max-w-4xl mx-auto">
              Join thousands of French women who've discovered the secret to effortless sugar control. Your skin, energy, and confidence will thank you.
            </p>
          </div>

          <div className="space-y-10">
            <Button variant="hero" size="xl" className="shadow-premium hover:scale-105 transition-smooth">
              Start Your 14-Day Taste Reset — €39
            </Button>
            
            <div className="flex flex-wrap justify-center gap-8 text-lg text-muted-foreground">
              <div className="flex items-center space-x-3">
                <span className="text-accent-peach text-xl">✨</span>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-accent-peach text-xl">🚚</span>
                <span>Free shipping in France</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-accent-peach text-xl">⚡</span>
                <span>Ships within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="pt-16 border-t border-accent-lavender/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center max-w-4xl mx-auto">
              <div className="group">
                <div className="font-serif text-3xl font-light text-primary mb-3 group-hover:text-accent-peach transition-smooth">2,847</div>
                <div className="text-base text-muted-foreground">Happy customers</div>
              </div>
              <div className="group">
                <div className="font-serif text-3xl font-light text-primary mb-3 group-hover:text-accent-peach transition-smooth">4.9★</div>
                <div className="text-base text-muted-foreground">Average rating</div>
              </div>
              <div className="group">
                <div className="font-serif text-3xl font-light text-primary mb-3 group-hover:text-accent-peach transition-smooth">94%</div>
                <div className="text-base text-muted-foreground">Would recommend</div>
              </div>
              <div className="group">
                <div className="font-serif text-3xl font-light text-primary mb-3 group-hover:text-accent-peach transition-smooth">€0</div>
                <div className="text-base text-muted-foreground">Risk guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;