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
      src: "/images/ugc/ugc - byesweetie 2.webp",
      alt: "UGC Kill Crave: témoignage perte de poids",
  nugget: "J'ai réalisé que je grignotais surtout par automatisme et le spray casse la boucle parce que le cerveau n'obtient plus sa petite récompense sucrée donc il arrête de réclamer et au final je suis à -4,7 kg en six semaines sans compter les calories.",
    },
    {
      src: "/images/ugc/Ugc1.webp",
      alt: "UGC Kill Crave: femme utilisant le spray",
  nugget: "Je l'ai utilisé après le déjeuner et mon carré de chocolat habituel avait littéralement le goût de carton, je l'ai reposé et je n'étais plus tentée pendant plusieurs heures.",
    },
    {
      src: "/images/ugc/Ugc3.webp",
      alt: "UGC Kill Crave: témoignage énergie",
  nugget: "J'ai testé un peu sceptique par nature, deux pulvérisations avant de goûter un dessert de mon copain. Et j'avais juste plus envie, même après un verre d'eau",
    },
    {
      src: "/images/ugc/Ugc4.webp",
      alt: "UGC Kill Crave: amélioration de la peau",
  nugget: "Acné inflammatoire depuis des années et après trois semaines à pulvériser avant mes envies de grignotages ma peau est plus claire, je me réveille moins gonflée et heureuse de regarder dans le miroir.",
    },
    {
      src: "/images/ugc/ugc - byesweetie4.webp",
      alt: "UGC Kill Crave: confiance retrouvée",
  nugget: "Ce qui change la vie c'est que je peux maintenant laisser une tablette de chocolat ouverte sur la table et elle reste là alors qu'avant c'était impossible, le goût neutre coupe l'histoire dans ma tête et j'ai une vraie sensation de liberté.",
    },
    {
      src: "/images/ugc/Ugc2.webp",
      alt: "UGC Kill Crave: résultats transformation",
  nugget: "En deux semaines j'étais déjà à -2 kg sans sensation de me priver et et surtout à 16h je ne crash plus alors qu'avant je vidais toujours le tiroir à biscuits du bureau.",
    },
  ];

  return (
    <section id={id} className="pt-0 pb-24 sm:py-2 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <H2 className="text-3xl sm:text-4xl font-normal leading-tight">Elles ont blackout leurs cravings</H2>
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
                        <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/45 to-transparent opacity-95 pointer-events-none" />
                      </CardContent>
                      <CardFooter className="absolute bottom-3 left-3 right-3 p-0">
                        <Badge variant="secondary" className="bg-white/80 text-black backdrop-blur-md ring-1 ring-black/10 font-medium text-xs px-3 py-2 rounded-xl max-w-[90%] whitespace-normal break-words">
                          "{item.nugget}"
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
                <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/45 to-transparent opacity-95 pointer-events-none" />
              </CardContent>
              <CardFooter className="absolute bottom-3 left-3 right-3 p-0">
                <Badge variant="secondary" className="bg-white/80 text-black backdrop-blur-md ring-1 ring-black/10 font-medium text-sm sm:text-base px-3 py-2 rounded-xl max-w-[90%] sm:max-w-full whitespace-normal break-words">
                  "{item.nugget}"
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>

  {/* Social Proof */}
  <div className="text-center mt-16 sm:mt-24">
    <div className="grid grid-cols-3 gap-4 sm:flex sm:justify-center sm:items-center sm:gap-12 text-muted-foreground max-w-4xl mx-auto px-4">
      <div className="text-center group">
        <div className="font-heading text-3xl sm:text-4xl text-secondary mb-1 sm:mb-2 tracking-[0.2em] group-hover:text-primary transition-smooth">2 847</div>
        <div className="text-xs sm:text-base uppercase tracking-[0.16em]">Killers de cravings</div>
      </div>
      <Separator orientation="vertical" className="hidden sm:block h-16" />
      <div className="text-center group">
        <div className="font-heading text-3xl sm:text-4xl text-secondary mb-1 sm:mb-2 tracking-[0.2em] group-hover:text-primary transition-smooth">4.9/5</div>
        <div className="text-xs sm:text-base uppercase tracking-[0.16em]">Note moyenne</div>
      </div>
      <Separator orientation="vertical" className="hidden sm:block h-16" />
      <div className="text-center group">
        <div className="font-heading text-3xl sm:text-4xl text-secondary mb-1 sm:mb-2 tracking-[0.2em] group-hover:text-primary transition-smooth">96%</div>
        <div className="text-xs sm:text-base uppercase tracking-[0.16em]">Recommandent Kill Crave</div>
      </div>
    </div>
  </div>
        </div>
    </section>
  );
};

export default TestimonialsSection;
