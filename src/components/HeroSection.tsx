import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { formatMoney } from "@/lib/shopify";
import { H1, Lead, P } from "@/components/ui/typography";
import { Star, Check } from "lucide-react";
// Use the same hero image on all devices via public path

const HeroSection = () => {
  const { price, isLoading } = useShopifyProduct();
  const priceLabel = isLoading ? "…" : formatMoney(price, "24,90 €");

  return (
  <section id="how" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <div className="relative container mx-auto max-w-6xl px-4 sm:px-8 py-12 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Text */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="px-3 py-1 font-medium">+2.000 vendus le mois dernier</Badge>
                <div className="flex items-center gap-1 text-[13px] font-serif text-muted-foreground">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                  <span className="ml-1">4,8/5</span>
                </div>
              </div>
              <H1 className="normal-case leading-[1.05] tracking-tight font-serif font-normal text-primary">
                Le spray qui coupe net ton envie de sucre en 60 secondes
              </H1>
              <Lead className="normal-case max-w-lg text-foreground/80">
                1–2 sprays sur la langue. Le goût sucré disparaît temporairement et tu n'as plus envie de sucre. Tu perds du poids naturellement, sans frustration. 
              </Lead>
            </div>

            <ul className="space-y-3 text-[15px] text-foreground/85 max-w-md font-serif">
              {[
                'Coupe le goût et l\'envie de sucre instantanément',
                'Moins de grignotages, silhouette plus fine',
                'Énergie plus stable au fil de la journée',
                'Actif végétal, cliniquement prouvé',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-secondary/60 border border-secondary/70 flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span className="leading-snug tracking-[0.1px]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="sm" className="sm:h-12 px-8 rounded-xl" asChild>
                <a href="#offer">Commencer – {priceLabel}</a>
              </Button>
              <Button variant="outline" size="sm" className="sm:h-12 px-8 rounded-xl backdrop-blur" asChild>
                <a href="#science">Voir comment ça marche</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
              <span className="relative pl-0 after:content-[''] after:absolute after:-right-2 after:top-1/2 after:-translate-y-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-secondary/60">Formulation Française</span>
              <span className="relative pl-0 after:content-[''] after:absolute after:-right-2 after:top-1/2 after:-translate-y-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-secondary/60">Actifs Standardisés</span>
              <span>Garantie 30 Jours</span>
            </div>
          </div>

          {/* Image / Visual */}
          <div className="lg:col-span-6">
            <div className="relative max-w-xl mx-auto">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border bg-card shadow-hero">
                <img
                  src="/images/hero.png"
                  alt="Spray anti-envie de sucre Bye Sweetie"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 via-background/30 to-tertiary/20 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden sm:block h-32 w-32 rounded-full bg-secondary/40 blur-2xl" />
              <div className="absolute -top-6 -right-6 hidden sm:block h-40 w-40 rounded-full bg-tertiary/20 blur-3xl" />
            </div>
          </div>
        </div>
        <P className="mt-10 text-[11px] sm:text-xs text-muted-foreground/70 max-w-2xl">
          Utilisation: avant dessert, café sucré, grignotage potentiel. Effet 30–60 min. Ne remplace pas une prise en charge médicale. Déconseillé aux femmes enceintes/allaitantes et personnes sous traitement sans avis professionnel.
        </P>
      </div>
    </section>
  );
};

export default HeroSection;
