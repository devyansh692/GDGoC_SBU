
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Image as ImageIcon } from "lucide-react";

const COMMUNITY_URL = "https://gdg.community.dev/gdg-on-campus-sarala-birla-university-ranchi-india/";

// Only used for the placeholder shown when the banner image is missing.
// When the image loads, the banner uses the image's OWN ratio (nothing is cropped).
const PLACEHOLDER_RATIO = "3 / 1";

// ---- EDIT YOUR EVENT DETAILS HERE (this is a demo event) ----
const events = [
  {
    id: "demo-event",
    status: "Upcoming",
    tag: "Bootcamp",
    title: "Build with AI Bootcamp",
    description: "The 'Build With AI Bootcamp' at Sarala Birla University invites enthusiasts to explore Google Antigravity and AI Studio with Google Developer Experts. Participants will learn to autonomously plan, test, and deploy code. Enter curious and leave with a creation of your own design.",
    day: "25",
    month: "Nov",
    year: "2026",
    time: "9:00 AM – 12:00 PM",
    venue: "GD Birla, Sarala Birla University",
    banner: "/events/demo-event-banner.jpg",
    cta: "Register now",
    link: COMMUNITY_URL,
  },
];

function Banner({ src, title, status }: { src: string; title: string; status: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="ev-banner relative w-full overflow-hidden bg-[#4285f4]">
      {failed ? (
        <div
          className="grid w-full place-items-center bg-gradient-to-r from-[#4285f4] via-[#5177ff] to-[#34a853] text-white/60"
          style={{ aspectRatio: PLACEHOLDER_RATIO }}
        >
          <div className="text-center">
            <ImageIcon size={26} strokeWidth={1.2} className="mx-auto mb-2" aria-hidden="true" />
            <span className="text-[11px]">Event banner</span>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={`${title} banner`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="ev-banner-img block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
      <span className="ev-badge absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-black shadow">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34a853] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34a853]" />
        </span>
        {status}
      </span>
    </div>
  );
}

export function EventsSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ev-card").forEach((card) => {
        const q = gsap.utils.selector(card);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
          defaults: { ease: "power3.out" },
        });
        tl.from(card, { y: 60, opacity: 0, duration: 0.8, clearProps: "transform,opacity" })
          .from(q(".ev-banner"), { clipPath: "inset(0 100% 0 0)", duration: 1.1, ease: "power4.inOut", clearProps: "clipPath" }, 0.1)
          .from(q(".ev-banner-img"), { scale: 1.3, duration: 1.6, clearProps: "transform" }, 0.1)
          .from(q(".ev-badge"), { y: -16, opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(2)", clearProps: "all" }, 0.9)
          .from(q(".ev-date"), { scale: 0.6, rotate: -8, opacity: 0, duration: 0.7, ease: "back.out(1.8)", clearProps: "all" }, 0.7)
          .from(q(".ev-text > *"), { y: 24, opacity: 0, duration: 0.7, stagger: 0.09, clearProps: "all" }, 0.8)
          .from(q(".ev-meta"), { x: 30, opacity: 0, duration: 0.7, stagger: 0.1, clearProps: "all" }, 0.9)
          .from(q(".ev-cta"), { y: 20, opacity: 0, duration: 0.6, clearProps: "all" }, 1.2);
      });

      gsap.from(".ev-empty", {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
        scrollTrigger: { trigger: ".ev-empty", start: "top 92%", once: true },
      });

      // Banner height depends on the image's natural size, so re-measure once it has loaded
      const imgs = el.querySelectorAll<HTMLImageElement>(".ev-banner-img");
      imgs.forEach((img) => img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true }));
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="events"
      className="gsap-section section-pad scroll-mt-24 relative isolate"
      aria-labelledby="events-title"
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
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="mb-5 inline-block bg-[#4285f4] px-2 py-1 text-[13px] text-white">03 / Get together</span>
            <h2 id="events-title" className="display text-5xl font-semibold md:text-7xl">
              Events &amp;<br />experiences.
            </h2>
          </div>
          <p className="max-w-[310px] text-sm leading-6 text-[var(--muted)]">
            A place for confirmed chapter gatherings, workshops, and moments worth sharing.
          </p>
        </div>

        <div className="grid gap-8">
          {events.map((ev) => (
            <article key={ev.id} className="ev-card group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl">
              <Banner src={ev.banner} title={ev.title} status={ev.status} />

              <div className="grid gap-8 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:p-9">
                <div className="ev-date flex w-[96px] shrink-0 flex-col items-center overflow-hidden rounded-xl border border-black/10 text-center">
                  <span className="w-full bg-[#e5402f] py-1 text-[11px] font-bold text-white">{ev.month}</span>
                  <span className="display pt-2 text-5xl font-semibold leading-none">{ev.day}</span>
                  <span className="pb-2 pt-1 text-xs text-[var(--muted)]">{ev.year}</span>
                </div>

                <div className="ev-text">
                  <span className="inline-block rounded-full bg-[#f5b916] px-3 py-1 text-[11px] font-bold text-black">{ev.tag}</span>
                  <h3 className="display mt-4 text-3xl font-semibold leading-tight md:text-4xl">{ev.title}</h3>
                  <p className="mt-3 max-w-[560px] text-sm leading-7 text-[var(--muted)]">{ev.description}</p>
                </div>

                <div className="flex flex-col gap-4 md:items-end">
                  <div className="ev-meta flex items-center gap-3 text-sm">
                    <CalendarDays size={18} className="text-[#4285f4]" aria-hidden="true" />
                    <span>{ev.day} {ev.month} {ev.year}</span>
                  </div>
                  <div className="ev-meta flex items-center gap-3 text-sm">
                    <Clock size={18} className="text-[#34a853]" aria-hidden="true" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="ev-meta flex items-center gap-3 text-sm">
                    <MapPin size={18} className="text-[#e5402f]" aria-hidden="true" />
                    <span>{ev.venue}</span>
                  </div>
                  <a href={ev.link} target="_blank" rel="noreferrer" className="ev-cta button-primary mt-2 w-fit">
                    {ev.cta} <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="ev-empty mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-black/20 bg-white/35 p-6 sm:flex-row sm:items-center">
          <p className="text-sm text-[var(--muted)]">More events will be listed here once dates and registrations are confirmed.</p>
          <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="button-secondary shrink-0">
            Follow chapter updates <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
