"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, MapPin, Handshake, Image as ImageIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Google palette                                                     */
/* ------------------------------------------------------------------ */
const G = {
  blue: "#4285f4",
  red: "#ea4335",
  yellow: "#fbbc04",
  green: "#34a853",
  ink: "#202124",
  muted: "#5f6368",
  line: "#dadce0",
  surface: "#f8f9fa",
};

/* ------------------------------------------------------------------ */
/*  Content — swap these for your own files in /public if you like     */
/* ------------------------------------------------------------------ */
// Ratio of the banner you shared: 1137 x 283
const BANNER_RATIO = "1137 / 283";
// To use your exact banner, save it as /public/devspark-2026-banner.png and use that path here.
const BANNER_SRC =
  "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/DevSpark_2026_Ranchi_2560x650_widephoto_ZFEtHb9.png";

const details = [
  { icon: CalendarDays, label: "13 October 2026", color: G.blue },
  { icon: Clock, label: "9:30 AM – 12:30 PM", color: G.red },
  { icon: MapPin, label: "G.D. Birla Auditorium, SBU", color: G.green },
  { icon: Handshake, label: "With GDG Ranchi", color: G.yellow },
];

// Three event pictures.
// Put your images in  /public/devspark/  and name them  event-1.jpg, event-2.jpg, event-3.jpg
// (or change the `src` paths below, e.g. "/devspark/my-photo.png"). Edit title/caption/alt freely.
const photos = [
  {
    src: "/devspark/event-1.jpg",
    alt: "DevSpark 2026 at Sarala Birla University",
    title: "",
    caption: "",
    color: G.blue,
  },
  {
    src: "/devspark/event-2.jpg",
    alt: "DevSpark 2026 session at G.D. Birla Auditorium",
    title: "",
    caption: "",
    color: G.red,
  },
  {
    src: "/devspark/event-3.jpg",
    alt: "DevSpark 2026 students and organisers",
    title: "",
    caption: "",
    color: G.green,
  },
];

/* A photo box: shows your image, or a tidy Google-style placeholder until the file exists */
function PhotoBox({ src, alt, color }: { src: string; alt: string; color: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center" style={{ background: `${color}14` }}>
        <div className="text-center" style={{ color }}>
          <ImageIcon size={30} strokeWidth={1.4} className="mx-auto mb-2" />
          <span className="text-xs font-medium">Add image: {src}</span>
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
    />
  );
}

const googleGradient = `linear-gradient(90deg, ${G.blue} 0%, ${G.red} 33%, ${G.yellow} 66%, ${G.green} 100%)`;

type Props = { communityUrl: string };

export function DevSparkSection({ communityUrl }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading + badge
      gsap.from(".ds-head", {
        y: 36, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });

      // Top colour bar draws in
      gsap.from(".ds-bar span", {
        scaleX: 0, transformOrigin: "left center", duration: 0.8, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });

      // Banner: wipe open, then settle
      gsap.fromTo(".ds-banner",
        { clipPath: "inset(0 100% 0 0 round 28px)", scale: 0.96, opacity: 0.4 },
        {
          clipPath: "inset(0 0% 0 0 round 28px)", scale: 1, opacity: 1, duration: 1.3, ease: "power4.out",
          scrollTrigger: { trigger: ".ds-banner", start: "top 85%", once: true },
        }
      );

      // Info chips pop in
      gsap.from(".ds-chip", {
        y: 18, scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.09, ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".ds-chips", start: "top 90%", once: true },
      });

      // Photos fly in with alternating tilt
      gsap.fromTo(".ds-photo",
        { y: 70, opacity: 0, scale: 0.9, rotate: (i) => (i % 2 === 0 ? -5 : 5) },
        {
          y: 0, opacity: 1, scale: 1, rotate: (i) => [-1.5, 1, -0.8][i] ?? 0,
          duration: 1, stagger: 0.18, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".ds-photos", start: "top 85%", once: true },
        }
      );

      // Looping float on decorative shapes
      gsap.utils.toArray<HTMLElement>(".ds-float").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -16 : 16, x: i % 2 === 0 ? 8 : -8, rotate: i % 2 === 0 ? 12 : -12,
          duration: 3 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1,
        });
      });

      // Photo hover tilt
      gsap.utils.toArray<HTMLElement>(".ds-photo").forEach((card, i) => {
        const rest = [-1.5, 1, -0.8][i] ?? 0;
        card.addEventListener("mouseenter", () => gsap.to(card, { y: -12, rotate: 0, scale: 1.03, duration: 0.35, ease: "power2.out" }));
        card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, rotate: rest, scale: 1, duration: 0.45, ease: "power2.out" }));
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="devspark"
      aria-labelledby="devspark-title"
      className="gsap-section relative scroll-mt-24 overflow-hidden py-20 md:py-28"
      style={{
        background: "#ffffff",
        backgroundImage: `radial-gradient(${G.line} 1.2px, transparent 1.2px)`,
        backgroundSize: "26px 26px",
        fontFamily: '"Google Sans", "Product Sans", "Poppins", "Inter", system-ui, sans-serif',
        color: G.ink,
      }}
    >
      <style>{`
        @keyframes ds-spin { to { transform: rotate(360deg); } }
        @keyframes ds-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(52,168,83,.45); } 50% { box-shadow: 0 0 0 9px rgba(52,168,83,0); } }
        .ds-ring { animation: ds-spin 7s linear infinite; }
        .ds-live { animation: ds-pulse 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ds-ring, .ds-live { animation: none; } }
      `}</style>

      {/* Decorative floating Google-style shapes */}
      <span aria-hidden className="ds-float pointer-events-none absolute left-[4%] top-24 h-6 w-6 rounded-full" style={{ background: G.blue }} />
      <span aria-hidden className="ds-float pointer-events-none absolute right-[6%] top-40 h-5 w-5 rotate-45 rounded-[4px]" style={{ background: G.yellow }} />
      <span aria-hidden className="ds-float pointer-events-none absolute left-[9%] bottom-48 h-4 w-4 rounded-full" style={{ background: G.red }} />
      <span aria-hidden className="ds-float pointer-events-none absolute right-[10%] bottom-32 h-7 w-7 rounded-full border-[5px]" style={{ borderColor: G.green }} />

      <div className="container relative">
        {/* Heading row */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="ds-head mb-5 flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden>
                {[G.blue, G.red, G.yellow, G.green].map((c) => (
                  <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                ))}
              </span>
              <span className="text-sm font-medium" style={{ color: G.muted }}>First chapter</span>
            </div>
            <h2 id="devspark-title" className="ds-head text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              DevSpark{" "}
              <span style={{ backgroundImage: googleGradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                2026
              </span>
            </h2>
          </div>

          <span
            className="ds-head inline-flex w-fit items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-sm font-medium"
            style={{ borderColor: G.line, color: G.green }}
          >
            <span className="ds-live grid h-5 w-5 place-items-center rounded-full" style={{ background: "rgba(52,168,83,.12)" }}>
              <CheckCircle2 size={14} />
            </span>
            Completed
          </span>
        </div>

        {/* Four-colour bar */}
        <div className="ds-bar mb-6 flex h-1.5 overflow-hidden rounded-full" aria-hidden>
          {[G.blue, G.red, G.yellow, G.green].map((c) => (
            <span key={c} className="h-full flex-1" style={{ background: c }} />
          ))}
        </div>

        {/* Banner — exact ratio of the supplied artwork (1137 : 283) */}
        <div className="ds-banner relative overflow-hidden rounded-[28px] p-[3px] shadow-[0_18px_50px_-18px_rgba(66,133,244,.45)]">
          <div
            aria-hidden
            className="ds-ring absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2"
            style={{ background: `conic-gradient(from 0deg, ${G.blue}, ${G.red}, ${G.yellow}, ${G.green}, ${G.blue})` }}
          />
          <div className="relative overflow-hidden rounded-[25px] bg-white" style={{ aspectRatio: BANNER_RATIO }}>
            <img
              src={BANNER_SRC}
              alt="DevSpark 2026 Ranchi official banner: GD Birla Auditorium, SBU Ranchi, 13th October 2026, 9:30 AM to 12:30 PM"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <p className="mt-3 text-xs" style={{ color: G.muted }}>
          Official DevSpark 2026 event artwork, from the GDG event listing.
        </p>

        {/* Details + copy */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <h3 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              A hands-on introduction to building with{" "}
              <span style={{ color: G.blue }}>Google Antigravity</span>.
            </h3>
            <p className="mt-5 max-w-[560px] text-[15px] leading-7" style={{ color: G.muted }}>
              Our first featured campus gathering brought students together for a practical session exploring Google&apos;s Antigravity, in collaboration with GDG Ranchi.
            </p>
            <a
              href={communityUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: G.blue, outlineColor: G.blue }}
            >
              Explore the chapter <ArrowRight size={16} />
            </a>
          </div>

          <ul className="ds-chips grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {details.map(({ icon: Icon, label, color }) => (
              <li
                key={label}
                className="ds-chip flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 text-sm font-medium shadow-sm"
                style={{ borderColor: G.line }}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: `${color}1f`, color }}>
                  <Icon size={17} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Three event pictures */}
        <div className="mt-16">
          <p className="mb-6 text-sm font-medium" style={{ color: G.muted }}>
            Moments from the community
          </p>
          <div className="ds-photos grid gap-6 md:grid-cols-3">
            {photos.map((p) => (
              <figure
                key={p.title}
                className="ds-photo overflow-hidden rounded-3xl border bg-white shadow-[0_10px_30px_-12px_rgba(60,64,67,.35)] will-change-transform"
                style={{ borderColor: G.line }}
              >
                <div className="h-1.5 w-full" style={{ background: p.color }} aria-hidden />
                <div className="aspect-[4/3] overflow-hidden" style={{ background: G.surface }}>
                  <PhotoBox src={p.src} alt={p.alt} color={p.color} />
                </div>
                <figcaption className="flex items-center gap-3 px-5 py-4">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden />
                  <span>
                    <span className="block text-sm font-semibold">{p.title}</span>
                    <span className="block text-xs" style={{ color: G.muted }}>{p.caption}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-5 text-xs" style={{ color: G.muted }}>
            Moments from DevSpark 2026 at Sarala Birla University.
          </p>
        </div>
      </div>
    </section>
  );
}