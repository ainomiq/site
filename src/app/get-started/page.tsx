import type { Metadata } from "next";
import { GetStartedWizard } from "@/components/get-started/wizard";
import { Features } from "@/components/ui/features-9";
import { Testimonials } from "@/components/ui/unique-testimonial";
import { DemoBooking } from "@/components/demo-booking";

export const metadata: Metadata = {
  title: "Get Started - Ainomiq",
  description:
    "Analyze your website and get a personalized automation recommendation from Ainomiq.",
};

export default function GetStartedPage() {
  return (
    <>
      <GetStartedWizard />
      <Features />
      <Testimonials />
      <section id="book-demo" className="py-24 px-6 max-w-5xl mx-auto">
        <DemoBooking />
      </section>
    </>
  );
}
