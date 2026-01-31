import { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { trackCallClick } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallClick = () => {
    trackCallClick('sticky');
    window.location.href = 'tel:+14846428141';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-md border-t border-border md:hidden">
      <div className="flex gap-3">
        <button
          onClick={handleCallClick}
          className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </button>
        <button
          onClick={scrollToTop}
          className="flex-1 flex items-center justify-center gap-2 h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-semibold transition-all"
        >
          <ArrowUp className="w-5 h-5" />
          Free Estimate
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
