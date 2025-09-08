import { Button } from "@/components/ui/button";

const MobileStickyBar = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur px-4 py-3 sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          <div className="font-medium text-primary">Spray 30 jours</div>
          <div>Livraison gratuite • 30j satisfait ou remboursé</div>
        </div>
        <Button asChild size="sm" variant="premium" className="min-w-[140px]">
          <a href="#offer">Acheter — 24.90€</a>
        </Button>
      </div>
    </div>
  );
};

export default MobileStickyBar;
