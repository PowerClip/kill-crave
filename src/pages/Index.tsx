import OfferSection from "@/components/OfferSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import TrustpilotSection from "@/components/TrustpilotSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsTimelineSection from "@/components/BenefitsTimelineSection";
import IngredientsSection from "@/components/IngredientsSection";
import { useEffect } from "react";
import { trackVisit } from "@/lib/analytics-store";

const Index = () => {
  // Track page visit
  useEffect(() => {
    trackVisit();
  }, []);

  // On mobile, make offer anchor land with the target at the bottom of the viewport
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 640px)');

    const scrollToBottom = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      // Use scrollIntoView with block:end so the element aligns to the bottom.
      // The element can define scroll-margin-bottom to account for fixed UI (e.g., sticky bar).
      el.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const handleClick = (e: Event) => {
      if (!mq.matches) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a[href^="#offer"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (href === '#offer' || href === '#offer-bottom') {
        e.preventDefault();
        // Always scroll to the bottom sentinel when on mobile
        // Create it if somehow missing
        let bottom = document.getElementById('offer-bottom');
        if (!bottom) {
          bottom = document.createElement('div');
          bottom.id = 'offer-bottom';
          document.querySelector('#offer')?.appendChild(bottom);
        }
        scrollToBottom('offer-bottom');
        // Update hash without jumping
        history.replaceState(null, '', '#offer-bottom');
      }
    };

    document.addEventListener('click', handleClick, true);

    // Handle direct hash visits on mobile
    const hash = window.location.hash;
    if (mq.matches && (hash === '#offer' || hash === '#offer-bottom')) {
      // Delay to ensure DOM laid out
      setTimeout(() => scrollToBottom('offer-bottom'), 0);
    }

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden site-bg" id="top">
      <Header />
      <main className="pb-20 overflow-x-hidden">
        {/* <HeroSection /> – conservé au cas où, mais hors rendu pour mettre l'offre en avant */}
        <OfferSection />
        <IngredientsSection />
        <HowItWorksSection />
        <BenefitsTimelineSection />
        <FinalCTASection />
        <FAQSection />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default Index;
