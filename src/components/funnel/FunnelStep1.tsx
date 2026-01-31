import { Home, RefreshCw, CloudRain, HelpCircle, Clock } from "lucide-react";
import FunnelProgress from "./FunnelProgress";

export type ProjectType = 'repair' | 'replacement' | 'storm' | 'inspection';

interface FunnelStep1Props {
  onSelect: (type: ProjectType) => void;
}

const projectOptions = [
  { 
    type: 'repair' as ProjectType, 
    label: 'Roof Repair', 
    icon: Home,
    description: 'Fix leaks, shingles, or damage'
  },
  { 
    type: 'replacement' as ProjectType, 
    label: 'Roof Replacement', 
    icon: RefreshCw,
    description: 'Full roof installation'
  },
  { 
    type: 'storm' as ProjectType, 
    label: 'Storm Damage', 
    icon: CloudRain,
    description: 'Insurance claim help'
  },
  { 
    type: 'inspection' as ProjectType, 
    label: 'Not Sure — Need Inspection', 
    icon: HelpCircle,
    description: 'Free assessment'
  },
];

const FunnelStep1 = ({ onSelect }: FunnelStep1Props) => {
  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 card-floating">
      {/* Urgency Badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-accent/10 text-accent">
          <Clock className="w-4 h-4" />
          Limited Spots This Week
        </span>
      </div>

      <FunnelProgress currentStep={1} />

      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-2">
        What type of roofing project are you considering?
      </h3>
      <p className="text-muted-foreground text-center text-sm mb-6">
        Select one to get your free estimate
      </p>

      <div className="grid grid-cols-1 gap-3">
        {projectOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => onSelect(option.type)}
            className="flex items-center gap-4 p-4 bg-secondary hover:bg-secondary/80 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] group border-2 border-transparent hover:border-accent/30"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <option.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{option.label}</p>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FunnelStep1;
