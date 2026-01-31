interface FunnelProgressProps {
  currentStep: 1 | 2 | 3;
}

const FunnelProgress = ({ currentStep }: FunnelProgressProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            step <= currentStep 
              ? 'bg-accent w-8' 
              : 'bg-muted w-6'
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-2">
        Step {currentStep} of 3
      </span>
    </div>
  );
};

export default FunnelProgress;
