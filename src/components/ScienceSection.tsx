import { H2, H3, P } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import SectionGradient from "@/components/SectionGradient";

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
    text: 'Sans pic de récompense, l’envie passe en 5–10 min. Répété chaque jour, votre seuil de sensibilité au sucre se ré-équilibre → moins de dépendance.'
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
  <SectionGradient id="science" className="py-28 text-black">
      <div className="container mx-auto max-w-5xl px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge className="rounded-full px-4 py-1 bg-black/5 text-black ring-1 ring-black/10 backdrop-blur">Science Blackout</Badge>
            <H2 className="mt-6 font-normal leading-tight text-black font-serif tracking-tight">Pourquoi Kill Crave coupe instantanément le sucre</H2>
            <div className="mx-auto mt-5 h-[2px] w-20 rounded-full bg-primary/70" />
            <P className="mt-6 text-black/80 text-base">Les acides gymnémiques occupent les récepteurs T1R2/T1R3. Plus de signal « sucré » envoyé au cerveau, l’envie s’effondre. Utilisé repetitivement, le seuil de tolérance au sucre baisse et les compulsions disparaissent.</P>
            <div className="mt-10 relative mx-auto max-w-xl rounded-3xl overflow-hidden border border-black/10 bg-white/80 backdrop-blur-lg p-4 sm:p-6">
              <img
                src="/images/howitworks/splash-product.png"
                alt="Product splash – Kill Crave"
                className="w-full h-auto object-cover rounded-2xl brightness-110"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white_70%,transparent_100%)]" />
            </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {scienceSteps.map((s, i) => (
            <div
              key={s.step}
              className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/80 backdrop-blur-lg p-6 sm:p-8 flex flex-col gap-3 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-[13px] font-medium tracking-wide text-primary-foreground ring-1 ring-primary/40">
                  {i + 1}
                </span>
                <H3 className="text-lg sm:text-xl font-normal leading-snug text-black font-serif">{s.title}</H3>
              </div>
              <P className="text-sm text-black/75 leading-relaxed">{s.text}</P>
            </div>
          ))}
        </div>
        <div className="mt-8 text-sm text-black/70 max-w-md">* Basé sur littérature goût & retours utilisateurs. Effets variables. Pas un dispositif médical.</div>
      </div>
    </SectionGradient>
  );
}
