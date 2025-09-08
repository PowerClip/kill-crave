import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Star } from "lucide-react";
import { useState } from "react";

const OfferSection = () => {
  const productImages = [
    "/images/product/1.png",
    "/images/product/2.png",
    "/images/product/3.png",
    "/images/product/4.png",
    "/images/product/5.png",
    "/images/product/6.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="offer" className="py-24 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <div className="text-center mb-8 sm:mb-10">
          <Badge variant="secondary" className="rounded-full px-3 py-1">Le produit</Badge>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-primary">Le Spray Bye Sweetie - 30 Jours</h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">Le spray Bye Sweetie coupe instantanément le goût sucré pour vous aider à contrôler vos envies et retrouver une énergie stable jour après jour.</p>
        </div>
        <div className="rounded-3xl border bg-card/70 backdrop-blur p-4 sm:p-6 lg:p-8 shadow-card">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl border bg-card shadow-card">
              <img
                src={productImages[activeIndex]}
                alt="Spray Bye Sweetie - 30 Jours"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3">
              {productImages.map((src, i) => (
                <button
                  key={src}
                  aria-current={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl border bg-card transition-shadow ${
                    i === activeIndex ? "ring-2 ring-accent-lavender" : "hover:ring-1 hover:ring-accent-lavender/60"
                  }`}
                >
                  <img src={src} alt={`Aperçu produit ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Bye Sweetie</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <span>4,7/5 – Adopté par des milliers de femmes</span>
              </div>
            </div>

            <div className="flex items-end gap-3">
              <div className="font-serif text-4xl sm:text-5xl font-light text-primary">24.90€</div>
            </div>

            <div className="text-sm text-muted-foreground">
              <div>90 doses — Pour 3 repas par jour</div>
              <div>Soit 0.9€ par jour pour supprimer votre envie de sucre</div>
            </div>

            <ul className="space-y-2 text-sm sm:text-base">
              {[
                "Goût sucré neutralisé en 60 secondes",
                "Moins de grignotages, plus de contrôle 🍫",
                "Peau plus nette & ventre moins gonflé",
                "Energie au top toute la journée, sans crash",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-primary">
                  <Check className="h-4 w-4 mt-1 text-emerald-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <Button
                variant="premium"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  const link = import.meta.env.VITE_STRIPE_PAYMENT_LINK_URL as string | undefined;
                  if (link) {
                    window.location.href = link;
                  } else {
                    alert("Lien de paiement indisponible. Configurez VITE_STRIPE_PAYMENT_LINK_URL.");
                  }
                }}
              >
                Acheter maintenant — 24.90€
              </Button>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Livraison gratuite en 3 à 5 jours ouvrés en France
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground/80">
                Expédié sous 24h • 30j satisfait ou remboursé
              </div>
            </div>

            <Accordion type="single" collapsible className="rounded-2xl border divide-y bg-card">
              <AccordionItem value="contenu" className="px-4 sm:px-6">
                <AccordionTrigger className="py-4 font-serif text-primary">Ce que vous recevez</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Spray Bye Sweetie (90 doses pour 30 jours), mini-guide d’utilisation, idées de petits-déjeuners riches en protéines.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="utilisation" className="px-4 sm:px-6">
                <AccordionTrigger className="py-4 font-serif text-primary">Comment l’utiliser</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  1–2 pulvérisations avant les moments à risque (café de l’après-midi, dessert). Effet 30–60 minutes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients" className="px-4 sm:px-6">
                <AccordionTrigger className="py-4 font-serif text-primary">Ingrédients</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <span className="font-medium text-primary">Plante Gymnema sylvestre</span> — connue pour neutraliser temporairement
                      les récepteurs du goût sucré sur la langue.
                    </li>
                    <li>
                      <span className="font-medium text-primary">Extrait de thé vert & zinc</span> — soutien du métabolisme énergétique, aide
                      à brûler davantage de calories au quotidien.
                    </li>
                    <li>
                      <span className="font-medium text-primary">Goût menthe</span> — sensation fraîche et propre, sans arrière-goût.
                    </li>
                  </ul>
                  <div className="mt-3">Sans colorants ni édulcorants artificiels.</div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="px-4 sm:px-6">
                <AccordionTrigger className="py-4 font-serif text-primary">Livraison & retours</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Livraison offerte en France métropolitaine, expédition sous 24h. Retour sous 30 jours si non ouvert.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
