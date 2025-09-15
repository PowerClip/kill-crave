import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackCTA } from "@/lib/gtm";
import Logo from "@/components/Logo";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 12) setHidden(false);
      else if (delta > 5) setHidden(true); // scrolling down
      else if (delta < -5) setHidden(false); // scrolling up
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 h-14 grid grid-cols-3 items-center">
        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground justify-self-start">
          <a href="#ingredients" className="hover:text-primary" onClick={() => trackCTA('nav_how', 'Comment ça marche', '#ingredients', 'nav')}>Comment ça marche</a>
          <a href="#offer" className="hover:text-primary" onClick={() => trackCTA('nav_offer', 'Kit 30 jours', '#offer', 'nav')}>Kit 30 jours</a>
          <a href="#faq" className="hover:text-primary" onClick={() => trackCTA('nav_faq', 'FAQ', '#faq', 'nav')}>FAQ</a>
        </nav>
        <a
          href="#top"
          className="col-span-3 sm:col-span-1 sm:col-start-2 justify-self-center text-primary"
          aria-label="bye sweetie"
        >
          <Logo className="text-2xl sm:text-3xl md:text-4xl" />
        </a>
        <Button asChild variant="premium" size="sm" className="hidden sm:inline-flex justify-self-end">
          <a href="#offer" onClick={() => trackCTA('nav_buy', 'Acheter', '#offer', 'nav')}>Acheter 24,90€</a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
