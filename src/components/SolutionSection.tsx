import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SolutionSection = () => {
  return (
  <section id="solution" className="py-24 sm:py-28 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        {/* Title + paragraph */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge variant="secondary" className="rounded-full px-3 py-1">La solution</Badge>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-primary leading-tight">
            Le spray magique qui coupe l'envie de <span className="font-normal">sucré</span>
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-accent-lavender to-accent-peach" />
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
Bye Sweetie est un spray discret qui bloque temporairement les capteurs du goût sucré.
Résultat : ce qui est sucré devient fade, et l’envie retombe.          </p>
        </div>

        {/* Illustration */}
        <div className="mb-10 sm:mb-14">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-accent-lavender/30 ring-1 ring-accent-lavender/20 bg-card">
            <img
              src="/images/solution.jpeg"
              alt="Illustration du spray Bye Sweetie en situation"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 space-y-3 border-accent-lavender/30 bg-card/90 backdrop-blur transition-all hover:shadow-card hover:border-accent-lavender/60 hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-accent-warm flex items-center justify-center text-[1.6rem]">🌿</div>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-primary">Pulvérise — l’envie décroît</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Les récepteurs du sucré se désactivent pendant 30 à 60 minutes. Le gâteau perd son charme. Tu n’as plus besoin de “résister”.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 space-y-3 border-accent-lavender/30 bg-card/90 backdrop-blur transition-all hover:shadow-card hover:border-accent-lavender/60 hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-accent-warm flex items-center justify-center text-[1.6rem]">📆</div>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-primary">Un rituel de 30 jours, des effets durables</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Utilise-le avant les moments à risque (café, dessert, soirée). Jour après jour : moins d’envies, énergie stable, peau plus nette.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
