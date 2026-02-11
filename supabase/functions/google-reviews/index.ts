import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// 3 Days Later Roofing & Repairs – Allentown, PA
const PLACE_ID = "ChIJm7WTMbdGxokR-rHzOtz_x-o";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      throw new Error("Google Places API key not configured");
    }

    // Use Places API (New) – Place Details
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount,reviews&key=${apiKey}`;

    const response = await fetch(url, {
      headers: {
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Places API error:", errorText);
      throw new Error(`Google API returned ${response.status}`);
    }

    const data = await response.json();

    // Normalize the response
    const reviews = (data.reviews || []).map((r: any) => ({
      author: r.authorAttribution?.displayName || "Anonymous",
      photoUrl: r.authorAttribution?.photoUri || null,
      rating: r.rating || 5,
      text: r.text?.text || r.originalText?.text || "",
      relativeTime: r.relativePublishTimeDescription || "",
      publishTime: r.publishTime || "",
    }));

    const result = {
      rating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
      reviews,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
