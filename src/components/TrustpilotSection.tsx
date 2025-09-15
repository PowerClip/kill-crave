import { Star, CheckCircle, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import reviews from "@/lib/reviews";
import { useState } from "react";

const stars = (n: number) => (
  <div className="flex items-center gap-1" aria-label={`${n} sur 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < n ? "fill-emerald-500 text-emerald-500" : "text-muted-foreground"}`} />
    ))}
  </div>
);

const INITIAL_COUNT = 3;
const ITEMS_PER_PAGE = 3;

const TrustpilotSection = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visible = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, reviews.length));
  };

  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {stars(5)}
              <span className="text-sm text-muted-foreground">4.9 sur 5</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-primary">Excellent</div>
            <div className="text-sm text-muted-foreground">Basé sur 2 847 avis</div>
          </div>
          <div className="hidden lg:grid grid-cols-5 gap-4 w-full lg:max-w-md items-center">
            {[5,4,3,2,1].map((s)=> (
              <div key={s} className="col-span-5 flex items-center gap-3">
                <div className="w-10 text-sm text-primary font-medium">{s}★</div>
                <div className="h-2 bg-muted rounded-full w-full">
                  <div className={`h-2 rounded-full ${s>3?"bg-emerald-500":"bg-muted-foreground/30"}`} style={{width: `${[60,28,8,3,1][5-s]}%`}} />
                </div>
              </div>
            ))}
          </div>
        </div>

  <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {visible.map((r) => (
            <Card key={`${r.author}-${r.date}`} className="border">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  {stars(r.n)}
                  <Badge variant="secondary" className="gap-1 text-emerald-700 bg-emerald-50 border-emerald-200">
                    <CheckCircle className="h-3.5 w-3.5" /> Vérifié
                  </Badge>
                </div>
                <div className="font-serif text-lg text-primary">{r.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">“{r.text}”</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                  <span>{r.author} • {r.city}</span>
                  <span>{r.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {hasMore && (
            <div className="pt-6 flex justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={handleShowMore}
                className="gap-2 font-medium group"
              >
                <span>Afficher plus d'avis</span>
                <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
                <Badge variant="secondary" className="ml-2">
                  {reviews.length - visibleCount} restants
                </Badge>
              </Button>
            </div>
          )}
          {!hasMore && visibleCount > INITIAL_COUNT && (
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Vous avez vu tous les {reviews.length} avis de nos clients
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustpilotSection;
