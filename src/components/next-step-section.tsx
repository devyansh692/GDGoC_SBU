"use client";

import { ArrowUpRight, CalendarDays, Compass, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  { no: "01", title: "Join the chapter", desc: "Start on the official GDG community page, the verified home for chapter updates.", color: "#4285f4", Icon: Users, external: true },
  { no: "02", title: "See what's happening", desc: "Check the events section for activities and announcements as they are confirmed.", color: "#ea4335", Icon: CalendarDays, href: "#events" },
  { no: "03", title: "Pick something to explore", desc: "Browse the areas our community loves: AI, web, cloud and open source.", color: "#34a853", Icon: Compass, href: "#explore" },
];

export function NextStepSection({ communityUrl }: { communityUrl: string }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".ns-panel", start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(".ns-eyebrow", { y: 16, opacity: 0, duration: 0.6 })
        .from(".ns-panel", { y: 60, opacity: 0, scale: 0.96, duration: 1.1 }, 0)
        .from(".ns-blob", { scale: 0, opacity: 0, duration: 1.6, stagger: 0.15 }, 0.1)
        .from(".ns-word", { yPercent: 115, rotate: 4, duration: 0.9, stagger: 0.09 }, 0.35)
        .from(".ns-copy", { y: 20, opacity: 0, duration: 0.7 }, 1)
        .from(".ns-cta-wrap > *", { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, 1.15)
        .from(".ns-orbit-wrap", { scale: 0.4, rotate: -90, opacity: 0, duration: 1.4, ease: "back.out(1.4)" }, 0.5);

      gsap.from(".ns-step", {
        y: 60, opacity: 0, rotationX: -10, transformPerspective: 900, duration: 0.9, stagger: 0.13, ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".ns-steps", start: "top 88%", once: true },
      });

      // Blobs drift
      gsap.utils.toArray<HTMLElement>(".ns-blob").forEach((b, i) => {
        gsap.to(b, { x: i % 2 ? -60 : 60, y: i % 2 ? 40 : -40, scale: 1.2, duration: 7 + i * 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5 });
      });

      // Scroll parallax on the orbit graphic
      gsap.to(".ns-orbit-wrap", {
        y: -50, ease: "none",
        scrollTrigger: { trigger: ".ns-panel", start: "top bottom", end: "bottom top", scrub: 0.6 },
      });

      // Spotlight following the cursor in the panel
      const panel = el.querySelector<HTMLElement>(".ns-panel");
      const spot = el.querySelector<HTMLElement>(".ns-spot");
      if (panel && spot) {
        const move = (e: MouseEvent) => {
          const r = panel.getBoundingClientRect();
          spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
          spot.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        const enter = () => gsap.to(spot, { opacity: 1, duration: 0.4 });
        const leave = () => gsap.to(spot, { opacity: 0, duration: 0.5 });
        panel.addEventListener("mousemove", move);
        panel.addEventListener("mouseenter", enter);
        panel.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          panel.removeEventListener("mousemove", move);
          panel.removeEventListener("mouseenter", enter);
          panel.removeEventListener("mouseleave", leave);
        });
      }

      // Magnetic primary button
      const magnet = el.querySelector<HTMLElement>(".ns-magnet");
      if (magnet) {
        const xTo = gsap.quickTo(magnet, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(magnet, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: MouseEvent) => {
          const r = magnet.getBoundingClientRect();
          xTo(((e.clientX - (r.left + r.width / 2)) / r.width) * 22);
          yTo(((e.clientY - (r.top + r.height / 2)) / r.height) * 22);
        };
        const leave = () => { xTo(0); yTo(0); };
        magnet.addEventListener("mousemove", move);
        magnet.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          magnet.removeEventListener("mousemove", move);
          magnet.removeEventListener("mouseleave", leave);
        });
      }

      // 3D tilt on step cards
      gsap.utils.toArray<HTMLElement>(".ns-step").forEach((card) => {
        const move = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          gsap.to(card, { rotationY: (px - 0.5) * 12, rotationX: -(py - 0.5) * 12, y: -8, transformPerspective: 900, duration: 0.45, ease: "power3.out", overwrite: "auto" });
          card.style.setProperty("--gx", `${px * 100}%`);
          card.style.setProperty("--gy", `${py * 100}%`);
        };
        const leave = () => gsap.to(card, { rotationX: 0, rotationY: 0, y: 0, duration: 0.7, ease: "elastic.out(1,.6)", overwrite: "auto" });
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseleave", leave);
        });
      });
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  const headline = ["Come", "build", "something", "with", "us."];

  return (
    <section ref={root} id="community" className="gsap-section section-pad scroll-mt-24" aria-labelledby="next-step-title">
      <style>{`
        @keyframes ns-spin { to { transform: rotate(360deg); } }
        @keyframes ns-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes ns-shimmer { to { background-position: 300% 0; } }
        @keyframes ns-ping { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(2.4); opacity: 0; } }
        .ns-ring-a { animation: ns-spin 22s linear infinite; }
        .ns-ring-b { animation: ns-spin-rev 34s linear infinite; }
        .ns-ring-c { animation: ns-spin 48s linear infinite; }
        .ns-shimmer {
          background: linear-gradient(90deg,#8ab4f8,#f28b82,#fdd663,#81c995,#8ab4f8);
          background-size: 300% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          animation: ns-shimmer 7s linear infinite;
        }
        .ns-ping { animation: ns-ping 2.4s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ns-ring-a, .ns-ring-b, .ns-ring-c, .ns-shimmer, .ns-ping { animation: none; }
        }
      `}</style>

      <div className="container">
        <p className="ns-eyebrow eyebrow mb-6 inline-flex items-center gap-3 text-[var(--orange)]">
          <span className="relative grid h-2.5 w-2.5 place-items-center">
            <span className="ns-ping absolute inset-0 rounded-full bg-[var(--orange)]" />
            <span className="relative h-2 w-2 rounded-full bg-[var(--orange)]" />
          </span>
          10 / Your next step
        </p>

        {/* Big CTA panel */}
        <div className="ns-panel relative overflow-hidden rounded-[40px] bg-[var(--ink)] p-8 text-[var(--paper)] md:p-16">
          {/* glows */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <span className="ns-blob absolute -left-20 -top-16 h-80 w-80 rounded-full bg-[#4285f4] opacity-30 blur-3xl" />
            <span className="ns-blob absolute -right-16 top-10 h-72 w-72 rounded-full bg-[#ea4335] opacity-25 blur-3xl" />
            <span className="ns-blob absolute bottom-[-60px] left-1/3 h-72 w-72 rounded-full bg-[#34a853] opacity-25 blur-3xl" />
            <span className="ns-blob absolute -bottom-10 right-1/4 h-60 w-60 rounded-full bg-[#fbbc04] opacity-20 blur-3xl" />
            {/* line grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
                WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, #000 25%, transparent 75%)",
                maskImage: "radial-gradient(ellipse at 30% 40%, #000 25%, transparent 75%)",
              }}
            />
          </div>
          {/* cursor spotlight */}
          <div
            aria-hidden
            className="ns-spot pointer-events-none absolute inset-0 opacity-0"
            style={{ background: "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.12), transparent 70%)" }}
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.3fr_.7fr]">
            <div>
              <h2 id="next-step-title" className="display text-5xl font-semibold leading-[1.05] md:text-7xl">
                {headline.map((w, i) => (
                  <span key={i} className="mr-[.22em] inline-block overflow-hidden pb-[.12em] align-bottom -mb-[.12em]">
                    <span className={`ns-word inline-block ${w === "something" ? "ns-shimmer" : ""}`}>{w}</span>
                  </span>
                ))}
              </h2>
              <p className="ns-copy mt-8 max-w-[520px] text-[15px] leading-7 text-white/60">
                Join the chapter on the official GDG community page, say hello, and find your first — or next — thing. No gatekeeping, no guru energy.
              </p>

              <div className="ns-cta-wrap mt-10 flex flex-wrap items-center gap-4">
                <div>
                  <a
                    href={communityUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ns-magnet group inline-flex items-center gap-3 rounded-full bg-[var(--paper)] px-7 py-4 text-sm font-bold text-[var(--ink)] shadow-[0_12px_40px_-10px_rgba(255,255,255,.45)] transition-shadow duration-300 hover:shadow-[0_16px_50px_-8px_rgba(255,255,255,.6)]"
                  >
                    Join the community
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--ink)] text-[var(--paper)] transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </div>
                <a
                  href="#events"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold backdrop-blur transition-colors hover:bg-white/20"
                >
                  Explore events
                </a>
              </div>
            </div>

            {/* Orbit graphic */}
            <div className="ns-orbit-wrap mx-auto hidden h-[300px] w-[300px] lg:block" aria-hidden>
              <div className="relative h-full w-full">
                <div className="ns-ring-a absolute inset-0 rounded-full border border-dashed border-white/25">
                  <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#4285f4] shadow-[0_0_20px_#4285f4]" />
                  <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#fbbc04] shadow-[0_0_16px_#fbbc04]" />
                </div>
                <div className="ns-ring-b absolute inset-9 rounded-full border border-white/20">
                  <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#ea4335] shadow-[0_0_16px_#ea4335]" />
                  <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#34a853] shadow-[0_0_20px_#34a853]" />
                </div>
                <div className="ns-ring-c absolute inset-[4.5rem] rounded-full border border-dashed border-white/15">
                  <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_#fff]" />
                </div>
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid h-24 w-24 place-items-center rounded-full bg-white/10 text-2xl font-bold backdrop-blur ring-1 ring-white/25">
                    GDG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="ns-steps mt-6 grid gap-5 md:grid-cols-3">
          {steps.map(({ no, title, desc, color, Icon, external, href }) => (
            <a
              key={no}
              href={external ? communityUrl : href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="ns-step group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-7 backdrop-blur transition-shadow duration-300 hover:shadow-[0_20px_44px_-20px_rgba(0,0,0,.4)]"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-[.25] transition-transform duration-500 group-hover:scale-x-100" style={{ background: color }} />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(240px circle at var(--gx,50%) var(--gy,50%), ${color}26, transparent 70%)` }}
              />
              <Icon aria-hidden size={150} strokeWidth={1.1} className="pointer-events-none absolute -bottom-8 -right-8 opacity-[.06] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" style={{ color }} />

              <div className="relative flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" style={{ background: color }}>
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <span className="text-xs font-bold tracking-widest text-black/35">{no}</span>
              </div>
              <div className="relative">
                <h3 className="display text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold" style={{ color }}>
                  {external ? "Open community page" : "Take me there"}
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}