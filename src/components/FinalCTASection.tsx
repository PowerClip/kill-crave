import { Button } from "@/components/ui/button";

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-accent text-center">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="font-serif text-4xl lg:text-6xl font-light text-primary mb-6 leading-tight">
              Ready to reset your
              <span className="block font-medium">relationship with sugar?</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join thousands of French women who've discovered the secret to effortless sugar control. Your skin, energy, and confidence will thank you.
            </p>
          </div>

          <div className="space-y-6">
            <Button variant="premium" size="lg" className="transform hover:scale-105 transition-all duration-300">
              Start Your 14-Day Taste Reset — €39
            </Button>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="text-accent-peach">✨</span>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-accent-peach">🚚</span>
                <span>Free shipping in France</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-accent-peach">⚡</span>
                <span>Ships within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="pt-12 border-t border-primary/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="font-serif text-2xl font-light text-primary">2,847</div>
                <div className="text-sm text-muted-foreground">Happy customers</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-light text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">Average rating</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-light text-primary">94%</div>
                <div className="text-sm text-muted-foreground">Would recommend</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-light text-primary">€0</div>
                <div className="text-sm text-muted-foreground">Risk guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;