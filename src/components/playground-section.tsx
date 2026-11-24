"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Globe, Cloud, GitBranch, ArrowUpRight } from "lucide-react";

// Google palette: solid, tint (surface), dark (text on tint)
const cards = [
  { no: "01", title: "Artificial Intelligence", desc: "Curious experiments and useful things powered by AI.", tags: ["Machine learning", "GenAI", "Data"], solid: "#34a853", tint: "#e6f4ea", dark: "#137333", Icon: Brain },
  { no: "02", title: "Web & Product", desc: "Designing and building thoughtful experiences for the web.", tags: ["Interface", "Backend", "Product"], solid: "#fbbc04", tint: "#fef7e0", dark: "#b06000", Icon: Globe },
  { no: "03", title: "Cloud & Platform", desc: "The infrastructure that helps ideas scale.", tags: ["Platforms", "Systems"], solid: "#4285f4", tint: "#e8f0fe", dark: "#1967d2", Icon: Cloud },
  { no: "04", title: "Open Source", desc: "Learning in public and shipping better, together.", tags: ["Contribute", "Collaborate"], solid: "#ea4335", tint: "#fce8e6", dark: "#c5221f", Icon: GitBranch },
];

// concentric arcs drawn in Google colours
const arcs = [
  { d: "M-80 540 A 520 520 0 0 1 440 20", c: "#4285f4" },
  { d: "M-80 540 A 640 640 0 0 1 560 -100", c: "#ea4335" },
  { d: "M-80 540 A 760 760 0 0 1 680 -220", c: "#fbbc04" },
  { d: "M-80 540 A 880 880 0 0 1 800 -340", c: "#34a853" },
];

const ticker = ["AI & ML", "Web & Product", "Cloud & Platforms", "Open Source", "Learn loudly", "Build together"];
const tickerColors = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

export function PlaygroundSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      /* ---------------- Panel intro ---------------- */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".pg-panel", start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(".pg-eyebrow", { y: 16, opacity: 0, scale: 0.9, duration: 0.6 })
        .from(".pg-panel", { y: 50, opacity: 0, scale: 0.97, duration: 1 }, 0)
        .from(".pg-blob", { scale: 0, opacity: 0, duration: 1.6, stagger: 0.15, ease: "power2.out" }, 0.1)
        .from(".pg-arc", { strokeDashoffset: 1, duration: 2.2, stagger: 0.15, ease: "power2.inOut" }, 0.1)
        .from(".pg-hw", { yPercent: 115, rotate: 5, duration: 0.9, stagger: 0.1 }, 0.3)
        .from(".pg-hl", { y: 30, opacity: 0, duration: 0.8 }, 0.9)
        .from(".pg-squiggle", { strokeDashoffset: 1, duration: 1.1, ease: "power2.inOut" }, 1.3)
        .from(".pg-dot", { y: -50, opacity: 0, scale: 0.2, duration: 0.8, stagger: 0.12, ease: "bounce.out" }, 1.3)
        .from(".pg-lead", { y: 20, opacity: 0, duration: 0.7 }, 1.2)
        .from(".pg-shape-in", { scale: 0, rotate: -180, opacity: 0, duration: 1, stagger: 0.12, ease: "back.out(1.8)" }, 0.9)
        .from(".pg-badge-in", { scale: 0, rotate: -120, opacity: 0, duration: 1.1, ease: "back.out(1.6)" }, 1.4)
        .from(".pg-ticker", { y: 20, opacity: 0, duration: 0.8 }, 1.5);

      /* ---------------- Endless gentle motion ---------------- */
      gsap.to(".pg-arcs", { x: 24, y: -10, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".pg-dot", { y: (i) => (i % 2 ? 9 : -9), duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.2, delay: 2.4 });
      gsap.utils.toArray<HTMLElement>(".pg-blob").forEach((blob, i) => {
        gsap.to(blob, {
          x: i % 2 ? -50 : 50, y: i % 2 ? 36 : -36, scale: 1.18,
          duration: 7 + i * 1.3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5,
        });
      });
      gsap.utils.toArray<HTMLElement>(".pg-float").forEach((node, i) => {
        gsap.to(node, {
          y: i % 2 ? 14 : -14, rotate: i % 2 ? -18 : 18,
          duration: 2.6 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8 + i * 0.15,
        });
      });

      /* ---------------- Scroll parallax (scrubbed) ---------------- */
      const scrub = { trigger: ".pg-panel", start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.to(".pg-arcs-wrap", { yPercent: -12, ease: "none", scrollTrigger: scrub });
      gsap.to(".pg-blobs", { yPercent: 14, ease: "none", scrollTrigger: scrub });
      gsap.to(".pg-badge", { y: -60, ease: "none", scrollTrigger: scrub });

      /* ---------------- Panel: cursor parallax + spotlight ---------------- */
      const panel = el.querySelector<HTMLElement>(".pg-panel");
      const spot = el.querySelector<HTMLElement>(".pg-spot");
      if (panel) {
        const shapes = gsap.utils.toArray<HTMLElement>(".pg-shape");
        const onMove = (e: MouseEvent) => {
          const r = panel.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          shapes.forEach((s) => {
            const d = Number(s.dataset.depth || 20);
            gsap.to(s, { x: -nx * d * 2, y: -ny * d * 2, duration: 0.9, ease: "power3.out", overwrite: "auto" });
          });
          if (spot) {
            spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
            spot.style.setProperty("--my", `${e.clientY - r.top}px`);
          }
        };
        const onEnter = () => spot && gsap.to(spot, { opacity: 1, duration: 0.4 });
        const onLeave = () => {
          if (spot) gsap.to(spot, { opacity: 0, duration: 0.5 });
          gsap.to(shapes, { x: 0, y: 0, duration: 1, ease: "power3.out", overwrite: "auto" });
        };
        panel.addEventListener("mousemove", onMove);
        panel.addEventListener("mouseenter", onEnter);
        panel.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          panel.removeEventListener("mousemove", onMove);
          panel.removeEventListener("mouseenter", onEnter);
          panel.removeEventListener("mouseleave", onLeave);
        });
      }

      /* ---------------- Cards ---------------- */
      const strip = { trigger: ".pg-strip", start: "top 88%", once: true };

      gsap.from(".pg-card", {
        y: 80, opacity: 0, rotationX: -12, transformPerspective: 900, duration: 1, stagger: 0.13, ease: "power3.out",
        scrollTrigger: strip,
      });
      gsap.from(".pg-icon", {
        scale: 0, rotate: -90, opacity: 0, duration: 0.9, stagger: 0.12, delay: 0.25,
        ease: "back.out(2)", clearProps: "transform", scrollTrigger: strip,
      });
      gsap.from(".pg-tag", {
        y: 10, opacity: 0, duration: 0.6, stagger: 0.04, delay: 1, ease: "power2.out", scrollTrigger: strip,
      });
      gsap.utils.toArray<HTMLElement>(".pg-icon-float").forEach((node, i) => {
        gsap.to(node, { y: -6, rotate: i % 2 ? 6 : -6, duration: 2.4 + i * 0.25, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 + i * 0.2 });
      });

      // 3D tilt + cursor glow on each card
      gsap.utils.toArray<HTMLElement>(".pg-card").forEach((card) => {
        const move = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          gsap.to(card, {
            rotationY: (px - 0.5) * 14, rotationX: -(py - 0.5) * 14, y: -8,
            transformPerspective: 900, duration: 0.45, ease: "power3.out", overwrite: "auto",
          });
          card.style.setProperty("--gx", `${px * 100}%`);
          card.style.setProperty("--gy", `${py * 100}%`);
        };
        const leave = () =>
          gsap.to(card, { rotationX: 0, rotationY: 0, y: 0, duration: 0.7, ease: "elastic.out(1,.6)", overwrite: "auto" });
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseleave", leave);
        });
      });

      // Text reveal (set + ScrollTrigger.create is more reliable on refresh than from())
      gsap.set(".pg-word-inner", { yPercent: 120, rotate: 6, opacity: 0 });
      gsap.set(".pg-desc", { y: 12, opacity: 0 });
      gsap.set(".pg-underline", { scaleX: 0, transformOrigin: "left center" });

      ScrollTrigger.create({
        trigger: ".pg-strip", start: "top 88%", once: true,
        onEnter: () => {
          gsap.to(".pg-word-inner", { yPercent: 0, rotate: 0, opacity: 1, duration: 0.9, stagger: 0.08, delay: 0.45, ease: "power4.out", overwrite: "auto" });
          gsap.to(".pg-desc", { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, delay: 0.9, ease: "power3.out", overwrite: "auto" });
          gsap.to(".pg-underline", { scaleX: 1, duration: 0.8, stagger: 0.12, delay: 1, ease: "power3.inOut", overwrite: "auto" });
        },
      });

      // Layout shifts (fonts, restored scroll position) can leave trigger positions stale
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      cleanups.push(() => window.removeEventListener("load", refresh));
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="explore"
      className="gsap-section scroll-mt-24 bg-white pb-20 pt-10"
      aria-labelledby="playground-title"
      style={{ fontFamily: "'Google Sans','Product Sans',Inter,system-ui,sans-serif" }}
    >
      <style>{`
        @keyframes pg-shimmer { to { background-position: 300% 0; } }
        @keyframes pg-marquee { to { transform: translateX(-50%); } }
        @keyframes pg-spin { to { transform: rotate(360deg); } }
        @keyframes pg-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .pg-shimmer-text {
          background: linear-gradient(90deg,#1a73e8,#ea4335,#fbbc04,#34a853,#1a73e8);
          background-size: 300% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          animation: pg-shimmer 7s linear infinite;
        }
        .pg-marquee-track { animation: pg-marquee 28s linear infinite; }
        .pg-ticker:hover .pg-marquee-track { animation-play-state: paused; }
        .pg-spin-slow { animation: pg-spin 18s linear infinite; }
        .pg-eyebrow-dot { animation: pg-bob 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .pg-shimmer-text, .pg-marquee-track, .pg-spin-slow, .pg-eyebrow-dot { animation: none; }
        }
      `}</style>

      <div className="container">
        <span className="pg-eyebrow inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-medium text-[#5f6368] shadow-sm">
          <span className="flex gap-1" aria-hidden="true">
            <i className="pg-eyebrow-dot h-2 w-2 rounded-full bg-[#4285f4]" />
            <i className="pg-eyebrow-dot h-2 w-2 rounded-full bg-[#ea4335]" style={{ animationDelay: ".15s" }} />
            <i className="pg-eyebrow-dot h-2 w-2 rounded-full bg-[#fbbc04]" style={{ animationDelay: ".3s" }} />
            <i className="pg-eyebrow-dot h-2 w-2 rounded-full bg-[#34a853]" style={{ animationDelay: ".45s" }} />
          </span>
          02 / The playground
        </span>

        {/* Hero panel */}
        <div
          className="pg-panel relative mt-8 overflow-hidden rounded-[36px]"
          style={{ background: "linear-gradient(135deg,#e8f0fe 0%,#f4f8ff 55%,#fef7e0 100%)" }}
        >
          {/* Drifting colour blobs */}
          <div className="pg-blobs pointer-events-none absolute inset-0" aria-hidden="true">
            <span className="pg-blob absolute -left-16 top-10 h-72 w-72 rounded-full bg-[#4285f4] opacity-25 blur-3xl" />
            <span className="pg-blob absolute right-10 -top-10 h-64 w-64 rounded-full bg-[#fbbc04] opacity-30 blur-3xl" />
            <span className="pg-blob absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#34a853] opacity-20 blur-3xl" />
            <span className="pg-blob absolute -bottom-10 right-1/4 h-56 w-56 rounded-full bg-[#ea4335] opacity-20 blur-3xl" />
          </div>

          {/* Arcs */}
          <div className="pg-arcs-wrap pointer-events-none absolute inset-0" aria-hidden="true">
            <svg className="pg-arcs absolute -inset-x-10 inset-y-0 h-full w-[calc(100%+80px)]" viewBox="0 0 1920 540" preserveAspectRatio="xMinYMax slice">
              {arcs.map((a, i) => (
                <path key={i} className="pg-arc" d={a.d} pathLength={1} strokeDasharray={1} strokeDashoffset={0} fill="none" stroke={a.c} strokeOpacity={0.55} strokeWidth={2} strokeLinecap="round" />
              ))}
            </svg>
          </div>

          {/* Cursor spotlight */}
          <div
            className="pg-spot pointer-events-none absolute inset-0 opacity-0"
            aria-hidden="true"
            style={{ background: "radial-gradient(340px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.75), transparent 70%)" }}
          />

          {/* Floating shapes (cursor parallax > float loop > intro pop) */}
          <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
            <div className="pg-shape absolute right-[24%] top-12" data-depth="26">
              <div className="pg-float"><svg className="pg-shape-in" width="46" height="46" viewBox="0 0 46 46"><circle cx="23" cy="23" r="22" fill="#fbbc04" /></svg></div>
            </div>
            <div className="pg-shape absolute right-[9%] top-24" data-depth="40">
              <div className="pg-float"><svg className="pg-shape-in" width="58" height="58" viewBox="0 0 58 58"><rect x="6" y="6" width="46" height="46" rx="12" fill="#4285f4" transform="rotate(14 29 29)" /></svg></div>
            </div>
            <div className="pg-shape absolute right-[34%] top-[46%]" data-depth="34">
              <div className="pg-float"><svg className="pg-shape-in" width="48" height="48" viewBox="0 0 48 48"><polygon points="24,4 44,42 4,42" fill="#ea4335" strokeLinejoin="round" stroke="#ea4335" strokeWidth="6" /></svg></div>
            </div>
            <div className="pg-shape absolute right-[16%] top-[52%]" data-depth="22">
              <div className="pg-float"><svg className="pg-shape-in" width="44" height="44" viewBox="0 0 44 44"><path d="M18 4h8v14h14v8H26v14h-8V26H4v-8h14z" fill="#34a853" /></svg></div>
            </div>
          </div>

          {/* Headline */}
          <div className="relative px-6 pb-24 pt-14 md:px-14 md:pb-28 md:pt-20">
            <h2 id="playground-title" className="font-semibold leading-[1.08] tracking-tight text-[#202124]" style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)" }}>
              <span className="block">
                {["Things", "worth", "geeking"].map((w) => (
                  <span key={w} className="mr-[.25em] inline-block overflow-hidden pb-[.14em] align-bottom -mb-[.14em]">
                    <span className="pg-hw inline-block">{w}</span>
                  </span>
                ))}
              </span>
              <span className="relative mt-2 inline-block">
                <span className="pg-hl pg-shimmer-text relative block py-[.04em]">out over.</span>
                <svg className="absolute -bottom-1 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                  <path className="pg-squiggle" d="M2 8 Q 14 0 26 8 T 50 8 T 74 8 T 98 8 T 122 8 T 146 8 T 170 8 T 198 8" pathLength={1} strokeDasharray={1} strokeDashoffset={0} fill="none" stroke="#fbbc04" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span className="pg-dot absolute -right-6 -top-3 hidden h-6 w-6 rounded-full bg-[#fbbc04] md:block" aria-hidden="true" />
                <span className="pg-dot absolute -bottom-4 -right-2 hidden h-4 w-4 rounded-full bg-[#ea4335] md:block" aria-hidden="true" />
                <span className="pg-dot absolute -bottom-3 right-12 hidden h-3 w-3 rounded-full bg-[#34a853] md:block" aria-hidden="true" />
              </span>
            </h2>
            <p className="pg-lead mt-10 max-w-[440px] text-base leading-7 text-[#5f6368]">
              A few directions we love exploring. These are areas of interest, not a list of past workshops. Bring your curiosity; you don&apos;t need to know it all already.
            </p>
          </div>

          {/* Rotating badge */}
          <div className="pg-badge pointer-events-none absolute bottom-20 right-10 hidden md:block" aria-hidden="true">
            <div className="pg-badge-in relative h-[120px] w-[120px]">
              <svg className="pg-spin-slow absolute inset-0" viewBox="0 0 120 120">
                <defs>
                  <path id="pg-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text fontSize="10.5" fontWeight="700" fill="#1967d2" letterSpacing="1.5">
                  <textPath href="#pg-circle" textLength="272" lengthAdjust="spacing">KEEP EXPLORING • KEEP BUILDING •</textPath>
                </text>
              </svg>
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#1a73e8] text-white shadow-lg">
                  <ArrowUpRight size={20} />
                </span>
              </span>
            </div>
          </div>

          {/* Ticker */}
          <div className="pg-ticker absolute inset-x-0 bottom-0 overflow-hidden border-t border-[#1a73e8]/15 bg-white/50 py-3 backdrop-blur-sm" aria-hidden="true">
            <div className="pg-marquee-track flex w-max">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center">
                  {ticker.map((t, i) => (
                    <span key={`${dup}-${t}`} className="flex items-center gap-6 pr-6 text-[12px] font-semibold uppercase tracking-[.18em] text-[#3c4043]">
                      {t}
                      <i className="h-2 w-2 rounded-full" style={{ background: tickerColors[i % 4] }} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="pg-strip mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ no, title, desc, tags, solid, tint, dark, Icon }) => (
            <article
              key={title}
              className="pg-card group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[28px] border border-transparent p-7 transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(60,64,67,.22)]"
              style={{ background: tint }}
            >
              {/* cursor glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
                style={{ background: `radial-gradient(260px circle at var(--gx,50%) var(--gy,50%), ${solid}38, transparent 70%)` }}
              />
              {/* shine sweep */}
              <span
                className="pointer-events-none absolute -inset-y-6 left-0 w-1/3 -translate-x-[160%] -skew-x-12 bg-white/50 blur-md transition-transform duration-[900ms] ease-out group-hover:translate-x-[420%]"
                aria-hidden="true"
              />
              {/* watermark icon */}
              <Icon
                className="pointer-events-none absolute -bottom-10 -right-10 opacity-[.08] transition-transform duration-700 ease-out group-hover:rotate-12 group-hover:scale-110"
                size={200}
                strokeWidth={1.2}
                style={{ color: solid }}
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between">
                <div className="pg-icon-float">
                  <span className="pg-icon grid h-14 w-14 place-items-center rounded-2xl text-white shadow-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" style={{ background: solid }}>
                    <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </div>
                <span className="text-xs font-semibold tracking-widest" style={{ color: dark, opacity: 0.7 }}>{no}</span>
              </div>

              <div className="relative">
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span key={t} className="pg-tag rounded-full bg-white/70 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider" style={{ color: dark }}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-[26px] font-semibold leading-[1.15]" style={{ color: dark }}>
                  {title.split(" ").map((word, i, arr) => (
                    <span key={i} className="inline-block overflow-hidden pb-[.12em] align-bottom">
                      {/* CSS hover lives on this wrapper so it never fights GSAP's inline transform on the inner span */}
                      <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
                        <span className="pg-word-inner inline-block">
                          {word}
                          {i < arr.length - 1 ? " " : ""}
                        </span>
                      </span>
                    </span>
                  ))}
                </h3>
                <p className="pg-desc mt-3 text-sm leading-6 text-[#3c4043]">{desc}</p>
                <span className="mt-4 flex items-center justify-between">
                  <span className="block h-[3px] w-12 transition-[width] duration-500 ease-out group-hover:w-24" aria-hidden="true">
                    <span className="pg-underline block h-full w-full rounded-full" style={{ background: solid }} />
                  </span>
                  <ArrowUpRight size={18} className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" style={{ color: dark }} aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}