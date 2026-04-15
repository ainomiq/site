import type { Metadata } from "next";
import { GetStartedWizard } from "@/components/get-started/wizard";
import { CustomProjectsHero } from "@/components/get-started/custom-projects-hero";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";
import { Features } from "@/components/ui/features-9";
import { Testimonials } from "@/components/ui/unique-testimonial";
import { TestimonialsColumns } from "@/components/ui/testimonials-columns-1";

export const metadata: Metadata = {
  title: "Get Started - Ainomiq",
  description:
    "Analyze your website or request a custom automation solution from Ainomiq.",
};

export default function GetStartedPage() {
  return (
    <>
      <GetStartedWizard />
      <CustomProjectsHero />
      <ProjectRequestForm />
      <Features />
      <Testimonials />
      <TestimonialsColumns />
    </>
  );
}
