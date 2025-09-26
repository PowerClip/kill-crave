import { Badge } from "@/components/ui/badge";
import { H2, H3, P } from "@/components/ui/typography";
import SectionGradient from "@/components/SectionGradient";

// Light, clean ingredient focus section (single hero ingredient for now)
const IngredientsSection = () => {
  return (
    <SectionGradient id="ingredients" className="py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 text-white">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Badge className="rounded-full px-4 py-1 bg-white/10 text-white uppercase tracking-[0.18em] ring-1 ring-white/20 backdrop-blur mb-10">ACTIF BLACKOUT</Badge>
          <div className="relative w-full max-w-xl mb-10 overflow-hidden rounded-[32px] border border-white/15 backdrop-blur-sm p-4 sm:p-6">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/35 blur-[110px]" />
            <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-white/15 blur-[90px]" />
            <img
              src="/images/ingredient/transparent-gymnema.png"
              alt="Feuille de Gymnema — ingrédient clé du spray Kill Crave"
              className="relative w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <H2 className="font-normal leading-tight font-serif text-white">Gymnema Sylvestre — Coeur De La Formule Kill Crave</H2>
          <P className="mt-6 text-white/75 text-base">Plante ayurvédique surnommée « sugar destroyer », elle neutralise temporairement les récepteurs du goût sucré pour stopper l’envie.</P>

          <div className="mt-10 text-left w-full bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur">
            <H3 className="text-xl sm:text-2xl font-normal font-serif text-white">Formulé Et Standardisé En France</H3>
            <P className="mt-3 text-white/70 text-base">Trois ingrédients pour un blackout du sucre efficace et propre :</P>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-white/85">
              <li>Gymnema sylvestre titrée (acides gymnémiques standardisés)</li>
              <li>Menthe poivrée cryo-distillée</li>
              <li>Glycérine végétale biologique</li>
            </ul>
            <P className="mt-4 text-white/70 text-base">Sans alcool, sans colorants, sans édulcorants. Rien d’inutile.</P>
          </div>
        </div>
      </div>
    </SectionGradient>
  );
};

export default IngredientsSection;
