import { Star, Phone } from "lucide-react";
import MultiStepFunnel from "./funnel/MultiStepFunnel";
import { useAnalytics } from "@/hooks/useAnalytics";

const HeroSection = () => {
  const { trackCallClick } = useAnalytics();

  const handleCallClick = () => {
    trackCallClick('hero');
  };

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10 py-8 lg:py-12">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 lg:mb-12">
          <div className="flex items-center gap-3">
            <img 
              src="https://img1.wsimg.com/isteam/ip/75919328-b237-4d1a-b78d-47408bd658d8/3DaysLater-10.png/:/rs=h:105,cg:true,m/qt=q:100/ll"
              alt="3 Days Later Roofing"
              className="h-12 md:h-16 object-contain brightness-0 invert"
            />
          </div>
          <a
            href="tel:+14846428141"
            onClick={handleCallClick}
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 rounded-full text-accent-foreground font-bold shadow-lg shadow-accent/30 transition-all hover:scale-105 animate-pulse-slow"
          >
            <Phone className="w-5 h-5" />
            <span className="text-base">(484) 642-8141</span>
          </a>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            🇲🇽 Hablamos Español
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Value Proposition */}
          <div className="text-white text-center lg:text-left">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-up">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-medium">5.0 Rating • 50+ Reviews</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-up delay-100">
              Fast, Reliable
              <br />
              <span className="text-gradient">Roof Repair</span>
              <br />
              & Free Same-Day Estimates
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up delay-200">
              Trusted by Lehigh Valley homeowners. Licensed, insured, and GAF Certified. 
              Get your free inspection scheduled today.
            </p>

            {/* Compact Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-up delay-300 text-sm text-white/70">
              <span className="flex items-center gap-1.5">🏆 GAF Certified</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-1.5">✓ Licensed & Insured</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-1.5">🛡️ Lifetime Warranty</span>
            </div>
          </div>

          {/* Right: Multi-Step Funnel */}
          <div className="animate-fade-up delay-200">
            <MultiStepFunnel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
