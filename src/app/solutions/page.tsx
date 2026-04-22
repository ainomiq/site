import type { Metadata } from "next";
import { SolutionsFunnel } from "@/components/ui/solutions-funnel";

export const metadata: Metadata = {
  title: "Custom AI Solutions - Ainomiq",
  description:
    "We build AI-powered tools that run your business on autopilot. Chatbots, dashboards, automations, apps, and full site design - scoped, built, and shipped.",
};

export default function SolutionsPage() {
  return <SolutionsFunnel />;
}
