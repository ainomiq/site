"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

export function PaymentStatus() {
  const params = useSearchParams();
  const router = useRouter();
  const payment = params.get("payment");

  function startOver() {
    router.replace("/get-started");
  }

  if (payment === "success") {
    return (
      <section className="pt-28 pb-8 px-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-green-500/30 bg-green-500/5 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-7 w-7 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Payment received!
          </h2>
          <p className="text-gray-400 mb-6">
            Thanks! We&apos;ll review your project and get back within 24 hours.
          </p>
          <button
            onClick={startOver}
            className="text-[#4A90F5] hover:text-white text-sm font-medium transition-colors"
          >
            ← Submit another request
          </button>
        </div>
      </section>
    );
  }

  if (payment === "cancelled") {
    return (
      <section className="pt-28 pb-8 px-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-orange-500/30 bg-orange-500/5 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10">
            <XCircle className="h-7 w-7 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Payment cancelled
          </h2>
          <p className="text-gray-400 mb-6">
            No worries — your project request was still submitted. You can pay later or reach out to us directly.
          </p>
          <button
            onClick={startOver}
            className="text-[#4A90F5] hover:text-white text-sm font-medium transition-colors"
          >
            ← Submit another request
          </button>
        </div>
      </section>
    );
  }

  return null;
}
