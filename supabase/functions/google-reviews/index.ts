import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Use legacy Places API
const BUSINESS_QUERY = "3 Days Later Roofing";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      throw new Error("Google Places API key not configured");
    }

    // Step 1: Find place via Find Place From Text
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(BUSINESS_QUERY)}&inputtype=textquery&locationbias=point:40.6084,-75.4902&fields=place_id&key=${apiKey}`;
    const searchRes = await fetch(searchUrl);

    if (!searchRes.ok) {
      const searchErr = await searchRes.text();
      console.error("Find Place error:", searchErr);
      throw new Error(`Find Place returned ${searchRes.status}`);
    }

    const searchData = await searchRes.json();

    if (searchData.status !== "OK" || !searchData.candidates?.length) {
      throw new Error(`Business not found. Status: ${searchData.status}. Query: ${BUSINESS_QUERY}`);
    }

    const placeId = searchData.candidates[0].place_id;


    // Step 2: Fetch Place Details with reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`;
    const response = await fetch(detailsUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Place Details error:", errorText);
      throw new Error(`Place Details returned ${response.status}`);
    }

    const detailsData = await response.json();
    

    if (detailsData.status !== "OK") {
      throw new Error(`Place Details status: ${detailsData.status}`);
    }

    const result = detailsData.result;

    const reviews = (result.reviews || []).map((r: any) => ({
      author: r.author_name || "Anonymous",
      photoUrl: r.profile_photo_url || null,
      rating: r.rating || 5,
      text: r.text || "",
      relativeTime: r.relative_time_description || "",
      publishTime: r.time ? new Date(r.time * 1000).toISOString() : "",
    }));

    const output = {
      rating: result.rating || 0,
      totalReviews: result.user_ratings_total || 0,
      reviews,
    };

    return new Response(JSON.stringify(output), {
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
