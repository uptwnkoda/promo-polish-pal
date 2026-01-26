import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Allentown",
    text: "Quick, professional, and honest pricing. They repaired storm damage to our roof, and it looks perfect. I highly recommend this team for any roofing needs!",
    rating: 5,
  },
  {
    name: "Mike T.",
    location: "Bethlehem",
    text: "From estimate to completion, everything was seamless. The crew was respectful, cleaned up every day, and finished on time. Our new roof looks amazing!",
    rating: 5,
  },
  {
    name: "Jennifer L.",
    location: "Easton",
    text: "After getting three quotes, 3 Days Later Roofing offered the best value and quality. They walked us through everything, and we felt confident in our decision.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Lehigh Valley Homeowners Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-muted-foreground">5.0 from 50+ reviews on Google</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 card-elevated hover:card-floating transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/10" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
