import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H2, H3, P } from "@/components/ui/typography";
import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import SectionGradient from "@/components/SectionGradient";

const steps = [
  { title: "2 sprays", text: "Vous pulvérisez quand l'envie arrive.", icon: "spray" },
  { title: "Récepteurs masqués", text: "Le sucré est bloqué pendant 30 à 60 minutes.", icon: "lock" },
  { title: "Goût plus plat", text: "Gâteau / soda perdent l'effet wahou.", icon: "flat" },
  { title: "Envie passée", text: "Vous continuez sans craquage.", icon: "check" },
];

const StepIcon = ({ name }: { name: string }) => {
  const base = "h-3.5 w-3.5 stroke-[1.5]";
  switch (name) {
    case "spray":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="9" y="8" width="6" height="12" rx="2" />
          <path d="M11 8V5a2 2 0 0 1 2-2h3v3h-3" />
          <path d="M8 8h8" />
        </svg>
      );
    case "lock":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "flat":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 15h18" />
          <path d="M4 9c2-.8 4-.8 6 0s4 .8 6 0 4-.8 6 0" opacity="0.4" />
        </svg>
      );
    case "check":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M5 13l4 4 10-10" />
        </svg>
      );
    default:
      return null;
  }
};

const UsageTimeline = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (inView && revealed < steps.length) {
      let i = revealed;
      const interval = setInterval(() => {
        i += 1;
        setRevealed(i);
        if (i >= steps.length) clearInterval(interval);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [inView, revealed]);

  const progress = steps.length > 1 ? ((revealed - 1) / (steps.length - 1)) * 100 : 0;
  return (
    <div ref={ref} className="relative">
      <H3 className="text-xl font-normal mb-6 font-serif text-black">Comment vous l'utilisez</H3>
      <div className="relative">
        <div className="absolute left-4 top-1 bottom-1 w-px bg-tertiary/15" />
        <div
          className="absolute left-4 top-1 w-px bg-gradient-to-b from-tertiary/70 via-tertiary/60 to-tertiary/20 transition-all duration-700 ease-out"
          style={{ height: `${Math.max(0, Math.min(100, progress))}%` }}
        />
        <ul className="ml-0 pl-0 space-y-7">
          {steps.map((s, idx) => {
            const active = idx < revealed;
            return (
              <li
                key={s.title}
                className={`relative flex items-start gap-4 pl-10 transition-all duration-500 ${
                  active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: `${idx * 110}ms` }}
              >
                <div className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-tertiary/30 bg-white shadow-sm ring-1 ring-black/10 transition-all duration-500 ${active ? "bg-tertiary/80 text-black" : "text-tertiary/70"}`}>
                  <StepIcon name={s.icon} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[13px] font-medium tracking-wide text-secondary-foreground">{s.title}</div>
                  <div className="text-sm text-black/75 leading-relaxed max-w-xs">{s.text}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// Static science illustration now replaces the previous carousel.

const HowItWorksSection = () => {
  return (
    <SectionGradient id="how-it-works" className="py-28 text-black">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge className="rounded-full px-4 py-1 bg-black/5 text-black ring-1 ring-black/10 backdrop-blur-sm tracking-[0.24em]">Kill Switch</Badge>
          <H2 className="mt-6 font-normal leading-tight font-serif text-black">Blackout Sugar en 3 gestes chrono</H2>
          <div className="mx-auto mt-5 h-[2px] w-20 rounded-full bg-tertiary/60" />
          <P className="mt-6 text-black/80 text-base">Deux sprays sur la langue et le goût sucré décroche. Plus de récompense pour le cerveau, l’envie tombe et vous gardez vos objectifs sous contrôle.</P>
        </div>

        {/* Static science graphic */}
        <div className="relative rounded-3xl border border-black/10 bg-white/60 backdrop-blur-lg p-6 sm:p-10 shadow-hero overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/howitworks/how-it-works.png"
                  alt="Comment Kill Crave agit"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {/* Placeholder overlays for future annotation pins */}
                <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,white_70%,transparent_100%)]" />
              </div>
            </div>
            <div className="space-y-10">
              <UsageTimeline />
              <div className="text-sm text-black/70 space-y-1 pt-2 border-t border-black/10">
                <div>Action locale, sans sucre ajouté, sans excitant.</div>
                <div>* Ne remplace pas une alimentation équilibrée.</div>
              </div>
            </div>
          </div>
  </div>
  <div className="mt-12 text-center">
            <Button variant="hero" size="lg" className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6" asChild>
              <a href="#offer">
                <span className="block sm:hidden">Blackout Sugar</span>
                <span className="hidden sm:block">Je déclenche le blackout</span>
              </a>
            </Button>
             <div className="mt-4 text-sm text-black/70">Basé sur la littérature Gymnema. Effet perçu variable selon les personnes.</div>
  </div>
      </div>
    </SectionGradient>
  );
};

export default HowItWorksSection;
