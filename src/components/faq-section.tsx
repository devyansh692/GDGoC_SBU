"use client";

import { ArrowUpRight, CircleHelp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BLUE = "#4285f4";
const RED = "#ea4335";
const YELLOW = "#f6b94a";
const GREEN = "#34a853";

const faqs = [
  { q: "Do I need to know how to code to be part of the community?", a: "No. Curiosity and a willingness to learn are enough to get started. You can explore, ask questions, collaborate, and build your skills at your own pace.", color: BLUE },
  { q: "Who can join GDG on Campus at SBU?", a: "Students interested in technology, development, design, and building things together can connect with the chapter through its official GDG community page.", color: RED },
  { q: "Are there any upcoming events?", a: "There are no upcoming events published on this website yet. Check the official GDG community page for announcements when new activities are confirmed.", color: YELLOW },
  { q: "Where can I find official updates?", a: "The GDG community page is the verified starting point for chapter information and event announcements.", color: GREEN },
];

const marks = [
  { c: BLUE, cls: "left-[4%] top-[8%] text-[120px]", d: "0s" },
  { c: RED, cls: "right-[6%] top-[14%] text-[90px]", d: "1.2s" },
  { c: YELLOW, cls: "left-[42%] bottom-[6%] text-[110px]", d: "2.1s" },
  { c: GREEN, cls: "right-[30%] top-[4%] text-[70px]", d: "3s" },
];

export function FaqSection({ communityUrl }: { communityUrl: string }) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".faq-head > *", {
        y: 36, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
      gsap.from(".faq-item", {
        x: 70, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".faq-list", start: "top 85%", once: true },
      });
      gsap.from(".faq-qmark", {
        scale: 0, rotate: -40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "back.out(1.6)",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
      // Big question marks drift with scroll
      gsap.utils.toArray<HTMLElement>(".faq-qmark-wrap").forEach((n, i) => {
        gsap.to(n, {
          yPercent: i % 2 ? 30 : -30, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="faq" className="gsap-section section-pad relative scroll-mt-24 overflow-hidden" aria-labelledby="faq-title">
      <style>{`
        @keyframes faq-float { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-16px) rotate(5deg); } }
        @keyframes faq-pulse { 0%,100% { box-shadow: 0 0 0 0 var(--ring); } 50% { box-shadow: 0 0 0 10px transparent; } }
        .faq-qmark { animation: faq-float 7s ease-in-out infinite; }
        .faq-pulse { animation: faq-pulse 2.2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) { .faq-qmark, .faq-pulse { animation: none; } }
      `}</style>

      {/* background: dotted texture + drifting question marks */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,.09) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, #000 20%, transparent 75%)",
            maskImage: "radial-gradient(ellipse at 30% 40%, #000 20%, transparent 75%)",
          }}
        />
        {marks.map((m, i) => (
          <div key={i} className={`faq-qmark-wrap absolute ${m.cls}`}>
            <span
              className="faq-qmark display block font-bold leading-none"
              style={{ color: m.c, opacity: 0.14, animationDelay: m.d }}
            >
              ?
            </span>
          </div>
        ))}
      </div>

      <div className="container relative grid gap-12 md:grid-cols-[.8fr_1.2fr]">
        {/* Left: sticky heading */}
        <div className="md:sticky md:top-28 md:self-start">
          <div className="faq-head">
            <p className="eyebrow mb-5 text-[var(--orange)]">09 / Good to know</p>
            <h2 id="faq-title" className="display text-5xl font-semibold md:text-6xl">
              A few things<br />
              <span
                style={{
                  background: "linear-gradient(90deg,#4285f4,#ea4335 40%,#f6b94a 70%,#34a853)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                you might ask.
              </span>
            </h2>
            <div className="mt-8 flex items-center gap-3 text-sm text-[var(--muted)]">
              <span className="faq-pulse grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm" style={{ ["--ring" as string]: "rgba(244,119,43,.35)" }}>
                <CircleHelp className="text-[var(--orange)]" size={22} strokeWidth={1.6} />
              </span>
              Tap a question to open the answer.
            </div>

            <div className="mt-10 hidden rounded-3xl bg-[var(--ink)] p-6 text-[var(--paper)] md:block">
              <p className="display text-xl font-semibold">Still curious?</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                The official GDG community page is the best place to ask and stay updated.
              </p>
              <a href={communityUrl} target="_blank" rel="noreferrer" className="group mt-5 inline-flex items-center gap-2 text-sm font-bold">
                Visit the community page
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[var(--ink)] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="faq-list grid gap-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className="faq-item relative overflow-hidden rounded-3xl border backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-18px_rgba(0,0,0,.35)]"
                style={{
                  borderColor: isOpen ? `${faq.color}66` : "rgba(0,0,0,.1)",
                  background: isOpen ? `${faq.color}14` : "rgba(255,255,255,.65)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-1.5 origin-top transition-transform duration-500"
                  style={{ background: faq.color, transform: isOpen ? "scaleY(1)" : "scaleY(0)" }}
                />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-6"
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors duration-300"
                    style={{ background: isOpen ? faq.color : `${faq.color}22`, color: isOpen ? "#fff" : faq.color === YELLOW ? "#8a6a00" : faq.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base font-semibold leading-snug md:text-lg">{faq.q}</span>
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border text-lg font-normal transition-all duration-300"
                    style={{
                      transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                      background: isOpen ? faq.color : "transparent",
                      borderColor: isOpen ? faq.color : "rgba(0,0,0,.15)",
                      color: isOpen ? "#fff" : "inherit",
                    }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    visibility: isOpen ? "visible" : "hidden",
                    transition: "grid-template-rows .5s ease, visibility .5s",
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="max-w-[620px] px-5 pb-6 text-sm leading-7 text-[var(--muted)] transition-all duration-500 md:pl-[4.75rem] md:pr-8"
                      style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? "translateY(0)" : "translateY(-8px)" }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}