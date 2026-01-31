import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustStrip />
      <WhyChooseUs />
      <ProcessSection />
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <GuaranteeSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
};

export default Index;
