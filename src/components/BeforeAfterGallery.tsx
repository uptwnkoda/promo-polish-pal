import { useState, useRef, useCallback } from "react";
import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";
import before2 from "@/assets/before-2.jpg";
import after2 from "@/assets/after-2.jpg";
import before3 from "@/assets/before-3.jpg";
import after3 from "@/assets/after-3.jpg";

const projects = [
  {
    before: before1,
    after: after1,
    title: "Storm Damage Repair",
    location: "Allentown, PA",
    description: "Full roof replacement after severe storm damage with GAF Timberline shingles.",
  },
  {
    before: before2,
    after: after2,
    title: "Complete Roof Replacement",
    location: "Bethlehem, PA",
    description: "Aging roof with curling shingles replaced with premium architectural shingles.",
  },
  {
    before: before3,
    after: after3,
    title: "Emergency Storm Restoration",
    location: "Easton, PA",
    description: "Major storm damage restored to brand new condition in just 3 days.",
  },
];

const ComparisonSlider = ({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[5/4] rounded-2xl overflow-hidden cursor-col-resize select-none card-elevated"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label={`Before and after comparison for ${title}`}
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
    >
      {/* After image (full background) */}
      <img
        src={after}
        alt={`${title} - After`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={before}
          alt={`${title} - Before`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth || "100%" }}
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-card z-10"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-lg">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-accent"
          >
            <path
              d="M4 8H12M4 8L6 6M4 8L6 10M12 8L10 6M12 8L10 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-foreground/70 text-card text-xs font-semibold z-10 backdrop-blur-sm">
        Before
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-semibold z-10 backdrop-blur-sm">
        After
      </span>
    </div>
  );
};

const BeforeAfterGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See the Transformation
          </h2>
          <p className="text-muted-foreground text-lg">
            Drag the slider to compare before and after on real Lehigh Valley
            projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div key={index} className="space-y-4">
              <ComparisonSlider
                before={project.before}
                after={project.after}
                title={project.title}
              />
              <div className="px-1">
                <h3 className="font-bold text-foreground text-lg">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {project.location}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
