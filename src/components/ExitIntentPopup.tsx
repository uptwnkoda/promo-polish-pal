import { useState, useEffect, useCallback } from "react";
import { X, Phone, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { trackCallClick } = useAnalytics();

  const showPopup = useCallback(() => {
    if (hasShown) return;
    setIsVisible(true);
    setHasShown(true);
  }, [hasShown]);

  useEffect(() => {
    // Desktop: detect mouse leaving viewport (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Mobile: detect back/tab switch via visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Will show when they come back
      }
      if (document.visibilityState === "visible" && !hasShown) {
        // Show after they return from switching tabs
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (scrollPercent > 0.15) {
          showPopup();
        }
      }
    };

    // Also trigger after 45 seconds of inactivity
    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(showPopup, 45000);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", resetTimer, { passive: true });
    window.addEventListener("click", resetTimer);
    resetTimer();

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(inactivityTimer);
    };
  }, [hasShown, showPopup]);

  const handleClose = () => setIsVisible(false);

  const handleCallClick = () => {
    trackCallClick('hero');
    window.location.href = "tel:+14846428141";
  };

  const scrollToTop = () => {
    setIsVisible(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl p-6 md:p-8 max-w-md w-full card-floating animate-fade-up z-10">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {/* Urgency badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-accent/10 text-accent mb-4">
            <Clock className="w-4 h-4" />
            Don't Miss Out!
          </span>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Wait — Get Your
            <br />
            <span className="text-gradient">Free Estimate</span> Today
          </h3>

          <p className="text-muted-foreground mb-6">
            Same-day inspections available this week.
            <br />
            No obligation, no pressure.
          </p>

          <div className="space-y-3">
            <Button
              onClick={scrollToTop}
              className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl glow-accent transition-all duration-300 hover:scale-[1.02]"
            >
              Get Free Estimate
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <button
              onClick={handleCallClick}
              className="w-full flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
            >
              <Phone className="w-5 h-5" />
              Call (484) 642-8141
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            ✓ Licensed & Insured • ✓ GAF Certified™ • ✓ 5.0 Rating
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
