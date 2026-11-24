"use client";

import { ChevronsDown } from "lucide-react";
import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  01 / The community                                                 */
/*  - Line-grid background                                             */
/*  - The section pins to the screen while you scroll; the headline    */
/*    zooms in until it "passes through" and the next section arrives  */
/* ------------------------------------------------------------------ */

const CELL = 72; // grid cell size in px

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const DOTS = [
  { x: 3, y: 2, c: "#4285f4" },
  { x: 8, y: 3, c: "#ea4335" },
  { x: 13, y: 2, c: "#f6b94a" },
  { x: 5, y: 7, c: "#34a853" },
  { x: 11, y: 8, c: "#4285f4" },
  { x: 16, y: 6, c: "#ea4335" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = clamp(-rect.top / total);

      // The zoom starts after a short "read" pause
      const q = clamp((p - 0.28) / 0.72);
      const zoom = 1 + Math.pow(q, 2.4) * 26;

      if (headRef.current) {
        headRef.current.style.transform = `scale(${zoom.toFixed(3)})`;
        headRef.current.style.opacity = String(1 - clamp((q - 0.5) / 0.4));
      }
      if (copyRef.current) {
        copyRef.current.style.opacity = String(1 - clamp(q * 3));
        copyRef.current.style.transform = `translateY(${(-q * 50).toFixed(1)}px)`;
      }
      if (eyebrowRef.current) {
        eyebrowRef.current.style.opacity = String(1 - clamp(q * 4));
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `scale(${(1 + q * 2.2).toFixed(3)})`;
        gridRef.current.style.opacity = String(1 - clamp((q - 0.35) / 0.65) * 0.9);
      }
      if (stageRef.current) {
        stageRef.current.style.opacity = String(1 - clamp((p - 0.94) / 0.06));
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - clamp(p * 8));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-[260vh] scroll-mt-24 motion-reduce:h-auto"
      aria-labelledby="about-title"
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[var(--paper)] motion-reduce:static motion-reduce:h-auto motion-reduce:py-28"
      >
        {/* Line grid */}
        <div ref={gridRef} aria-hidden className="absolute inset-0 will-change-transform" style={{ transformOrigin: "50% 50%" }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.07) 1px, transparent 1px)",
              backgroundSize: `${CELL}px ${CELL}px`,
              WebkitMaskImage: "radial-gradient(ellipse at center, #000 35%, transparent 78%)",
              maskImage: "radial-gradient(ellipse at center, #000 35%, transparent 78%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.14) 1px, transparent 1px)",
              backgroundSize: `${CELL * 4}px ${CELL * 4}px`,
              WebkitMaskImage: "radial-gradient(ellipse at center, #000 25%, transparent 70%)",
              maskImage: "radial-gradient(ellipse at center, #000 25%, transparent 70%)",
            }}
          />
          {/* Google-coloured nodes sitting on grid intersections */}
          {DOTS.map((d, i) => (
            <span
              key={i}
              className="absolute hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:block"
              style={{
                left: d.x * CELL,
                top: d.y * CELL,
                background: d.c,
                boxShadow: `0 0 0 6px ${d.c}22`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container relative z-10 text-center">
          <div ref={eyebrowRef}>
            <p className="eyebrow mb-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[var(--orange)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
              01 / The community
            </p>
          </div>

          <div ref={headRef} className="will-change-transform" style={{ transformOrigin: "50% 78%" }}>
            <h2
              id="about-title"
              className="display mx-auto max-w-[980px] text-4xl font-semibold leading-[1.06] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Not just a tech club.{" "}
              <span className="text-[var(--muted)]">
                A place to turn curiosity into{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg,#4285f4,#ea4335 38%,#f6b94a 68%,#34a853)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  capability.
                </span>
              </span>
            </h2>
          </div>

          <p
            ref={copyRef}
            className="mx-auto mt-10 max-w-[640px] text-[15px] leading-7 text-[var(--muted)]"
          >
            Google Developer Groups on Campus connect students who want to explore technology, exchange ideas, and create things that matter. At SBU, this is a space to ask better questions, learn with peers, and make your first — or next — thing. You do not need a 300-day streak, a mechanical keyboard, or a mysterious GitHub contribution graph to belong here.
          </p>
        </div>

        {/* Scroll hint + progress */}
        <div ref={hintRef} className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-[var(--muted)] motion-reduce:hidden">
          <ChevronsDown size={18} className="animate-bounce" />
          Keep scrolling
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-black/5 motion-reduce:hidden">
          <div ref={barRef} className="h-full origin-left bg-[var(--orange)]" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}