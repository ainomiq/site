import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { description, projectType } = (await request.json()) as {
      description: string;
      projectType: string;
    };

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Please write at least a short description first." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI enhancement not available." },
        { status: 500 }
      );
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ainomiq.com",
        "X-Title": "Ainomiq Project Form",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content: `You are a project brief assistant for Ainomiq, an AI automation agency. A potential client is filling in a project request form. They selected project type: "${projectType}".

Your job: take their rough description and expand it into a clear, well-structured project brief. Keep their intent and ideas intact, but add structure and detail that helps developers understand the scope.

Rules:
- Write in the same language the client used (Dutch → Dutch, English → English)
- Keep it concise (150-300 words max)
- Use bullet points for features/requirements where helpful
- Don't add features they didn't mention — only clarify and structure what they described
- Don't use corporate jargon or fluff
- Don't mention Ainomiq or pricing
- Output ONLY the enhanced description, no intro text or commentary`,
          },
          {
            role: "user",
            content: description,
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter error:", res.status, await res.text());
      return NextResponse.json(
        { error: "AI enhancement failed. Please try again." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const enhanced =
      data.choices?.[0]?.message?.content?.trim() || description;

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error("Enhance description error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
