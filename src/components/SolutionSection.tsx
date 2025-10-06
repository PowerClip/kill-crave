import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { H2, H3, P } from "@/components/ui/typography";
import SectionGradient from "@/components/SectionGradient";

const SolutionSection = () => {
  return (
  <SectionGradient id="solution" className="py-24 sm:py-28 text-black">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        {/* Title + paragraph */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge className="rounded-full px-3 py-1 tracking-[0.18em] uppercase bg-black/5 text-black ring-1 ring-black/10">Pourquoi Kill Crave</Badge>
          <H2 className="mt-4 font-normal leading-tight text-black">
            Le spray Kill Crave qui blackout vos envies de sucre
          </H2>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full bg-tertiary" />
          <P className="mt-4 text-black/75">
Kill Crave neutralise les récepteurs du goût sucré. Sans signal de récompense, le cerveau lâche prise et l’envie retombe en moins d’une minute.          </P>
        </div>

        {/* Illustration */}
        <div className="mb-10 sm:mb-14 max-w-md mx-auto">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-black/10 ring-1 ring-black/10 bg-white/70">
            <img
              src="/images/solution.webp"
              alt="Illustration du spray Kill Crave en situation"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 space-y-3 border border-black/10 bg-white/80 backdrop-blur-lg transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/70 flex items-center justify-center text-[1.6rem]">🌿</div>
              <H3 className="text-xl sm:text-2xl font-normal text-black">Pulvérisez — le sucre perd le goût</H3>
            </div>
            <P className="text-sm sm:text-base text-black/75 leading-relaxed">
              Les récepteurs du sucré se désactivent pendant 30 à 60 minutes. Le gâteau perd son charme. Vous n’avez plus besoin de “résister”.
            </P>
          </Card>

          <Card className="p-6 sm:p-8 space-y-3 border border-black/10 bg-white/80 backdrop-blur-lg transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/70 flex items-center justify-center text-[1.6rem]">📆</div>
              <H3 className="text-xl sm:text-2xl font-normal text-black">Un protocole de 30 jours, un seuil sucré reprogrammé</H3>
            </div>
            <P className="text-sm sm:text-base text-black/75 leading-relaxed">
              Utilisez-le avant les moments à risque (café, dessert, soirée). Jour après jour : moins d’envies, énergie stable, peau plus nette.
            </P>
          </Card>
        </div>
      </div>
    </SectionGradient>
  );
};

export default SolutionSection;
