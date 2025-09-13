import { Badge } from "@/components/ui/badge";
import { H2, H3, P } from "@/components/ui/typography";

// Light, clean ingredient focus section (single hero ingredient for now)
const IngredientsSection = () => {
  return (
    <section id="ingredients" className="relative py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F6F1EA] to-[#FBF9F5] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none bg-[radial-gradient(circle_at_20%_25%,rgba(170,130,80,0.10),transparent_60%),radial-gradient(circle_at_80%_75%,rgba(170,130,80,0.10),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <Badge className="rounded-full px-4 py-1 bg-tertiary/10 text-tertiary ring-1 ring-tertiary/25 backdrop-blur-sm tracking-wide mb-10">ACTIF PRINCIPAL</Badge>
          <div className="relative w-full max-w-xl mb-10 overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-tertiary/15 p-4 sm:p-6 shadow-card">
            <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,white_70%,transparent_100%)]" />
            <img
              src="/images/ingredient/gymnema.webp"
              alt="Feuille de Gymnema – ingrédient clé du spray"
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          <H2 className="font-normal leading-tight normal-case font-serif">Gymnema — La plante anti-sucre venu d’Asie</H2>
          <P className="mt-6 text-muted-foreground text-base">Plante ayurvédique reconnue comme le frein naturel au goût sucré. Son action rapide calme les envies immédiatement et permet de retrouver un meilleur équilibre au quotidien.</P>
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
