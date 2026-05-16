"use client";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
}

const data = [
  {
    id: "dominos-pizza",
    title: "Domino's Pizza",
    description:
      "A manager chatbot for employee questions, trained on internal guides.",
    href: "/enterprise",
    image: "/projects/dominos-pizza.png",
  },
  {
    id: "internal-ops-assistant",
    title: "Internal Ops Assistant",
    description:
      "One assistant for team questions, task updates, checklists, and daily reports.",
    href: "/enterprise",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1080",
  },
  {
    id: "bol-amazon-automation",
    title: "Bol x Amazon",
    description:
      "Marketplace operations automated across stock, orders, fulfillment, and reporting.",
    href: "/enterprise",
    image: "/projects/bol-amazon-automation.png",
  },
  {
    id: "field-team-automation",
    title: "Field Team Automation",
    description:
      "Planning, job updates, proof-of-work, and reporting in one automated flow.",
    href: "/facility",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1080",
  },
  {
    id: "custom",
    title: "Custom solutions",
    description:
      "From idea to shipped system: scope the workflow, connect the tools, and launch the automation that fits.",
    href: "/custom",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1080",
  },
];

const Gallery4 = ({
  title = "Projects",
  description = "A closer look at the systems Ainomiq builds for e-commerce, franchise, facility services, and custom operations.",
  items = data,
}: Gallery4Props) => {
  const visibleItems = items.slice(0, 4);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="max-w-lg text-ainomiq-text-muted">{description}</p>
          </div>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="group w-[66%] shrink-0 snap-start rounded-xl sm:w-auto"
            >
              <div className="group relative h-[23rem] max-w-full overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 h-full bg-[linear-gradient(to_bottom,rgba(15,23,42,0.04),rgba(15,23,42,0.36),rgba(15,23,42,0.97)_100%)] mix-blend-multiply" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start px-6 pb-5 text-white">
                  <div className="mb-2 text-lg font-semibold leading-tight md:text-xl">
                    {item.title}
                  </div>
                  <div className="text-sm leading-relaxed text-white/90 md:text-[15px]">
                    {item.description}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
