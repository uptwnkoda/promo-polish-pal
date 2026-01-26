import { FileSearch, Hammer, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    number: "01",
    title: "Free Inspection",
    description: "We assess your roof and provide a detailed, honest estimate with no hidden fees.",
  },
  {
    icon: Hammer,
    number: "02",
    title: "Expert Installation",
    description: "Our certified crew completes your project on time, keeping your property clean daily.",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Final Walkthrough",
    description: "We review every detail with you and provide your lifetime workmanship warranty.",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Simple 3-Step Process
          </h2>
          <p className="text-muted-foreground text-lg">
            From first call to finished roof — we make it easy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/30 to-transparent" />
              )}

              <div className="bg-card rounded-2xl p-8 card-elevated hover:card-floating transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <step.icon className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-4xl font-bold text-accent/20">{step.number}</span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
