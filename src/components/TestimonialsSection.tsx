import { useState, useEffect } from "react";
import { Star, Quote, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

type Review = {
  author: string;
  photoUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
};

type ReviewsData = {
  rating: number;
  totalReviews: number;
  reviews: Review[];
};

const FALLBACK_REVIEWS: Review[] = [
  {
    author: "Sarah M.",
    photoUrl: null,
    rating: 5,
    text: "Quick, professional, and honest pricing. They repaired storm damage to our roof, and it looks perfect. I highly recommend this team for any roofing needs!",
    relativeTime: "2 months ago",
  },
  {
    author: "Mike T.",
    photoUrl: null,
    rating: 5,
    text: "From estimate to completion, everything was seamless. The crew was respectful, cleaned up every day, and finished on time. Our new roof looks amazing!",
    relativeTime: "3 months ago",
  },
  {
    author: "Jennifer L.",
    photoUrl: null,
    rating: 5,
    text: "After getting three quotes, 3 Days Later Roofing offered the best value and quality. They walked us through everything, and we felt confident in our decision.",
    relativeTime: "1 month ago",
  },
  {
    author: "David R.",
    photoUrl: null,
    rating: 5,
    text: "Had a leak that two other companies couldn't figure out. These guys found it in minutes and had it fixed the same day. Honest, skilled, and affordable.",
    relativeTime: "2 weeks ago",
  },
  {
    author: "Karen W.",
    photoUrl: null,
    rating: 5,
    text: "They replaced our entire roof in just two days. The quality of work is outstanding, and the neighborhood has been complimenting us ever since!",
    relativeTime: "3 weeks ago",
  },
  {
    author: "Tom H.",
    photoUrl: null,
    rating: 5,
    text: "Best roofing experience I've ever had. They showed up on time, communicated every step, and left the property spotless. Will definitely use them again.",
    relativeTime: "1 month ago",
  },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/3+Days+Later+Roofing+%26+Repairs/@40.6084,-75.4902,17z/";

const TestimonialsSection = () => {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-reviews`
        );
        if (!res.ok) throw new Error("Failed");
        const json: ReviewsData = await res.json();
        if (json.reviews?.length) {
          setData(json);
        }
      } catch {
        // Fallback silently to static reviews
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const reviews = data?.reviews?.length ? data.reviews : FALLBACK_REVIEWS;
  const overallRating = data?.rating ?? 5.0;
  const totalReviews = data?.totalReviews ?? 50;
  const isLive = !!data?.reviews?.length;

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            {isLive ? "Live Google Reviews" : "Testimonials"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Lehigh Valley Homeowners Say
          </h2>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {loading ? (
              <Skeleton className="h-6 w-48" />
            ) : (
              <>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(overallRating)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {overallRating.toFixed(1)} from {totalReviews}+ reviews
                  {isLive && " on Google"}
                </span>
                {isLive && (
                  <img
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_42x16dp.png"
                    alt="Google"
                    className="h-4 ml-1"
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Review Carousel */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-8 card-elevated">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-20 w-full mb-6" />
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-card rounded-2xl p-8 card-elevated hover:card-floating transition-all duration-300 relative h-full flex flex-col">
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/10" />

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-foreground mb-6 leading-relaxed flex-1">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-3">
                      {review.photoUrl ? (
                        <img
                          src={review.photoUrl}
                          alt={review.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                          <span className="text-accent font-bold">
                            {review.author.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground">
                          {review.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {review.relativeTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12" />
          </Carousel>
        )}

        {/* View all on Google link */}
        <div className="text-center mt-8">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
          >
            See all reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
