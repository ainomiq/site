import Link from "next/link";
import { LogoMark } from "@/components/logo";

const services = [
  { href: "/platform", label: "Platform" },
  { href: "/enterprise", label: "Enterprise" },
];

const company = [
  { href: "/about", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-ainomiq-border bg-ainomiq-navy">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <LogoMark className="mb-4 block text-xl" />
            <p className="text-sm leading-relaxed text-ainomiq-text-subtle max-w-[28ch]">
              AI-automatisering die werkt. Gebouwd voor ondernemers die vooruit willen.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted">
              Diensten
            </h4>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ainomiq-text-subtle transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted">
              Bedrijf
            </h4>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ainomiq-text-subtle transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@ainomiq.com"
                  className="text-sm text-ainomiq-text-subtle transition-colors hover:text-white"
                >
                  hello@ainomiq.com
                </a>
              </li>
              <li>
                <span className="text-sm text-ainomiq-text-subtle">
                  Nederland
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-ainomiq-border pt-6 text-center">
          <span className="text-xs text-ainomiq-text-subtle">
            &copy; {new Date().getFullYear()} Ainomiq. Alle rechten voorbehouden.
          </span>
        </div>
      </div>
    </footer>
  );
}
