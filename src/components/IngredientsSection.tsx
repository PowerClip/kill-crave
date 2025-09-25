import { Badge } from "@/components/ui/badge";
import { H2, H3, P } from "@/components/ui/typography";

// Light, clean ingredient focus section (single hero ingredient for now)
const IngredientsSection = () => {
  return (
    <section id="ingredients" className="relative py-28 bg-gradient-to-b from-[#F4E9DC] via-[#F2E2D0] to-[#F7EEE4] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(circle_at_18%_22%,rgba(241,63,56,0.25),transparent_62%),radial-gradient(circle_at_82%_78%,rgba(12,12,12,0.12),transparent_68%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <Badge className="rounded-full px-4 py-1 bg-primary/15 text-secondary uppercase tracking-[0.18em] ring-1 ring-primary/30 backdrop-blur-sm mb-10">ACTIF BLACKOUT</Badge>
          <div className="relative w-full max-w-xl mb-10 overflow-hidden rounded-3xl bg-white/75 backdrop-blur-xl border border-primary/20 p-4 sm:p-6 shadow-card">
            <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,white_70%,transparent_100%)]" />
            <img
              src="/images/ingredient/gymnema.webp"
              alt="Feuille de Gymnema – ingrédient clé du spray Kill Crave"
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          <H2 className="font-normal leading-tight font-serif">Gymnema sylvestre — coeur de la formule Kill Crave</H2>
          <P className="mt-6 text-muted-foreground text-base">Plante ayurvédique surnommée « sugar destroyer », elle neutralise temporairement les récepteurs du goût sucré pour stopper l’envie.</P>

          <div className="mt-10 text-left w-full">
            <H3 className="text-xl sm:text-2xl font-normal font-serif text-secondary">Formulé et standardisé en France</H3>
            <P className="mt-3 text-muted-foreground text-base">Trois ingrédients pour un blackout du sucre efficace et propre :</P>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-foreground/90">
              <li>Gymnema sylvestre titrée (acides gymnémiques standardisés)</li>
              <li>Menthe poivrée cryo-distillée</li>
              <li>Glycérine végétale biologique</li>
            </ul>
            <P className="mt-4 text-muted-foreground text-base">Sans alcool, sans colorants, sans édulcorants. Rien d’inutile.</P>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
