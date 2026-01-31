import { Check } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    "Free, no-obligation inspection",
    "Same-day estimates",
    "Honest pricing (no hidden fees)",
    "Clean job sites + clear communication",
    "Insurance claim help available",
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Why Lehigh Valley Homeowners Choose 3 Days Later
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
              >
                <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
