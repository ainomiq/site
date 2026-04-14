import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScaleWithoutLimits } from "@/components/ui/scale-without-limits";
import { EcomDynamicSections } from "@/components/ecom-dynamic-sections";
import {
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ecommerce Application",
  description:
    "The Ainomiq app: intelligent modules working together to automate your e-commerce business.",
};

export default function PlatformPage() {
  return (
    <>
      {/* Stats — Scale Without Limits */}
      <ScaleWithoutLimits />

      {/* Heavy dynamic sections (client component wrapper) */}
      <EcomDynamicSections>
        </EcomDynamicSections>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ready to automate?
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Start with one module, grow to the full app. We help you with the
            right roadmap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/get-started">Get started free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-white text-ainomiq-text px-8 h-12"
            >
              <Link href="/contact">
                Book a call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </>
  );
}
