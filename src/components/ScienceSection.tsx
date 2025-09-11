import { H2, H3, P } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';

// Simple science explanation inspired by "Seed" clarity + "AIME" editorial calm
// Copy kept courte / vulgarisée pour compréhension rapide

const scienceSteps = [
  {
    step: 'Étape 1',
    title: 'Pulvérisation ciblée',
    text: '1–2 sprays directement sur la langue. Les molécules actives (acides gymnémiques) se dissolvent immédiatement dans la salive.'
  },
  {
    step: 'Étape 2',
    title: 'Blocage des récepteurs sucrés',
    text: 'Les acides gymnémiques se fixent temporairement sur les récepteurs du goût sucré (T1R2 / T1R3). Le cerveau ne reçoit plus le signal « sucré ». Le dessert devient fade.'
  },
  {
    step: 'Étape 3',
    title: 'Envie qui retombe',
    text: 'Sans pic de récompense, l’envie passe en 5–10 min. Répété chaque jour, ton seuil de sensibilité au sucre se ré-équilibre → moins de dépendance.'
  },
  {
    step: 'Étape 4',
    title: 'Effets cumulés',
    text: 'Moins de sucres rapides = énergie stable, moins d’inflammation, peau plus nette, ventre moins gonflé.'
  }
];

// Removed spray vs capsules comparison per new brief

export default function ScienceSection() {
  return (
  <section id="science" className="relative py-28 bg-gradient-to-b from-[#9AAF63] via-[#7F934A] to-[#5C6F33] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.18),transparent_65%)]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge className="rounded-full px-4 py-1 bg-white/15 text-white ring-1 ring-white/25 backdrop-blur">Rééducation</Badge>
            <H2 className="mt-6 font-normal leading-tight text-white uppercase tracking-tight">Le sucre n’a plus le dernier mot</H2>
            <div className="mx-auto mt-5 h-[2px] w-20 rounded-full bg-white/70" />
            <P className="mt-6 text-white/80 text-base">À chaque pulvérisation, tes récepteurs du sucré sont bloqués. Ton cerveau ne reçoit plus la récompense → l’envie disparaît. Répété sur quelques semaines, ton goût se rééduque et les envies compulsives chutent.</P>
            <div className="mt-10 relative mx-auto max-w-xl rounded-3xl overflow-hidden border border-white/25 bg-white/10 backdrop-blur-xl p-4 sm:p-6">
              <img
                src="/images/howitworks/product splash.jpg"
                alt="Product splash – Bye Sweetie"
                className="w-full h-auto object-cover rounded-2xl"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white_70%,transparent_100%)]" />
            </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {scienceSteps.map((s, i) => (
            <div
              key={s.step}
              className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 sm:p-8 flex flex-col gap-3 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/15 text-[11px] font-medium tracking-wide text-white ring-1 ring-white/25">
                  {i + 1}
                </span>
                <H3 className="text-lg sm:text-xl font-normal leading-snug text-white">{s.title}</H3>
              </div>
              <P className="text-sm text-white/80 leading-relaxed">{s.text}</P>
            </div>
          ))}
        </div>
        <div className="mt-8 text-[11px] text-white/55 max-w-md">* Basé sur littérature goût & retours utilisateurs. Effets variables. Pas un dispositif médical.</div>
      </div>
    </section>
  );
}
