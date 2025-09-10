import HeroSection from "@/components/HeroSection";
import OfferSection from "@/components/OfferSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import TrustpilotSection from "@/components/TrustpilotSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" id="top">
      <Header />
      <main className="pb-20 overflow-x-hidden">
        <HeroSection />
  <SolutionSection />
  <OfferSection />
  <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
  <TrustpilotSection />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default Index;
