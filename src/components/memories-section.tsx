"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────────
   ADD YOUR 8 PHOTOS HERE
   Put the files in /public/memories/ (1.jpg … 8.jpg)
   or replace the src values with any URLs.
   ─────────────────────────────────────────────── */
const photos = [
  { src: "/memories/1.jpg", title: "", note: "Official event artwork" },
  { src: "/memories/2.jpg", title: "", note: "Sarala Birla University" },
  { src: "/memories/3.jpg", title: "", note: "GDG Ranchi gathering" },
  { src: "/memories/4.jpg", title: "", note: "GDG Ranchi community" },
  { src: "/memories/5.jpg", title: "", note: "Learning together" },
  { src: "/memories/6.jpg", title: "", note: "Winners." },
  { src: "/memories/7.jpg", title: "", note: "Ideas on stage" },
  { src: "/memories/8.jpg", title: "", note: "The people" },
];

const accents = ["#f4772b", "#4285f4", "#34a853", "#f6b94a"];

function PhotoCard({ photo, index }: { photo: (typeof photos)[number]; index: number }) {
  const [failed, setFailed] = useState(false);
  const accent = accents[index % accents.length];
  const tilt = index % 2 === 0 ? -1.5 : 1.5;

  return (
    <figure
      className="memory-card group relative shrink-0 overflow-hidden rounded-[22px] border border-black/10 bg-[#eadfd5] shadow-[0_18px_40px_-18px_rgba(0,0,0,.35)] transition-transform duration-500 hover:z-10 hover:!rotate-0 hover:scale-[1.04]"
      style={{ width: "clamp(240px, 26vw, 400px)", aspectRatio: "1.25", transform: `rotate(${tilt}deg)` }}
    >
      {!failed ? (
        <img
          src={photo.src}
          alt={`${photo.title} — ${photo.note}`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div
          className="grid h-full w-full place-items-center text-[11px] font-bold tracking-[.18em] text-black/40"
          style={{ background: `linear-gradient(135deg, ${accent}33, #eadfd5)` }}
        >
          PHOTO {String(index + 1).padStart(2, "0")}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-[.14em]" style={{ color: accent }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <figcaption className="absolute bottom-0 left-0 right-0 translate-y-1 p-4 text-white transition-transform duration-500 group-hover:translate-y-0">
        <p className="text-sm font-semibold leading-tight">{photo.title}</p>
        <p className="mt-1 text-[11px] text-white/70">{photo.note}</p>
      </figcaption>
      <span className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full" style={{ background: accent }} />
    </figure>
  );
}

export function MemoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const top = topRef.current!;
      const bottom = bottomRef.current!;
      const getDistance = () => Math.max(0, top.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + (getDistance() + window.innerHeight * 0.4),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // top row travels RIGHT (starts shifted left, ends at 0)
      tl.fromTo(top, { x: () => -getDistance() }, { x: 0 }, 0);
      // bottom row travels LEFT (starts at 0, ends shifted left)
      tl.fromTo(bottom, { x: 0 }, { x: () => -getDistance() }, 0);
      // progress bar
      tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1 }, 0);

      // soft parallax on the cards
      gsap.utils.toArray<HTMLElement>(".memory-card").forEach((card, i) => {
        gsap.fromTo(card, { y: i % 2 ? 14 : -14 }, {
          y: i % 2 ? -14 : 14, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  // Same 8 photos in both rows
  const row = (rowRef: React.RefObject<HTMLDivElement | null>, label: string) => (
    <div className={reduced ? "overflow-x-auto pb-4" : "overflow-visible"}>
      <div ref={rowRef} className="flex w-max gap-5 px-6 md:px-10" aria-label={label}>
        {photos.map((p, i) => <PhotoCard key={`${label}-${i}`} photo={p} index={i} />)}
      </div>
    </div>
  );

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden bg-[var(--paper)] py-10"
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#f4772b]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#4285f4]/15 blur-3xl" />

      <div className="container relative mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-4 text-[var(--orange)]">07 / The good stuff</p>
          <h2 className="display text-5xl font-semibold leading-[1.02] md:text-7xl">
            Campus<br />memories.
          </h2>
        </div>
        <div className="hidden max-w-[280px] sm:block">
          <p className="text-sm leading-6 text-[var(--muted)]">
            Moments from the wider GDG Ranchi community and the SBU campus. Keep scrolling — the frames move with you.
          </p>
          <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-black/10">
            <div ref={barRef} className="h-full origin-left rounded-full bg-[var(--orange)]" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-5">
        {row(topRef, "Memories moving right")}
        {row(bottomRef, "Memories moving left")}
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--paper)] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--paper)] to-transparent md:w-28" />
      </div>

      <p className="container relative mt-8 text-[11px] text-[var(--muted)]">
        Photos are credited to GDG Ranchi and Sarala Birla University. Event images are identified by their original event; they are not presented as SBU chapter events.
      </p>
    </section>
  );
}