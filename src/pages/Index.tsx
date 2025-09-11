import HeroSection from "@/components/HeroSection";
import OfferSection from "@/components/OfferSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import TrustpilotSection from "@/components/TrustpilotSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ScienceSection from "@/components/ScienceSection";
import BenefitsTimelineSection from "@/components/BenefitsTimelineSection";
import IngredientsSection from "@/components/IngredientsSection";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" id="top">
      <Header />
      <main className="pb-20 overflow-x-hidden">
        <HeroSection />
  {/* Replaced former "La solution" section with UGC/Testimonials */}
  <TestimonialsSection id="solution" />
  <OfferSection />
  <BenefitsTimelineSection />
  <IngredientsSection />
        <HowItWorksSection />
        <ScienceSection />
  <TrustpilotSection />
  <FinalCTASection />
  <FAQSection />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default Index;
