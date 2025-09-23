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
          <H2 className="font-normal leading-tight normal-case font-serif">Gymnema sylvestre — la plante anti-sucre originaire d’Asie</H2>
          <P className="mt-6 text-muted-foreground text-base">Utilisée depuis des siècles dans la tradition ayurvédique, elle agit rapidement sur les récepteurs du goût sucré.</P>

          <div className="mt-10 text-left w-full">
            <H3 className="text-xl sm:text-2xl font-normal normal-case font-serif text-primary">Une composition simple et française</H3>
            <P className="mt-3 text-muted-foreground text-base">Développée et standardisée en France, avec des ingrédients d’origine naturelle:</P>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-foreground/90">
              <li>Gymnema sylvestre (actif principal)</li>
              <li>Extrait de thé vert</li>
              <li>Zinc</li>
              <li>Menthe poivrée</li>
              <li>Glycérine végétale</li>
            </ul>
            <P className="mt-4 text-muted-foreground text-base">Sans alcool. Sans colorants. Sans édulcorants artificiels.</P>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
