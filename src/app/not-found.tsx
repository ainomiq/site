import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-lg mx-auto">
        {/* Big 404 */}
        <div
          style={{
            fontSize: "clamp(80px, 18vw, 180px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: "2px #e5e7eb",
            marginBottom: "32px",
            userSelect: "none",
          }}
        >
          404
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ainomiq-text mb-4">
          Page not found
        </h1>

        {/* Body */}
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          This page doesn&apos;t exist or has been moved.
          <br />
          Let&apos;s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <Home size={16} />
            Go to Ainomiq
          </Link>
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
