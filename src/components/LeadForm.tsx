import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Phone, Shield, Clock } from "lucide-react";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-2xl p-8 card-floating text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          We Got Your Request!
        </h3>
        <p className="text-muted-foreground">
          A roofing expert will call you within the hour during business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 card-floating">
      {/* Urgency Badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-accent/10 text-accent">
          <Clock className="w-4 h-4" />
          Limited Spots This Week
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-2">
        Get Your Free Estimate
      </h3>
      <p className="text-muted-foreground text-center text-sm mb-6">
        No obligation • Response within 1 hour
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-12 bg-secondary border-0 placeholder:text-muted-foreground/60"
          />
        </div>
        <div>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="h-12 bg-secondary border-0 placeholder:text-muted-foreground/60"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="h-12 bg-secondary border-0 placeholder:text-muted-foreground/60"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl glow-accent transition-all duration-300 hover:scale-[1.02]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            "Get My Free Estimate →"
          )}
        </Button>
      </form>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-success" />
            Licensed & Insured
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-success" />
            No Pressure
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-success" />
            Same-Day Response
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
