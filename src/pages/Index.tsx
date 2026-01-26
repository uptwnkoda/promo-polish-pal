import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProcessSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
