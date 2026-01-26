import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How soon will I hear back after submitting my information?",
    answer: "We respond to all inquiries within 1 hour during business hours (Mon-Fri 9am-5pm). We'll contact you to schedule a convenient time for your free roof inspection.",
  },
  {
    question: "Do you offer financing options?",
    answer: "Yes! We work with several financing partners to offer flexible payment plans for qualified homeowners. Ask us about current promotions during your free estimate.",
  },
  {
    question: "Do you handle insurance claims?",
    answer: "Absolutely. We have extensive experience working with insurance companies on storm damage and other covered repairs. We can walk you through the entire claims process.",
  },
  {
    question: "Do you repair small leaks or minor roof damage?",
    answer: "Yes — we handle everything from small leak patches to complete roof replacements. No job is too small or too big for our team.",
  },
  {
    question: "What areas do you serve?",
    answer: "We proudly serve the entire Lehigh Valley including Allentown, Bethlehem, Easton, Whitehall, Macungie, Emmaus, and surrounding areas.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Have a question? We've got answers.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-xl px-6 border-0 card-elevated"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
