import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

interface CheckoutRequest {
  amount: number; // in EUR (e.g. 1950)
  projectType: string;
  company: string;
  contact: string;
  email: string;
  description: string;
  timeline: string;
  estimateHours: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequest = await req.json();

    if (!body.amount || body.amount < 100) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    if (!body.email || !body.company) {
      return NextResponse.json(
        { error: "Email and company are required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal"],
      mode: "payment",
      allow_promotion_codes: true,
      customer_email: body.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: body.amount * 100, // Stripe uses cents
            product_data: {
              name: `Ainomiq Project: ${body.projectType}`,
              description: `${body.company} — ${body.description.slice(0, 200)}`,
              metadata: {
                company: body.company,
                contact: body.contact,
                timeline: body.timeline,
                hours: String(body.estimateHours),
              },
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        company: body.company,
        contact: body.contact,
        email: body.email,
        projectType: body.projectType,
        timeline: body.timeline,
        estimateHours: String(body.estimateHours),
      },
      success_url: `${req.nextUrl.origin}/get-started?payment=success`,
      cancel_url: `${req.nextUrl.origin}/get-started?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
