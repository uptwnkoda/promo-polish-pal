import { Shield, Award, FileCheck, BadgeCheck } from "lucide-react";

const guarantees = [
  {
    icon: Shield,
    title: "Lifetime Workmanship Warranty",
    description: "All labor guaranteed for the life of your roof",
  },
  {
    icon: Award,
    title: "Manufacturer's Material Warranty",
    description: "Up to 50 years on select GAF products",
  },
  {
    icon: FileCheck,
    title: "No-Risk Free Estimates",
    description: "Transparent pricing with no hidden fees",
  },
  {
    icon: BadgeCheck,
    title: "Fully Licensed & Insured",
    description: "PA License #181985 — You're fully covered",
  },
];

const GuaranteeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-semibold mb-4">
            Our Promise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            100% Satisfaction Guarantee
          </h2>
          <p className="text-white/70 text-lg">
            Your roofing investment is protected. Every project includes:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
