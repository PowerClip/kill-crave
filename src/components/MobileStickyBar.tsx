import { Button } from "@/components/ui/button";
import { trackCTA } from "@/lib/gtm";

const MobileStickyBar = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/60 backdrop-blur px-4 py-3 sm:hidden text-white">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-white/70 uppercase tracking-[0.12em]">
          <div className="font-medium text-white">Kill Crave 30 jours</div>
        <div className="tracking-normal text-sm text-white/70">Livraison gratuite • Garantie 30 jours</div>
        </div>
        <Button asChild size="sm" variant="hero" className="min-w-[140px]">
          <a
            href="#offer-bottom"
            onClick={() => trackCTA('mobile_sticky_buy', 'Commander', '#offer-bottom', 'mobile_sticky')}
          >
            Commander — 24,90€
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MobileStickyBar;
