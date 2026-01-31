import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shield, CheckCircle2, Phone } from "lucide-react";
import FunnelProgress from "./FunnelProgress";
import { ProjectType } from "./FunnelStep1";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255).optional().or(z.literal('')),
});

interface FunnelStep2Props {
  projectType: ProjectType;
  onSubmit: (data: { name: string; phone: string; email: string }) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
}

const FunnelStep2 = ({ projectType, onSubmit, onBack, isSubmitting }: FunnelStep2Props) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    await onSubmit({
      name: result.data.name,
      phone: result.data.phone,
      email: result.data.email || "",
    });
  };

  const projectTypeLabels: Record<ProjectType, string> = {
    repair: 'Roof Repair',
    replacement: 'Roof Replacement',
    storm: 'Storm Damage',
    inspection: 'Inspection',
  };

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 card-floating">
      <FunnelProgress currentStep={2} />

      {/* Selected project type badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {projectTypeLabels[projectType]}
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-2">
        Where should we send your estimate?
      </h3>
      <p className="text-muted-foreground text-center text-sm mb-6">
        We'll contact you within 1 hour during business hours
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        <div>
          <Input
            type="text"
            placeholder="Your Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            maxLength={100}
            className="h-12 bg-secondary border-0 placeholder:text-muted-foreground/60"
          />
        </div>
        <div>
          <Input
            type="tel"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            maxLength={20}
            className="h-12 bg-secondary border-0 placeholder:text-muted-foreground/60"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email Address (optional)"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            maxLength={255}
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

        <button
          type="button"
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to project type
        </button>
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

export default FunnelStep2;
