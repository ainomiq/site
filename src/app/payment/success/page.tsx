import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Payment Successful - Ainomiq",
};

export default function PaymentSuccess() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100/60 px-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-3 text-ainomiq-text">
          Payment received!
        </h1>
        <p className="text-ainomiq-text-muted mb-8 leading-relaxed">
          Thank you for your payment. We&apos;ll start reviewing your project
          and connect you with a builder within 24 hours.
        </p>
        <p className="text-sm text-ainomiq-text-muted mb-6">
          You&apos;ll receive a confirmation email shortly.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          ← Back to Ainomiq
        </Link>
      </div>
    </main>
  );
}
