import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-serif text-5xl lg:text-7xl font-light text-primary leading-tight">
                Your Sugar-Off
                <span className="block font-medium">Switch</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed">
                Temporarily reduces sweet taste perception so you can reset cravings, skin, and energy in 14 days
              </p>
            </div>
            
            <div className="space-y-4">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Start the 14-Day Taste Reset — €39
              </Button>
              <p className="text-sm text-muted-foreground">
                ✨ Risk-free guarantee • 🚚 Free shipping in France
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Premium French wellness mouth strips with radiant woman"
                className="w-full h-auto rounded-2xl shadow-hero"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-lavender rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-peach rounded-full opacity-40 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;