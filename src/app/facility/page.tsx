import { FacilityHero } from "@/components/ui/facility-hero";
import { FacilityDashboard } from "@/components/ui/facility-dashboard";

export const metadata = {
  title: "Facility Services AI. Ainomiq",
  description: "AI automation for security companies and facility services. Incident reporting, scheduling, compliance - all automated."
};

export default function FacilityPage() {
  return (
    <>
      <FacilityHero />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">
            Live demo
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            See it in action
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            This is how SecureNL - a fictional Dutch security company - runs 240 guards
            across 8 client sites with Ainomiq handling the operations.
          </p>
        </div>

        <FacilityDashboard />
      </section>
    </>
  );
}
