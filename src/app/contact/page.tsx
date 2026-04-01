import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/section";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Ainomiq. Plan een gesprek of stuur ons een bericht.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Contact
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Laten we{" "}
            <span className="gradient-text">praten</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl">
            Heb je een vraag, wil je een demo of ben je klaar om te starten? We
            horen graag van je.
          </p>
        </div>
      </section>

      {/* Form */}
      <Section className="bg-ainomiq-navy-light">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-ainomiq-surface border-ainomiq-border">
            <CardContent className="p-8 md:p-10">
              <form
                action={`mailto:hello@ainomiq.com`}
                method="POST"
                encType="text/plain"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
                    >
                      Naam *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Je volledige naam"
                      required
                      className="bg-ainomiq-navy border-ainomiq-border text-white placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
                    >
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="naam@bedrijf.nl"
                      required
                      className="bg-ainomiq-navy border-ainomiq-border text-white placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
                    >
                      Bedrijf
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Bedrijfsnaam"
                      className="bg-ainomiq-navy border-ainomiq-border text-white placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
                    >
                      Telefoon
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+31 6 12345678"
                      className="bg-ainomiq-navy border-ainomiq-border text-white placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
                  >
                    Bericht *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Vertel ons over je project of vraag..."
                    rows={6}
                    required
                    className="bg-ainomiq-navy border-ainomiq-border text-white placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white h-12"
                >
                  Verstuur bericht
                </Button>
              </form>

              {/* Contact info */}
              <div className="mt-8 flex flex-col sm:flex-row gap-6 border-t border-ainomiq-border pt-6">
                <div className="flex items-center gap-3 text-sm text-ainomiq-text-muted">
                  <Mail className="h-5 w-5 text-ainomiq-blue shrink-0" />
                  <a
                    href="mailto:hello@ainomiq.com"
                    className="hover:text-white transition-colors"
                  >
                    hello@ainomiq.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-ainomiq-text-muted">
                  <MapPin className="h-5 w-5 text-ainomiq-blue shrink-0" />
                  <span>Nederland</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Liever direct plannen?
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Stuur een mail naar hello@ainomiq.com. We reageren binnen 24 uur.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <a href="mailto:hello@ainomiq.com">Mail ons</a>
          </Button>
        </div>
      </section>
    </>
  );
}
