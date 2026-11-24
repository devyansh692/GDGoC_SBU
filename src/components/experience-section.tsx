
"use client";

import { Github, Layers3, Users } from "lucide-react";
import { Reveal } from "./motion";

const cards = [
  { n: "01", t: "Learn together", d: "Explore new tools, concepts and technologies alongside fellow students.", c: "#4285f4", bg: "#e8f0fe", chip: "#d2e3fc", Icon: Layers3 },
  { n: "02", t: "Build in public", d: "Turn ideas into experiments, projects and practical learning experiences.", c: "#34a853", bg: "#e6f4ea", chip: "#ceead6", Icon: Github },
  { n: "03", t: "Find your people", d: "Meet curious peers, exchange perspectives and grow through collaboration.", c: "#ea4335", bg: "#fce8e6", chip: "#fad2cf", Icon: Users },
];

export function ExperienceSection() {
  return (
    <section
      id="what-to-expect"
      className="gsap-section section-pad scroll-mt-24 relative isolate"
    >
      {/* Background line grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.16) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.16) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container relative z-10">
        <div className="mb-12 grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#4285f4]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ea4335]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#fbbc04]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#34a853]" />
              </span>
              <p className="eyebrow text-[var(--orange)]">04 / The experience</p>
            </div>
            <h2 className="display text-5xl font-semibold leading-[.98] md:text-7xl">More than<br />just sessions.</h2>
          </div>
          <p className="max-w-[510px] text-sm leading-7 text-[var(--muted)]">A developer community is shaped by the people in it. Explore, ask questions, share what you learn, and find collaborators for the things you want to make. Chapter activities will be announced here when confirmed.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((x, i) => (
            <Reveal key={x.n} delay={i * 0.08}>
              <article
                className="motion-card relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-[28px] p-7 md:p-8"
                style={{ background: x.bg }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-60"
                  style={{ background: x.chip }}
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full text-white shadow-sm"
                    style={{ background: x.c }}
                  >
                    <x.Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span
                    className="rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-[.14em]"
                    style={{ color: x.c }}
                  >
                    {x.n} / COMMUNITY
                  </span>
                </div>
                <div className="relative">
                  <h3 className="display text-3xl font-semibold text-[var(--ink)]">{x.t}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/65">{x.d}</p>
                  <span className="mt-6 block h-1 w-12 rounded-full" style={{ background: x.c }} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
