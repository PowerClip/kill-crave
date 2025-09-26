import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
      className={`sticky top-0 z-40 w-full border-b border-white/10 bg-black/25 backdrop-blur supports-[backdrop-filter]:bg-black/20 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 h-14 grid grid-cols-3 items-center">
        <nav className="hidden sm:flex items-center gap-6 text-sm uppercase tracking-[0.14em] text-white/70 justify-self-start">
          <a
            href="#ingredients"
            className="transition hover:text-primary"
            onClick={() => trackCTA('nav_formula', 'Formule', '#ingredients', 'nav')}
          >
            Formule
          </a>
          <a
            href="#benefits"
            className="transition hover:text-primary"
            onClick={() => trackCTA('nav_results', 'Résultats', '#benefits', 'nav')}
          >
            Résultats
          </a>
          <a
            href="#faq"
            className="transition hover:text-primary"
            onClick={() => trackCTA('nav_faq', 'FAQ', '#faq', 'nav')}
          >
            FAQ
          </a>
        </nav>
        <Link
          to="/"
          className="col-span-3 sm:col-span-1 sm:col-start-2 justify-self-center"
          aria-label="Kill Crave"
        >
          <Logo className="h-8 sm:h-10" />
        </Link>
        <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex justify-self-end">
          <a href="#offer" onClick={() => trackCTA('nav_buy', 'Commander', '#offer', 'nav')}>
            Commander — 24,90€
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
