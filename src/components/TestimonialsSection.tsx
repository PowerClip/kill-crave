const TestimonialsSection = () => {
  const ugc = [
    {
      src: "/images/ugc/3a562574-e3ef-4e97-84b9-ce28befab428.jpeg",
      alt: "UGC: femme tenant le spray",
      nugget: "le sucre n'avait plus de goût, donc j'ai arrêté",
    },
    {
      src: "/images/ugc/f7632924-bcbf-4815-bd50-766aec530f57.jpeg",
      alt: "UGC: gros plan du spray",
      nugget: "super facile d'arrêter le sucre, -4kg en un mois",
    },
    {
      src: "/images/ugc/81958d56-45dd-443b-b1f5-da1d21dc2199.jpeg",
      alt: "UGC: avant / après énergie au travail",
  nugget: "plus d’envies à 16h, liberté totale — j'ai arrêté totalement, en 2 semaines mon visage a dégonflé, les traits sont définis",
    },
    {
      src: "/images/ugc/175c0ef4-6a29-4b8b-95ba-ec3f11ae3caa.jpeg",
      alt: "UGC: selfie peau plus nette",
      nugget: "peau plus nette en 3 semaines, glow",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2 className="font-serif text-5xl lg:text-6xl font-light text-primary leading-tight">
            Résultats réels
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {ugc.map((item, i) => (
            <figure
              key={i}
              className="relative overflow-hidden rounded-3xl shadow-card border border-border group"
              aria-label={item.alt}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover aspect-[4/5] md:aspect-square select-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 pointer-events-none" />
              <figcaption className="absolute bottom-3 left-3 right-3">
                <span className="inline-flex items-center px-3 py-2 rounded-xl text-white text-sm sm:text-base font-medium tracking-tight bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                  “{item.nugget}”
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Social Proof */}
  <div className="text-center mt-16 sm:mt-24">
          <div className="flex justify-center items-center space-x-12 text-muted-foreground max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="font-serif text-4xl font-light text-primary mb-2 group-hover:text-accent-hot transition-smooth">2,847</div>
              <div className="text-base">Françaises transformées</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="text-center group">
              <div className="font-serif text-4xl font-light text-primary mb-2 group-hover:text-accent-electric transition-smooth">4.9/5</div>
              <div className="text-base">Note moyenne</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="text-center group">
              <div className="font-serif text-4xl font-light text-primary mb-2 group-hover:text-accent-coral transition-smooth">94%</div>
              <div className="text-base">Recommanderaient</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
