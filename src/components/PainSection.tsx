import { Card } from "@/components/ui/card";

const PainSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Visual placeholder */}
          <div className="order-first lg:order-none">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-card border bg-card">
              <img src="/images/problem.jpeg" alt="Scène de l'après-midi avec café et biscuits" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-primary leading-tight">Tu connais la scène :</h2>
              <p className="text-muted-foreground">Un moment de vérité, tous les jours.</p>
            </div>

            <Card className="p-6 sm:p-8 border-border/60">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent-warm flex items-center justify-center text-[1.7rem]">🍪</div>
                  <p className="text-base sm:text-lg text-primary leading-relaxed">16h, tu as juré de “manger sain”… et tu craques sur la boîte de biscuits.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent-warm flex items-center justify-center text-[1.7rem]">☕️</div>
                  <p className="text-base sm:text-lg text-primary leading-relaxed">Tu termines ton café… et hop, tu ajoutes encore un carré de chocolat.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent-warm flex items-center justify-center text-[1.7rem]">🍫</div>
                  <p className="text-base sm:text-lg text-primary leading-relaxed">Le soir, devant un film, tu ouvres la tablette sans réfléchir.</p>
                </li>
              </ul>
            </Card>

            <Card className="p-6 sm:p-7 bg-card/80 backdrop-blur border-accent-lavender/30">
              <p className="text-lg sm:text-xl text-primary/90 leading-relaxed">
Ce n’est pas un manque de volonté.
C’est le sucre qui stimule tes récepteurs et te pousse à en redemander.              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
