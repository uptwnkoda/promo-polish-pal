import { useState } from "react";
import realWork1 from "@/assets/real-work-1.jpg";
import realWork2 from "@/assets/real-work-2.jpg";
import realWork3 from "@/assets/real-work-3.jpg";
import realWork4 from "@/assets/real-work-4.jpg";
import realWork5 from "@/assets/real-work-5.jpg";
import realWork6 from "@/assets/real-work-6.jpg";
import realWork7 from "@/assets/real-work-7.jpg";
import realWork8 from "@/assets/real-work-8.jpg";
import realWork9 from "@/assets/real-work-9.jpg";

const photos = [
  { src: realWork1, alt: "Completed roof installation", title: "Full Roof Installation", location: "Allentown, PA" },
  { src: realWork2, alt: "Crew installing shingles on roof", title: "Shingle Installation", location: "Bethlehem, PA" },
  { src: realWork3, alt: "Ridge cap sealing work", title: "Ridge Cap Sealing", location: "Easton, PA" },
  { src: realWork4, alt: "Roofing project in progress", title: "Roof Replacement", location: "Whitehall, PA" },
  { src: realWork5, alt: "Roof tear-off and preparation", title: "Tear-Off & Prep", location: "Emmaus, PA" },
  { src: realWork6, alt: "Professional roofing work", title: "Storm Damage Repair", location: "Macungie, PA" },
  { src: realWork7, alt: "New shingle installation", title: "New Shingle Laydown", location: "Nazareth, PA" },
  { src: realWork8, alt: "Roofing underlayment work", title: "Underlayment Install", location: "Catasauqua, PA" },
  { src: realWork9, alt: "Completed roofing project", title: "Finished Project", location: "Hellertown, PA" },
];

const BeforeAfterGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Projects, Real Results
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse photos from our recent Lehigh Valley roofing projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <div key={index} className="space-y-3">
              <button
                onClick={() => setSelectedPhoto(index)}
                className="block w-full aspect-[4/3] rounded-xl overflow-hidden card-elevated focus:outline-none focus:ring-2 focus:ring-accent transition-transform hover:scale-[1.02]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
              <div className="px-1">
                <h3 className="font-bold text-foreground text-base">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-card text-3xl font-bold hover:opacity-70 z-10"
            aria-label="Close"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
            }}
            className="absolute left-4 text-card text-4xl font-bold hover:opacity-70 z-10"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <img
            src={photos[selectedPhoto].src}
            alt={photos[selectedPhoto].alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto((selectedPhoto + 1) % photos.length);
            }}
            className="absolute right-4 text-card text-4xl font-bold hover:opacity-70 z-10"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default BeforeAfterGallery;
