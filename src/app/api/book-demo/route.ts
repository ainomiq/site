import { NextRequest, NextResponse } from "next/server";

// Google Calendar API via OAuth2 refresh token
async function refreshGoogleToken(refreshToken: string, clientId: string, clientSecret: string) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token refresh failed: ${JSON.stringify(data)}`);
  return data.access_token as string;
}

async function createCalendarEvent(
  accessToken: string,
  calendarId: string,
  event: {
    summary: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    attendeeEmail: string;
    attendeeName: string;
  }
) {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all&conferenceDataVersion=1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: event.summary,
        description: event.description,
        start: { dateTime: event.startDateTime, timeZone: "Europe/Amsterdam" },
        end: { dateTime: event.endDateTime, timeZone: "Europe/Amsterdam" },
        attendees: [
          { email: "info@ainomiq.com", displayName: "Ainomiq", organizer: true },
          { email: event.attendeeEmail, displayName: event.attendeeName },
        ],
        conferenceData: {
          createRequest: {
            requestId: `ainomiq-demo-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 1440 }, // 24h before
            { method: "popup", minutes: 30 },
          ],
        },
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(`Calendar event creation failed: ${JSON.stringify(data)}`);
  return data;
}

async function sendClientEmail(params: {
  to: string;
  name: string;
  date: string;
  time: string;
  meetLink?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const dateFormatted = new Date(params.date).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Ainomiq <info@ainomiq.com>",
      to: params.to,
      subject: `Your Ainomiq demo - ${dateFormatted} at ${params.time}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a1a2e;">
          <img src="https://ainomiq.com/logos/ainomiq-wordmark.png" alt="Ainomiq" style="height: 28px; margin-bottom: 32px;" />
          <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Your demo is confirmed</h2>
          <p style="color: #6b7280; margin-bottom: 24px;">Hi ${params.name}, we're looking forward to speaking with you.</p>
          <div style="background: #f0f5ff; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0; font-weight: 600; font-size: 16px;">${dateFormatted}</p>
            <p style="margin: 4px 0 0; color: #4b5563;">${params.time} (Amsterdam time)</p>
            ${params.meetLink ? `
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #dbeafe;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280;">Join via Google Meet:</p>
              <a href="${params.meetLink}" style="display: inline-block; background: #3b82f6; color: white; font-weight: 600; font-size: 14px; padding: 10px 20px; border-radius: 8px; text-decoration: none;">Join Google Meet →</a>
              <p style="margin: 8px 0 0; font-size: 11px; color: #9ca3af;">${params.meetLink}</p>
            </div>` : ""}
          </div>
          <p style="color: #6b7280; font-size: 14px;">A Google Calendar invite has been sent to your email. If you need to reschedule, reply to this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">Ainomiq - AI Customer Support for E-commerce</p>
        </div>
      `,
    }),
  });
}

async function sendInternalEmail(params: {
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  question?: string;
  meetLink?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const dateFormatted = new Date(params.date).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Ainomiq Bookings <info@ainomiq.com>",
      to: "info@ainomiq.com",
      subject: `New demo booked - ${params.company} - ${dateFormatted} at ${params.time}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a1a2e;">
          <img src="https://ainomiq.com/logos/ainomiq-wordmark.png" alt="Ainomiq" style="height: 28px; margin-bottom: 32px;" />
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; color: #166534; font-weight: 600;">
            New appointment booked
          </div>
          <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 20px;">Demo with ${params.firstName} ${params.lastName}</h2>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Date</td><td style="padding: 8px 0; font-weight: 600;">${dateFormatted}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Time</td><td style="padding: 8px 0; font-weight: 600;">${params.time} (Amsterdam)</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Name</td><td style="padding: 8px 0;">${params.firstName} ${params.lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Company</td><td style="padding: 8px 0; font-weight: 600;">${params.company}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${params.email}" style="color: #3b82f6;">${params.email}</a></td></tr>
            ${params.phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0;">${params.phone}</td></tr>` : ""}
          </table>

          ${params.question ? `
          <div style="background: #f9fafb; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 6px; font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Their question</p>
            <p style="margin: 0; font-size: 14px; color: #1a1a2e;">${params.question}</p>
          </div>` : ""}

          ${params.meetLink ? `
          <div style="margin-bottom: 24px;">
            <a href="${params.meetLink}" style="display: inline-block; background: #3b82f6; color: white; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Join Google Meet →</a>
            <p style="margin: 8px 0 0; font-size: 11px; color: #9ca3af;">${params.meetLink}</p>
          </div>` : ""}

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">Ainomiq booking system - check Google Calendar for the full invite</p>
        </div>
      `,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, time, firstName, lastName, email, phone, company, question } = body;

    if (!date || !time || !firstName || !lastName || !email || !company) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    // Build event datetime (Europe/Amsterdam)
    const [hours, minutes] = time.split(":").map(Number);
    const startDate = new Date(`${date}T${time}:00`);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30-min slot

    const isoStart = `${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
    const endHours = Math.floor((hours * 60 + minutes + 30) / 60);
    const endMinutes = (minutes + 30) % 60;
    const isoEnd = `${date}T${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}:00`;

    const description = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Company: ${company}`,
      phone ? `Phone: ${phone}` : null,
      question ? `\nQuestions:\n${question}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    let meetLink: string | undefined;

    // Create Google Calendar event if credentials are configured
    const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN;
    const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "info@ainomiq.com";

    if (refreshToken && clientId && clientSecret) {
      try {
        const accessToken = await refreshGoogleToken(refreshToken, clientId, clientSecret);
        const event = await createCalendarEvent(accessToken, calendarId, {
          summary: `Ainomiq Demo - ${company}`,
          description,
          startDateTime: isoStart,
          endDateTime: isoEnd,
          attendeeEmail: email,
          attendeeName: `${firstName} ${lastName}`,
        });
        meetLink = event?.conferenceData?.entryPoints?.find(
          (ep: { entryPointType: string; uri: string }) => ep.entryPointType === "video"
        )?.uri;
      } catch (calErr) {
        console.error("Google Calendar error:", calErr);
        // Don't block the booking — log and continue
      }
    }

    // Send confirmation email to client
    await sendClientEmail({
      to: email,
      name: firstName,
      date,
      time,
      meetLink,
    });

    // Send internal notification to Ainomiq
    await sendInternalEmail({
      date,
      time,
      firstName,
      lastName,
      email,
      phone,
      company,
      question,
      meetLink,
    });

    // Notify via Discord webhook
    const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "📅 New Demo Booking",
              color: 0x3b82f6,
              fields: [
                { name: "Name", value: `${firstName} ${lastName}`, inline: true },
                { name: "Company", value: company, inline: true },
                { name: "Email", value: email, inline: true },
                ...(phone ? [{ name: "Phone", value: phone, inline: true }] : []),
                { name: "Date & Time", value: `${date} at ${time}`, inline: true },
                ...(question ? [{ name: "Questions", value: question }] : []),
                ...(meetLink ? [{ name: "Meet Link", value: meetLink }] : []),
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Book demo error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
