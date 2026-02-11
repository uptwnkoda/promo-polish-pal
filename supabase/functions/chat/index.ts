import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the virtual assistant for 3 Days Later Roofing, a trusted roofing company serving the Lehigh Valley area in Pennsylvania. You are friendly, professional, and helpful.

Key business info:
- Phone: (484) 642-8141
- Email: info@3dayslaterroofing.com
- Address: 1825 Roth Avenue, Allentown, PA
- Hours: Mon-Fri 9 AM - 5 PM, Sat by appointment, Sun closed
- Licensed (PA #181985), insured, GAF Certified Master Elite
- Offers lifetime warranty on qualifying roofs
- Services: roof repair, roof replacement, storm damage repair, inspections, free same-day estimates
- Hablamos Español

Your goals:
1. Answer roofing questions helpfully (materials, timelines, costs, insurance claims, storm damage)
2. Encourage visitors to schedule a free estimate or call (484) 642-8141
3. If someone needs urgent help (active leak, storm damage), emphasize calling immediately
4. Keep responses concise (2-4 sentences) and conversational
5. Never make up specific pricing — say "every roof is different" and recommend a free inspection
6. If asked about areas served, mention Lehigh Valley including Allentown, Bethlehem, Easton, and surrounding areas

Do NOT discuss competitors. Always be positive and solution-oriented.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "We're experiencing high demand. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please call us at (484) 642-8141." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Something went wrong. Please call us at (484) 642-8141." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
