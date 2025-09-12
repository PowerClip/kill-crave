import { Card } from "@/components/ui/card";
import { H2, P } from "@/components/ui/typography";

const PainSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Visual placeholder */}
          <div className="order-first lg:order-none">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-card border bg-card">
              <img src="/images/problem.webp" alt="Scène de l'après-midi avec café et biscuits" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <H2 className="leading-tight font-normal">Vous connaissez la scène :</H2>
              <P className="text-muted-foreground">Un moment de vérité, tous les jours.</P>
            </div>

            <Card className="p-6 sm:p-8 border-border/60">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-tertiary flex items-center justify-center text-[1.7rem]">🍪</div>
                  <P className="text-base sm:text-lg text-primary leading-relaxed">16h, vous avez juré de “manger sain”… et vous craquez sur la boîte de biscuits.</P>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-tertiary flex items-center justify-center text-[1.7rem]">☕️</div>
                  <P className="text-base sm:text-lg text-primary leading-relaxed">Vous terminez votre café… et hop, vous ajoutez encore un carré de chocolat.</P>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-tertiary flex items-center justify-center text-[1.7rem]">🍫</div>
                  <P className="text-base sm:text-lg text-primary leading-relaxed">Le soir, devant un film, vous ouvrez la tablette sans réfléchir.</P>
                </li>
              </ul>
            </Card>

            <Card className="p-6 sm:p-7 bg-card/80 backdrop-blur border-secondary/30">
              <P className="text-lg sm:text-xl text-primary/90 leading-relaxed">
                Ce n’est pas un manque de volonté.
                C’est le sucre qui stimule vos récepteurs et vous pousse à en redemander.
              </P>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
