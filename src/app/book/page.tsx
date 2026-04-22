import type { Metadata } from "next";
import { Section } from "@/components/section";
import { DemoBooking } from "@/components/demo-booking";

export const metadata: Metadata = {
  title: "Book a Demo — Ainomiq",
  description: "Schedule a free 30-minute demo. Pick a time that works for you and get a Google Calendar invite with a Meet link.",
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Book a demo
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Schedule a{" "}
            <span className="gradient-text">30-minute demo</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl">
            We are here for you, 7 days a week, 12 hours a day. Pick a time that works for you. You&apos;ll receive a Google Calendar invite with a Meet link right after booking.
          </p>
        </div>
      </section>

      {/* Booking widget */}
      <Section className="bg-ainomiq-navy-light">
        <div className="max-w-6xl mx-auto">
          <DemoBooking />
        </div>
      </Section>
    </>
  );
}
