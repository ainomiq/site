"use client";

const valuesData = [
  {
    title: "Just get it done",
    body: "\"Ship fast, learn faster\" We value decisive action and speed over prolonged deliberation. Every solution ships fast because our clients can't afford to wait.",
  },
  {
    title: "Invent what customers want",
    body: "\"We've felt the pain we're solving\" Our core identity is rooted in building for our customers. Every feature must directly alleviate real customer pain. Revenue follows amazed customers.",
  },
  {
    title: "Winner's mindset",
    body: "\"Compete to win, learn from losses\" Fiercely competitive nature and fighting spirit are foundational. We play to win and never settle for second best.",
  },
  {
    title: "The Polymath Principle",
    body: "\"Breadth drives innovation\" The best team members understand other functions deeply and promote cross-functional collaboration. Own your domain, collaborate across boundaries.",
  },
];

export function ValuesScroll() {
  return (
    <section className="relative w-full overflow-hidden py-24 px-6">
      {/* Cosmic gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #1e3a8a 0%, #0f172a 40%, #020617 70%, #000 100%)",
        }}
      />
      {/* Subtle glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, rgba(74,144,245,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.2) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
            Our values
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-4">
            What drives us forward
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {valuesData.map((v) => (
            <div
              key={v.title}
              className="group relative rounded-2xl border border-white/10 backdrop-blur-xl p-8 transition-all duration-500 hover:border-ainomiq-blue/40 hover:shadow-[0_0_40px_rgba(74,144,245,0.15)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-ainomiq-blue transition-colors duration-300">
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-300">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
