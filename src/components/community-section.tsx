"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, HelpCircle, Hammer, Lightbulb, Sprout } from "lucide-react";

const COMMUNITY_URL = "https://gdg.community.dev/gdg-on-campus-sarala-birla-university-ranchi-india/";

const lead = "You don’t need to be an expert to".split(" ");
const accent = ["belong", "here."];

const bring = [
  { label: "A question", Icon: HelpCircle, solid: "#4285f4", tint: "#e8f0fe", dark: "#1967d2" },
  { label: "A half-built project", Icon: Hammer, solid: "#ea4335", tint: "#fce8e6", dark: "#c5221f" },
  { label: "A wild idea", Icon: Lightbulb, solid: "#fbbc04", tint: "#fef7e0", dark: "#b06000" },
  { label: "Willingness to learn", Icon: Sprout, solid: "#34a853", tint: "#e6f4ea", dark: "#137333" },
];

const GRID = "#dadce0";

export function CommunitySection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(".cm-grid", { opacity: 0, scale: 1.08, duration: 1.4 }, 0)
        .from(".cm-eyebrow", { y: 16, opacity: 0, scale: 0.9, duration: 0.6 }, 0.1)
        .from(".cm-word", { yPercent: 110, rotate: 4, duration: 0.9, stagger: 0.07, ease: "power4.out" }, 0.25)
        .from(".cm-lead", { y: 20, opacity: 0, duration: 0.7 }, 0.9)
        .from(".cm-chip", { y: 24, opacity: 0, scale: 0.85, duration: 0.7, stagger: 0.1, ease: "back.out(2)" }, 1.0)
        .from(".cm-cta", { y: 24, opacity: 0, duration: 0.7 }, 1.4)
        .from(".cm-shape", { scale: 0, rotate: -90, opacity: 0, duration: 0.9, stagger: 0.1, ease: "back.out(2)" }, 0.6);

      // Endless motion: grid drifts, shapes bob, gradient shifts, CTA ring pulses
      gsap.to(".cm-grid", { backgroundPosition: "56px 56px", duration: 8, ease: "none", repeat: -1 });
      gsap.to(".cm-shape", { y: (i) => (i % 2 ? -14 : 14), rotate: (i) => (i % 2 ? 16 : -16), duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3, delay: 1.8 });
      gsap.to(".cm-gradient", { backgroundPosition: "100% 0", duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.fromTo(".cm-ring", { scale: 1, opacity: 0.55 }, { scale: 1.35, opacity: 0, duration: 1.8, ease: "power2.out", repeat: -1, delay: 2 });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="community"
      className="gsap-section relative scroll-mt-24 overflow-hidden bg-white py-24 md:py-32"
      aria-labelledby="community-title"
      style={{ fontFamily: "'Google Sans','Product Sans',Inter,system-ui,sans-serif" }}
    >
      {/* line grid background, faded toward the edges */}
      <div
        className="cm-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, #000 35%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, #000 35%, transparent 100%)",
        }}
      />
      {/* soft Google glows */}
      <div className="pointer-events-none absolute -left-32 top-10 h-[360px] w-[360px] rounded-full bg-[#4285f4]/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[#fbbc04]/15 blur-3xl" aria-hidden="true" />

      {/* shapes sitting on grid intersections */}
      <div className="cm-shape pointer-events-none absolute left-[56px] top-[112px] hidden h-14 w-14 rounded-tl-full bg-[#fbbc04] md:block" aria-hidden="true" />
      <div className="cm-shape pointer-events-none absolute right-[112px] top-[168px] hidden h-10 w-10 rounded-full border-[8px] border-[#ea4335] md:block" aria-hidden="true" />
      <div className="cm-shape pointer-events-none absolute bottom-[112px] left-[168px] hidden h-4 w-20 rounded-full bg-[#34a853] md:block" aria-hidden="true" />
      <div className="cm-shape pointer-events-none absolute bottom-[168px] right-[56px] hidden h-8 w-8 rotate-12 rounded-md bg-[#4285f4] md:block" aria-hidden="true" />

      <div className="container relative text-center">
        <span className="cm-eyebrow inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-medium text-[#5f6368] shadow-sm">
          <span className="flex gap-1" aria-hidden="true">
            <i className="h-2 w-2 rounded-full bg-[#4285f4]" /><i className="h-2 w-2 rounded-full bg-[#ea4335]" /><i className="h-2 w-2 rounded-full bg-[#fbbc04]" /><i className="h-2 w-2 rounded-full bg-[#34a853]" />
          </span>
          10 / Your next step
        </span>

        <h2 id="community-title" className="mx-auto mt-8 max-w-[960px] text-5xl font-semibold leading-[1.08] tracking-tight text-[#202124] md:text-7xl">
          {lead.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[.12em] align-bottom">
              <span className="cm-word inline-block">{w}&nbsp;</span>
            </span>
          ))}
          {accent.map((w, i) => (
            <span key={`a${i}`} className="inline-block overflow-hidden pb-[.12em] align-bottom">
              <span
                className="cm-word cm-gradient inline-block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#4285f4,#ea4335,#fbbc04,#34a853,#4285f4)", backgroundSize: "200% 100%" }}
              >
                {w}{i < accent.length - 1 ? " " : ""}
              </span>
            </span>
          ))}
        </h2>

        <p className="cm-lead mx-auto mt-7 max-w-[520px] text-base leading-7 text-[#5f6368]">
          Bring a question, a half-built project, a wild idea, or just the willingness to learn. There&apos;s room for all of it.
        </p>

        <ul className="mx-auto mt-9 flex max-w-[720px] flex-wrap justify-center gap-3">
          {bring.map(({ label, Icon, solid, tint, dark }) => (
            <li
              key={label}
              className="cm-chip flex items-center gap-2 rounded-full py-2 pl-2 pr-4 text-[13px] font-medium transition-transform duration-300 hover:-translate-y-1"
              style={{ background: tint, color: dark }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full text-white" style={{ background: solid }}>
                <Icon size={15} strokeWidth={2} aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>

        <div className="cm-cta relative mt-12 inline-block">
          <span className="cm-ring pointer-events-none absolute inset-0 rounded-full border-2 border-[#1a73e8]" aria-hidden="true" />
          <a
            href={COMMUNITY_URL}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center gap-3 rounded-full bg-[#1a73e8] px-8 py-4 text-sm font-medium text-white shadow-[0_1px_3px_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1765cc]"
          >
            Join the GDG community <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}