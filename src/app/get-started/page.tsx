import type { Metadata } from "next";
import { GetStartedWizard } from "@/components/get-started/wizard";
import { Testimonials } from "@/components/ui/unique-testimonial";
import { TestimonialsColumns } from "@/components/ui/testimonials-columns-1";
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
      <Testimonials />
      <TestimonialsColumns />
      <section id="book-demo" className="py-24 px-6 max-w-5xl mx-auto">
        <DemoBooking />
      </section>
    </>
  );
}
