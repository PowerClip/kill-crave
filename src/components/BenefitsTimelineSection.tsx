import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { H2, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

// Time-based benefits timeline section (inspired by provided reference)
// Uses shadcn accordion & badges. One item open at a time.

type Benefit = {
  id: string;
  timeframe: string; // Badge label
  title: string;
  details: string[];
  defaultOpen?: boolean;
};

const benefits: Benefit[] = [
  {
    id: "ongoing",
    timeframe: "IMMÉDIAT",
    title: "Le goût sucré disparaît en quelques secondes",
    details: [
      "Le goût sucré est temporairement stoppé (30 à 60 min)",
      "Coupe l'envie de grignotage sur le moment",
      "Aide le cerveau à décorréler sucré = récompense",
    ],
  },
  {
    id: "7jours",
    timeframe: "7 JOURS",
    title: "Moins d'envies de sucre et une énergie plus stable",
    details: [
      "Envies de sucré après le déjeuner nettement réduites",
      "Moins de pics et de « crashs » d'énergie ressentis",
      "Fin de journée plus maîtrisée, moins d'écarts",
    ],
    defaultOpen: true,
  },
  {
    id: "2semaines",
    timeframe: "2 SEMAINES",
    title: "Les premiers changements physiques visibles et une digestion plus légère",
    details: [
      "Grignotages sucrés en forte baisse",
      "Ballonnements et inconfort digestif qui s'apaisent",
      "Humeur plus stable, moins d'oscillations liées au sucre",
    ],
  },
  {
    id: "4semaines",
    timeframe: "4 SEMAINES",
    title: "Moins d'mperfections cutanées",
    details: [
      "Rougeurs et imperfections atténuées (retours clientes)",
      "Ventre moins gonflé au réveil, silhouette affinée",
      "Visage visiblement affiné, machôire plus dessinée",
    ],
  },
  {
    id: "3mois",
    timeframe: "3 MOIS",
    title: "Plus aucune dépendance au sucre",
    details: [
      "Attrait pour le sucré quasiment supprimé",
      "Poids et composition corporelle plus faciles à maintenir",
      "Énergie stable perçue comme la « nouvelle norme »",
    ],
  },
];

const BenefitsTimelineSection = () => {
  const defaultValue = benefits.find(b => b.defaultOpen)?.id;
  return (
    <section id="benefits" className="relative py-28 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.2] mix-blend-screen bg-[radial-gradient(circle_at_25%_20%,rgba(241,63,56,0.45),transparent_62%),radial-gradient(circle_at_75%_80%,rgba(241,63,56,0.35),transparent_68%)]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-8 flex flex-col gap-0">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge className="rounded-full px-4 py-1 bg-white/10 text-white ring-1 ring-white/30 backdrop-blur">Timeline Blackout</Badge>
          <H2 className="mt-6 font-normal leading-tight text-white font-serif">Kill Crave transforme vos cravings semaine après semaine</H2>
          <div className="mx-auto mt-5 h-[2px] w-20 rounded-full bg-primary/70" />
        </div>
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl max-w-3xl mx-auto border border-primary/30">
          <img
            src="/images/product/product - held - nobg.webp"
            alt="Spray Kill Crave – rituel"
            className="w-full h-auto object-cover [mask-image:radial-gradient(circle_at_center,white_60%,transparent_85%)] [--webkit-mask-image:radial-gradient(circle_at_center,white_60%,transparent_85%)]"
            loading="lazy"
          />
        </div>
        {/* Tabs (Accordion) */}
        <div className="w-full max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultValue}
            className="overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl divide-y divide-white/10"
          >
            {benefits.map((b) => (
              <AccordionItem key={b.id} value={b.id} className="border-white/10">
                <AccordionTrigger className="py-4 px-5 sm:px-7 text-left group gap-3">
                  <div className="flex flex-col w-full items-start gap-2">
                    <span className="inline-flex items-center justify-center px-2.5 py-[3px] rounded-md text-[10px] font-medium tracking-wide uppercase bg-primary text-primary-foreground whitespace-nowrap leading-none">
                      {b.timeframe}
                    </span>
                    <span className="text-base sm:text-lg font-serif leading-tight text-white group-hover:text-primary/80 transition-colors text-left">
                      {b.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 sm:px-7 pb-6 text-sm text-white/80">
                  <ul className="list-disc pl-5 space-y-2 marker:text-primary/70">
                    {b.details.map(d => (
                      <li key={d} className="leading-relaxed">{d}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-5 text-[11px] text-white/60 max-w-sm">*Retours clients + littérature sur la Gymnema. Résultats individuels variables.</div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsTimelineSection;
