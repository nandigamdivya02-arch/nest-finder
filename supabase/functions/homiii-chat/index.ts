import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are "homiii *ai", the friendly and fast AI assistant for HomeHunt — a property discovery platform in Hyderabad, India.

Your personality:
- You're warm, helpful, and respond like a smart voice assistant (like Alexa)
- Keep answers concise and conversational
- Use emojis sparingly but effectively
- Always be enthusiastic about helping people find their perfect stay

What you know about HomeHunt:
- HomeHunt helps people find houses, hostels, PG accommodations, and playgrounds in Hyderabad
- Property types: Boys Hostels, Girls Hostels, Co-ed Hostels, Houses, Apartments, and Playgrounds (sports grounds, kids play areas, party/event venues)
- Areas covered: Gandimaisamma, Kukatpally, Madhapur, HITEC City, Gachibowli, Ameerpet, Begumpet, Dilsukhnagar, LB Nagar, Secunderabad, and more
- Price range: ₹3,000 - ₹25,000/month for accommodations, ₹500 - ₹5,000/session for playgrounds
- Key features: Furnished/semi-furnished options, AC/non-AC, food included options, WiFi, parking, security
- The platform has 50+ properties, 1000+ happy residents, and 4.5 avg rating
- Users can search, filter by type/budget/area, save to wishlist, and book directly

When asked about specific properties, provide helpful guidance based on the user's needs (budget, location preference, type of accommodation).
If asked something outside your knowledge, politely say you can help with HomeHunt-related queries and suggest contacting support.

Respond in the same language the user writes in. Default to English.`;

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
          JSON.stringify({ error: "I'm getting too many requests right now. Please try again in a moment! 🙏" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Something went wrong. Please try again!" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("homiii-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
