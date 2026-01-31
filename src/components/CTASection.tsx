import { Phone, ArrowRight, Home, RefreshCw, CloudRain, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

const CTASection = () => {
  const { trackCallClick } = useAnalytics();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCallClick = () => {
    trackCallClick('footer');
    window.location.href = 'tel:+14846428141';
  };

  const projectOptions = [
    { label: 'Roof Repair', icon: Home },
    { label: 'Roof Replacement', icon: RefreshCw },
    { label: 'Storm Damage', icon: CloudRain },
    { label: 'Not Sure', icon: HelpCircle },
  ];

  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container">
        <div className="bg-card rounded-3xl p-8 md:p-12 card-floating text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Your Free Estimate Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join 100+ Lehigh Valley homeowners who trust 3 Days Later Roofing. 
            Select your project type to get started.
          </p>

          {/* Project type buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-2xl mx-auto">
            {projectOptions.map((option, index) => (
              <button
                key={index}
                onClick={scrollToTop}
                className="flex flex-col items-center gap-2 p-4 bg-secondary hover:bg-secondary/80 rounded-xl transition-all duration-200 hover:scale-[1.02] group border-2 border-transparent hover:border-accent/30"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <option.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <span className="text-sm font-medium text-foreground">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={scrollToTop}
              className="h-14 px-8 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl glow-accent transition-all duration-300 hover:scale-[1.02]"
            >
              Get Free Estimate
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <button
              onClick={handleCallClick}
              className="flex items-center gap-2 h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
            >
              <Phone className="w-5 h-5" />
              Call (484) 642-8141
            </button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Licensed & Insured • GAF Certified™ • Serving Allentown, Bethlehem, Easton & surrounding areas
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
