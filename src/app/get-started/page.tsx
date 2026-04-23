import type { Metadata } from "next";
import { GetStartedWizard } from "@/components/get-started/wizard";


export const metadata: Metadata = {
  title: "Get Started - Ainomiq",
  description:
    "Analyze your website and get a personalized automation recommendation from Ainomiq.",
};

export default function GetStartedPage() {
  return (
    <>
      <GetStartedWizard />
    </>
  );
}
