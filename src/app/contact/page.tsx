import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { DemoBooking } from "@/components/demo-booking";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ainomiq. Send us a message and we'll respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Contact
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Let&apos;s Explore How Ainomiq{" "}
            <span className="gradient-text">Works for You</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl">
            Tell us a little about yourself in the form below and we&apos;ll connect you with an Ainomiq expert who can share more about the product and answer any questions you have. Or email us directly at{" "}
            <a href="mailto:info@ainomiq.com" className="text-ainomiq-blue font-semibold hover:underline">info@ainomiq.com</a>.
          </p>
        </div>
      </section>

      {/* Demo Booking */}
      <Section id="book-demo" className="bg-ainomiq-navy-light">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="mb-3 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
              Book a demo
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Schedule a 30-minute demo
            </h2>
            <p className="text-ainomiq-text-muted max-w-xl">
              Pick a time that works for you. You&apos;ll receive a Google Calendar invite with a Meet link right after booking.
            </p>
          </div>
          <DemoBooking />
        </div>
      </Section>

      {/* Contact Form */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-ainomiq-text mb-2">Or just send a message</h2>
            <p className="text-ainomiq-text-muted">We respond within 24 hours.</p>
          </div>
          <ContactForm />
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-ainomiq-text-muted mb-6">
            Prefer email? Reach us directly at{" "}
            <a href="mailto:info@ainomiq.com" className="text-ainomiq-blue font-semibold hover:underline">info@ainomiq.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
