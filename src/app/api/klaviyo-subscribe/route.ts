import { NextRequest, NextResponse } from "next/server";

const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_API_KEY ?? "";
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LEADS_LIST_ID ?? "";

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, company } = (await req.json()) as {
    email: string;
    firstName?: string;
    lastName?: string;
    company?: string;
  };

  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  if (!KLAVIYO_KEY) return NextResponse.json({ ok: true, skipped: true });

  try {
    // Create or update profile
    const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Klaviyo-API-Key ${KLAVIYO_KEY}`,
        revision: "2024-02-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email,
            first_name: firstName ?? "",
            last_name: lastName ?? "",
            properties: { company: company ?? "" },
          },
        },
      }),
    });

    const profileData = (await profileRes.json()) as { data?: { id: string }; errors?: unknown[] };
    const profileId = profileData?.data?.id;

    // Add to list if configured
    if (profileId && KLAVIYO_LIST_ID) {
      await fetch(`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Klaviyo-API-Key ${KLAVIYO_KEY}`,
          revision: "2024-02-15",
        },
        body: JSON.stringify({
          data: [{ type: "profile", id: profileId }],
        }),
      });
    }

    return NextResponse.json({ ok: true, profileId });
  } catch {
    // Never block the form flow due to Klaviyo errors
    return NextResponse.json({ ok: true, error: "klaviyo_failed" });
  }
}
