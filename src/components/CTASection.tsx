import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container">
        <div className="bg-card rounded-3xl p-8 md:p-12 card-floating text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Repair or Replace Your Roof?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join 100+ Lehigh Valley homeowners who trust 3 Days Later Roofing. 
            Get your free, no-obligation estimate today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={scrollToTop}
              className="h-14 px-8 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl glow-accent transition-all duration-300 hover:scale-[1.02]"
            >
              Get Free Estimate
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <a
              href="tel:+14846428141"
              className="flex items-center gap-2 h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
            >
              <Phone className="w-5 h-5" />
              Call (484) 642-8141
            </a>
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
