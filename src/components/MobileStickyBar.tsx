import { Button } from "@/components/ui/button";
import { trackCTA } from "@/lib/gtm";

const MobileStickyBar = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-black/10 bg-[rgba(241,234,226,0.95)] backdrop-blur px-4 py-3 sm:hidden text-black">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-black/70 uppercase tracking-[0.12em]">
          <div className="font-medium text-black">Kill Crave 30 jours</div>
          <div className="tracking-normal text-sm text-black/70">Livraison gratuite • Garantie 30 jours</div>
        </div>
        <Button asChild size="sm" variant="hero" className="min-w-[120px] text-xs px-3">
          <a
            href="#offer-bottom"
            onClick={() => trackCTA('mobile_sticky_buy', 'Commander', '#offer-bottom', 'mobile_sticky')}
          >
            Commander
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MobileStickyBar;
