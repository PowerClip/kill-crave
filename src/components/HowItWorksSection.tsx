import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Slide = {
  title: string;
  subtitle: string;
  text: string;
  image: string;
};

const slides: Slide[] = [
  {
    title: "Bloc 1",
    subtitle: "Les récepteurs du goût",
    text: "Sur ta langue, il existe des capteurs qui détectent le sucre.",
    image: "/images/howitworks/1.jpg",
  },
  {
    title: "Bloc 2",
    subtitle: "L’action de la plante",
    text: "La plante Gymnema agit comme un bouclier : elle bloque temporairement ces capteurs.",
    image: "/images/howitworks/2.jpg",
  },
  {
    title: "Bloc 3",
    subtitle: "Résultat immédiat",
    text: "Le goût sucré disparaît. Le dessert devient fade → ton envie tombe.",
    image: "/images/howitworks/3.jpg",
  },
  {
    title: "Bloc 4",
    subtitle: "Effet durable",
    text: "L’effet dure environ une heure, le temps de traverser la tentation.",
    image: "/images/howitworks/4.jpg",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
        <div className="text-center mb-8 sm:mb-10">
          <Badge variant="secondary" className="rounded-full px-3 py-1">Comprendre</Badge>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-primary">Pourquoi ça marche ?</h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">Un spray, une réaction scientifique immédiate.</p>
        </div>

        <div className="relative rounded-3xl border bg-card/70 backdrop-blur p-4 sm:p-6 lg:p-8 shadow-card">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="relative"
            aria-label="Comment Bye Sweetie agit"
          >
            <CarouselContent>
              {slides.map((s, idx) => (
                <CarouselItem key={idx} className="basis-[88%] sm:basis-[70%] lg:basis-1/2">
                  <div className="h-full rounded-2xl border bg-card p-4 sm:p-6 flex flex-col gap-4">
                    <div className="aspect-square w-full overflow-hidden rounded-xl border bg-muted/30">
                      <img src={s.image} alt={s.subtitle} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.title}</div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-primary">{s.subtitle}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{s.text}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 sm:-left-6" />
            <CarouselNext className="-right-3 sm:-right-6" />
          </Carousel>

          <div className="mt-6 sm:mt-8 text-center px-1 sm:px-0">
            <Button variant="premium" size="lg" className="w-full sm:w-auto max-w-full overflow-hidden mx-auto" asChild>
              <a href="#checkout" className="block truncate">👉 Je lance ma Cure Bye Sweetie</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
