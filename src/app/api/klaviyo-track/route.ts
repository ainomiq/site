import { NextRequest, NextResponse } from "next/server";

const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_API_KEY ?? "";

export async function POST(req: NextRequest) {
  const { eventName, email, properties } = (await req.json()) as {
    eventName: string;
    email: string;
    properties?: Record<string, unknown>;
  };

  if (!email || !eventName) {
    return NextResponse.json({ error: "email and eventName required" }, { status: 400 });
  }

  if (!KLAVIYO_KEY) return NextResponse.json({ ok: true, skipped: true });

  try {
    await fetch("https://a.klaviyo.com/api/events/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Klaviyo-API-Key ${KLAVIYO_KEY}`,
        revision: "2024-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            metric: {
              data: {
                type: "metric",
                attributes: { name: eventName },
              },
            },
            profile: {
              data: {
                type: "profile",
                attributes: { email },
              },
            },
            properties: properties ?? {},
            time: new Date().toISOString(),
          },
        },
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true, error: "klaviyo_failed" });
  }
}
