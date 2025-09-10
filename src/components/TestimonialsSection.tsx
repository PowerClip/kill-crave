import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { H2 } from "@/components/ui/typography";

const TestimonialsSection = () => {
  const ugc = [
    {
      src: "/images/ugc/Ugc1.png",
      alt: "UGC: femme utilisant le spray Bye Sweetie",
      nugget: "le sucre n'avait plus de goût, donc j'ai arrêté",
    },
    {
      src: "/images/ugc/Ugc2.png",
      alt: "UGC: résultats transformation",
      nugget: "super facile d'arrêter le sucre, -4kg en un mois",
    },
    {
      src: "/images/ugc/Ugc3.png",
      alt: "UGC: témoignage énergie",
      nugget: "plus d'envies à 16h, liberté totale — j'ai arrêté totalement, en 2 semaines mon visage a dégonflé",
    },
    {
      src: "/images/ugc/Ugc4.png",
      alt: "UGC: amélioration de la peau",
      nugget: "peau plus nette en 3 semaines, glow",
    },
    {
      src: "/images/ugc/ugc - byesweetie.png",
      alt: "UGC: expérience utilisatrice",
      nugget: "fini les fringales, je contrôle enfin mes envies",
    },
    {
      src: "/images/ugc/ugc - byesweetie 2.png",
      alt: "UGC: témoignage perte de poids",
      nugget: "plus de grignotage le soir, -6kg en 2 mois",
    },
    {
      src: "/images/ugc/ugc - byesweetie 3.png",
      alt: "UGC: amélioration du sommeil",
      nugget: "sommeil de qualité, plus de pics de glycémie",
    },
    {
      src: "/images/ugc/ugc - byesweetie4.png",
      alt: "UGC: confiance retrouvée",
      nugget: "confiance en moi retrouvée, je me sens libre",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <H2 className="text-5xl lg:text-6xl font-normal leading-tight">Résultats réels</H2>
        </div>

        {/* Mobile: UGC carousel with portrait 3:4 and peek */}
        <div className="md:hidden">
          <div className="relative rounded-3xl">
            <Carousel opts={{ align: "start", loop: true }} className="relative">
              <CarouselContent>
                {ugc.map((item, i) => (
                  <CarouselItem key={i} className="basis-[88%]">
                    <figure className="relative overflow-hidden rounded-3xl shadow-card border border-border group" aria-label={item.alt}>
                      <div className="aspect-[3/4] w-full overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover select-none"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 pointer-events-none" />
                      <figcaption className="absolute bottom-3 left-3 right-3">
                        <span className="inline-flex items-center px-3 py-2 rounded-xl text-white text-sm font-medium tracking-tight bg-white/10 backdrop-blur-md ring-1 ring-white/20 max-w-[90%] whitespace-normal break-words">
                          “{item.nugget}”
                        </span>
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-3" />
              <CarouselNext className="-right-3" />
            </Carousel>
          </div>
        </div>

        {/* Desktop/tablet: grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {ugc.map((item, i) => (
            <figure
              key={i}
              className="relative overflow-hidden rounded-3xl shadow-card border border-border group"
              aria-label={item.alt}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover aspect-[3/4] md:aspect-square select-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 pointer-events-none" />
              <figcaption className="absolute bottom-3 left-3 right-3">
                <span className="inline-flex items-center px-3 py-2 rounded-xl text-white text-sm sm:text-base font-medium tracking-tight bg-white/10 backdrop-blur-md ring-1 ring-white/20 max-w-[90%] sm:max-w-full whitespace-normal break-words">
                  “{item.nugget}”
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

  {/* Social Proof */}
  <div className="text-center mt-16 sm:mt-24">
    <div className="grid grid-cols-3 gap-4 sm:flex sm:justify-center sm:items-center sm:gap-12 text-muted-foreground max-w-4xl mx-auto px-4">
      <div className="text-center group">
        <div className="font-serif text-3xl sm:text-4xl font-light text-primary mb-1 sm:mb-2 group-hover:text-tertiary transition-smooth">2,847</div>
        <div className="text-xs sm:text-base">Françaises transformées</div>
      </div>
      <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent"></div>
      <div className="text-center group">
        <div className="font-serif text-3xl sm:text-4xl font-light text-primary mb-1 sm:mb-2 group-hover:text-tertiary transition-smooth">4.9/5</div>
        <div className="text-xs sm:text-base">Note moyenne</div>
      </div>
      <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent"></div>
      <div className="text-center group">
        <div className="font-serif text-3xl sm:text-4xl font-light text-primary mb-1 sm:mb-2 group-hover:text-tertiary transition-smooth">94%</div>
        <div className="text-xs sm:text-base">Recommanderaient</div>
      </div>
    </div>
  </div>
        </div>
    </section>
  );
};

export default TestimonialsSection;
