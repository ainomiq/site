import type { Metadata } from "next";
import { GetStartedWizard } from "@/components/get-started/wizard";
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
      <DemoBooking />
    </>
  );
}
