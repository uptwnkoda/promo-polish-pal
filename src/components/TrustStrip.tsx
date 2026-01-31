import { Star, Shield, Award, CheckCircle } from "lucide-react";

const TrustStrip = () => {
  const trustItems = [
    {
      icon: Star,
      label: "5.0 Google Rating",
      sublabel: "50+ Reviews",
    },
    {
      icon: CheckCircle,
      label: "Licensed & Insured",
      sublabel: "PA License #181985",
    },
    {
      icon: Shield,
      label: "Lifetime Warranty",
      sublabel: "Workmanship Guarantee",
    },
    {
      icon: Award,
      label: "GAF Certified™",
      sublabel: "Master Elite",
    },
  ];

  return (
    <section className="py-8 bg-card border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
