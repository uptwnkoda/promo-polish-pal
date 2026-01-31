import { CheckCircle2, Phone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import FunnelProgress from "./FunnelProgress";
import { useAnalytics } from "@/hooks/useAnalytics";

interface FunnelStep3Props {
  name: string;
}

const FunnelStep3 = ({ name }: FunnelStep3Props) => {
  const { trackCallClick } = useAnalytics();

  const handleCallClick = () => {
    trackCallClick('step3');
    window.location.href = 'tel:+14846428141';
  };

  const scrollToTestimonials = () => {
    const element = document.getElementById('testimonials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 card-floating text-center">
      <FunnelProgress currentStep={3} />

      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8 text-success" />
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
        You're all set{name ? `, ${name.split(' ')[0]}` : ''}!
      </h3>
      <p className="text-muted-foreground mb-6">
        We'll contact you within 1 hour during business hours.
        <br />
        <span className="font-medium text-foreground">For fastest service, call now:</span>
      </p>

      <div className="space-y-3">
        <Button
          onClick={handleCallClick}
          className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 hover:scale-[1.02]"
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Now (484) 642-8141
        </Button>

        <button
          onClick={scrollToTestimonials}
          className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-3"
        >
          <ArrowDown className="w-4 h-4" />
          See what our customers say
        </button>
      </div>

      {/* What to expect */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3 font-medium">What happens next:</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <p className="text-xs text-muted-foreground">We call you</p>
          </div>
          <div className="p-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <p className="text-xs text-muted-foreground">Free inspection</p>
          </div>
          <div className="p-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <p className="text-xs text-muted-foreground">Get estimate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelStep3;
