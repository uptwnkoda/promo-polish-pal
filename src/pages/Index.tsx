import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import ChatWidget from "@/components/ChatWidget";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ScrollReveal>
        <TrustStrip />
      </ScrollReveal>
      <ScrollReveal>
        <WhyChooseUs />
      </ScrollReveal>
      <ScrollReveal>
        <ProcessSection />
      </ScrollReveal>
      <ScrollReveal>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <GuaranteeSection />
      </ScrollReveal>
      <ScrollReveal>
        <BeforeAfterGallery />
      </ScrollReveal>
      <ScrollReveal>
        <QuoteRequestForm />
      </ScrollReveal>
      <ScrollReveal>
        <FAQSection />
      </ScrollReveal>
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
      <Footer />
      <StickyMobileCTA />
      <ChatWidget />
      <ExitIntentPopup />
    </main>
  );
};

export default Index;
