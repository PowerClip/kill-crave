import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { H2 } from "@/components/ui/typography";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TestimonialsSectionProps {
  id?: string;
}

const TestimonialsSection = ({ id }: TestimonialsSectionProps) => {
  const ugc = [
    {
      src: "/images/ugc/Ugc1.webp",
      alt: "UGC: femme utilisant le spray Bye Sweetie",
  nugget: "Je l'ai utilisé après le déjeuner et mon carré de chocolat habituel avait littéralement le goût de carton, je l'ai reposé et je n'étais plus tentée pendant plusieurs heures.",
    },
    {
      src: "/images/ugc/Ugc2.webp",
      alt: "UGC: résultats transformation",
  nugget: "Au neuvième jour j'étais déjà à -2 kg sans sensation de me priver et et surtout à 16h je ne crash plus alors qu'avant je vidais toujours le tiroir à biscuits du bureau.",
    },
    {
      src: "/images/ugc/Ugc3.webp",
      alt: "UGC: témoignage énergie",
  nugget: "J'ai testé un peu sceptique par nature, deux pulvérisations avant de goûter un dessert de mon copain. Et j'avais juste plus envie, même après un verre d'eau",
    },
    {
      src: "/images/ugc/Ugc4.webp",
      alt: "UGC: amélioration de la peau",
  nugget: "Acné inflammatoire depuis des années et après trois semaines à pulvériser avant mes envies de grignotages ma peau est plus claire, je me réveille moins gonflée et heureuse de regarder dans le miroir.",
    },
    {
      src: "/images/ugc/ugc - byesweetie.webp",
      alt: "UGC: expérience utilisatrice",
  nugget: "Pendant mes soirées Netflix je finissais toujours un paquet de biscuits plus de la glace et maintenant je pulvérise, je goûte, c’est fade, l'envie s'éteint, je passe la soirée tranquille et je fais plus d'insomnie.",
    },
    {
      src: "/images/ugc/ugc - byesweetie 2.webp",
      alt: "UGC: témoignage perte de poids",
  nugget: "J'ai réalisé que je grignotais surtout par automatisme et le spray casse la boucle parce que le cerveau n'obtient plus sa petite récompense sucrée donc il arrête de réclamer et au final je suis à -4,7 kg en six semaines sans compter les calories.",
    },
    {
      src: "/images/ugc/ugc - byesweetie 3.webp",
      alt: "UGC: amélioration du sommeil",
  nugget: "En quatorze jours mon ventre est moins ballonné, mon mood est stable et j'ai refusé deux fois une petite part de gâteau juste parce que j'en avais pas envie, je me sens en contrôle et c'est totalement nouveau pour moi.",
    },
    {
      src: "/images/ugc/ugc - byesweetie4.webp",
      alt: "UGC: confiance retrouvée",
  nugget: "Ce qui change la vie c'est que je peux maintenant laisser une tablette de chocolat ouverte sur la table et elle reste là alors qu'avant c'était impossible, le goût neutre coupe l'histoire dans ma tête et j'ai une vraie sensation de liberté.",
    },
  ];

  return (
    <section id={id} className="pt-0 pb-24 sm:py-2 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <H2 className="text-5xl lg:text-6xl font-normal leading-tight normal-case">Témoignages:</H2>
        </div>

        {/* Mobile: UGC carousel with portrait 3:4 and peek (now using Card) */}
        <div className="md:hidden">
          <div className="relative rounded-3xl">
            <Carousel opts={{ align: "start", loop: true }} className="relative">
              <CarouselContent>
                {ugc.map((item, i) => (
                  <CarouselItem key={i} className="basis-[88%]">
                    <Card className="relative overflow-hidden rounded-3xl group h-full">
                      <CardContent className="p-0">
                        <div className="aspect-[3/4] w-full overflow-hidden">
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-full object-cover select-none"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 pointer-events-none" />
                      </CardContent>
                      <CardFooter className="absolute bottom-3 left-3 right-3 p-0">
                        <Badge variant="secondary" className="bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20 font-medium text-xs px-3 py-2 rounded-xl max-w-[90%] whitespace-normal break-words">
                          “{item.nugget}”
                        </Badge>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-3" />
              <CarouselNext className="-right-3" />
            </Carousel>
          </div>
        </div>

        {/* Desktop/tablet: grid using Card */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {ugc.map((item, i) => (
            <Card key={i} className="relative overflow-hidden rounded-3xl group">
              <CardContent className="p-0">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover aspect-[3/4] md:aspect-square select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 pointer-events-none" />
              </CardContent>
              <CardFooter className="absolute bottom-3 left-3 right-3 p-0">
                <Badge variant="secondary" className="bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20 font-medium text-sm sm:text-base px-3 py-2 rounded-xl max-w-[90%] sm:max-w-full whitespace-normal break-words">
                  “{item.nugget}”
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>

  {/* Social Proof */}
  <div className="text-center mt-16 sm:mt-24">
    <div className="grid grid-cols-3 gap-4 sm:flex sm:justify-center sm:items-center sm:gap-12 text-muted-foreground max-w-4xl mx-auto px-4">
      <div className="text-center group">
        <div className="font-serif text-3xl sm:text-4xl font-light text-primary mb-1 sm:mb-2 group-hover:text-tertiary transition-smooth">2,847</div>
        <div className="text-xs sm:text-base">Françaises soulagées</div>
      </div>
      <Separator orientation="vertical" className="hidden sm:block h-16" />
      <div className="text-center group">
        <div className="font-serif text-3xl sm:text-4xl font-light text-primary mb-1 sm:mb-2 group-hover:text-tertiary transition-smooth">4.9/5</div>
        <div className="text-xs sm:text-base">Note moyenne</div>
      </div>
      <Separator orientation="vertical" className="hidden sm:block h-16" />
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
