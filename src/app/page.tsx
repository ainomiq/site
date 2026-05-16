import Link from "next/link";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
} from "lucide-react";
import { HeroSection } from "@/components/ui/hero-1";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { Gallery4 } from "@/components/ui/gallery4";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Integrations strip */}


      {/* Meet the Founders */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Meet the Founders
            </h2>
          </div>

          <div>
            <div className="group relative aspect-[16/9] overflow-hidden rounded-3xl">
              <img
                src="/team/founders.png?v=6"
                alt="Bink Sanders & Pim Smit - Co-Founders of Ainomiq"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/70 md:via-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10">
                <h3 className="text-xl md:text-4xl font-extrabold text-white">
                  Bink Sanders &amp; Pim Smit
                </h3>
                <div className="hidden md:flex items-end justify-between mt-4">
                  <p className="text-white/80 text-base leading-relaxed max-w-md">
                    Ainomiq started with two childhood friends who shared the same obsession: AI.
                    Bink came from years in IT. Pim from e-commerce. Different worlds, same fascination.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/30 hover:border-white/60 bg-ainomiq-navy/10 backdrop-blur-sm text-white hover:bg-ainomiq-navy/20 ml-6 shrink-0"
                  >
                    <Link href="/about">
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:hidden mt-6 text-center">
              <p className="text-ainomiq-text-muted text-sm leading-relaxed max-w-md mx-auto mb-5">
                Ainomiq started with two childhood friends who shared the same obsession: AI.
                Bink came from years in IT. Pim from e-commerce. Different worlds, same fascination.
              </p>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-ainomiq-navy text-ainomiq-text"
              >
                <Link href="/about">
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Text Reveal */}
      <section className="bg-white py-24">
        <TextRevealByWord
          text=""
          highlight="We're building the future"
          tail="for businesses that refuse to wait."
        />
      </section>

      {/* Feature Carousel */}
      <section className="py-24 px-6 bg-ainomiq-navy">
        <FeatureCarousel />
      </section>

      {/* Text Reveal — slogan */}
      <section className="bg-white py-24">
        <TextRevealByWord text="Built from scratch. Fully tailored. Deployed fast." />
      </section>

      {/* Projects gallery */}
      <Gallery4 />

    </>
  );
}
