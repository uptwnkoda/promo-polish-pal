import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import FunnelStep1, { ProjectType } from "./FunnelStep1";
import FunnelStep2 from "./FunnelStep2";
import FunnelStep3 from "./FunnelStep3";

const MultiStepFunnel = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { 
    trackStep1View, 
    trackStep1Select, 
    trackStep2View, 
    trackStep2Submit, 
    trackStep3View 
  } = useAnalytics();

  // Track step views
  useEffect(() => {
    if (step === 1) trackStep1View();
    if (step === 2) trackStep2View();
    if (step === 3) trackStep3View();
  }, [step]);

  const handleStep1Select = (type: ProjectType) => {
    setProjectType(type);
    trackStep1Select(type);
    setStep(2);
  };

  const handleStep2Submit = async (data: { name: string; phone: string; email: string }) => {
    setIsSubmitting(true);

    try {
      const projectTypeLabels: Record<ProjectType, string> = {
        repair: 'Roof Repair',
        replacement: 'Roof Replacement',
        storm: 'Storm Damage',
        inspection: 'Inspection',
      };

      const { error: insertError } = await supabase
        .from('leads')
        .insert({
          name: data.name,
          phone: data.phone,
          email: data.email || `${Date.now()}@noemail.com`, // Fallback for optional email
          // Note: project_type would need to be added to the database schema
          // For now, we'll include it in a future migration
        });

      if (insertError) {
        console.error('Error submitting lead:', insertError);
        toast({
          title: "Error",
          description: "Failed to submit your request. Please try again.",
          variant: "destructive",
        });
      } else {
        trackStep2Submit();
        setSubmittedName(data.name);
        setStep(3);
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setProjectType(null);
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      {step === 1 && (
        <div className="animate-fade-up">
          <FunnelStep1 onSelect={handleStep1Select} />
        </div>
      )}
      {step === 2 && projectType && (
        <div className="animate-fade-up">
          <FunnelStep2 
            projectType={projectType}
            onSubmit={handleStep2Submit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
      {step === 3 && (
        <div className="animate-fade-up">
          <FunnelStep3 name={submittedName} />
        </div>
      )}
    </div>
  );
};

export default MultiStepFunnel;
