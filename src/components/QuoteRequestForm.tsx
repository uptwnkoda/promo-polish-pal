import { useState } from "react";
import { ClipboardList, ChevronRight, ChevronLeft, CheckCircle2, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  project_type: string;
  roof_material: string;
  roof_stories: string;
  approximate_sqft: string;
  timeline: string;
  additional_details: string;
};

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  project_type: "",
  roof_material: "",
  roof_stories: "",
  approximate_sqft: "",
  timeline: "",
  additional_details: "",
};

const projectTypes = ["Roof Repair", "Full Replacement", "Storm Damage", "Inspection", "Gutters", "Other"];
const materials = ["Asphalt Shingles", "Metal", "Flat/TPO", "Slate/Tile", "Not Sure"];
const stories = ["1 Story", "2 Stories", "3+ Stories"];
const timelines = ["ASAP / Emergency", "Within 2 Weeks", "Within 1 Month", "Just Getting Quotes", "Planning for Future"];

const QuoteRequestForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canAdvance1 = form.project_type && form.roof_stories && form.timeline;
  const canAdvance2 = form.name.trim() && form.phone.trim() && form.address.trim();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("quote_requests").insert({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        address: form.address.trim(),
        project_type: form.project_type,
        roof_material: form.roof_material || null,
        roof_stories: form.roof_stories || null,
        approximate_sqft: form.approximate_sqft.trim() || null,
        timeline: form.timeline || null,
        additional_details: form.additional_details.trim() || null,
      } as any);
      if (error) throw error;
      setSubmitted(true);
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-17797570704",
          event_category: "quote_request",
        });
      }
    } catch {
      toast.error("Something went wrong. Please call us at (484) 642-8141.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="quote" className="py-16 bg-secondary">
        <div className="container max-w-2xl text-center">
          <div className="bg-card rounded-2xl p-10 card-floating">
            <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-extrabold text-foreground mb-2">Quote Request Received!</h3>
            <p className="text-muted-foreground mb-6">
              We'll review your details and get back to you within 1 business hour.
            </p>
            <a
              href="tel:+14846428141"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now: (484) 642-8141
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-16 bg-secondary">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            <ClipboardList className="w-4 h-4" />
            Detailed Quote Request
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            Get a Custom Quote
          </h2>
          <p className="text-muted-foreground">
            Tell us about your project and we'll prepare a detailed estimate.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 max-w-xs mx-auto">
          {[1, 2].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                  step >= s ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 2 && (
                <div className={`flex-1 h-1 rounded-full transition-colors ${step > s ? "bg-accent" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 card-floating">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Project Type <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {projectTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update("project_type", t)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        form.project_type === t
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-background text-foreground hover:border-accent/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Preferred Material</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {materials.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => update("roof_material", m)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        form.roof_material === m
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-background text-foreground hover:border-accent/50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Stories <span className="text-destructive">*</span>
                  </label>
                  <div className="space-y-2">
                    {stories.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update("roof_stories", s)}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                          form.roof_stories === s
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border bg-background text-foreground hover:border-accent/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Timeline <span className="text-destructive">*</span>
                  </label>
                  <div className="space-y-2">
                    {timelines.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update("timeline", t)}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                          form.timeline === t
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border bg-background text-foreground hover:border-accent/50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Approximate Sq Ft (optional)</label>
                <input
                  type="text"
                  value={form.approximate_sqft}
                  onChange={(e) => update("approximate_sqft", e.target.value)}
                  placeholder="e.g. 1,500"
                  maxLength={20}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!canAdvance1}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next: Your Info
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="John Smith"
                  maxLength={100}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(484) 555-0123"
                  maxLength={20}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email (optional)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="john@example.com"
                  maxLength={255}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Property Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="123 Main St, Allentown, PA"
                  maxLength={200}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Additional Details (optional)</label>
                <textarea
                  value={form.additional_details}
                  onChange={(e) => update("additional_details", e.target.value)}
                  placeholder="Describe any specific issues, damage, or preferences..."
                  maxLength={1000}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 px-5 py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canAdvance2 || submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit Quote Request"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteRequestForm;
