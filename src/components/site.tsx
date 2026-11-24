"use client";

import { ArrowUpRight, Github, Layers3, Menu, X, Users } from "lucide-react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, HoverLift } from "./motion";
import { PlaygroundSection } from "./playground-section";
import { EventsSection } from "./events-section";
import { ExperienceSection } from "./experience-section";
import { DevSparkSection } from "./devspark-section";
import { MemoriesSection } from "./memories-section";
import { PeopleSection } from "./people-section";
import { AboutSection } from "./about-section";
import { FaqSection } from "./faq-section";
import { NextStepSection } from "./next-step-section";

const COMMUNITY_URL = "https://gdg.community.dev/gdg-on-campus-sarala-birla-university-ranchi-india/";

const domains = [
  { no: "01", title: "Artificial intelligence", description: "From curious experiments to useful things powered by AI.", tag: "AI / ML", color: "#f4772b" },
  { no: "02", title: "Web & product", description: "Designing and building thoughtful experiences for the web.", tag: "WEB", color: "#4285f4" },
  { no: "03", title: "Cloud & platforms", description: "Understanding the infrastructure that helps ideas scale.", tag: "CLOUD", color: "#34a853" },
  { no: "04", title: "Open source", description: "Learning in public, contributing together, shipping better.", tag: "COMMUNITY", color: "#f6b94a" },
];

const nav = [["About", "#about"], ["Events", "#events"], ["Projects", "#explore"], ["Community", "#community"], ["FAQ", "#faq"]];

function Mark() {
  return (
    <img
      src="/gdg-official-logo.png"
      alt="Google Developer Groups On Campus · Sarala Birla University"
      className="h-[58px] w-[136px] object-contain"
      width={208}
      height={104}
    />
  );
}

export function Site() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero.fromTo(".gsap-hero-item",
        { y: 34, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.05, stagger: 0.13, clearProps: "filter" }
      );
      gsap.fromTo(".gsap-float-word",
        { y: 48, x: (index) => index === 0 ? -34 : 34, opacity: 0, rotate: (index) => index === 0 ? -8 : 8 },
        { y: 0, x: 0, opacity: 1, rotate: 0, duration: 1.25, delay: 0.45, stagger: 0.16, ease: "back.out(1.5)" }
      );
      gsap.to(".hero-float-note", {
        y: (index) => index === 0 ? -12 : 12,
        duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.7,
      });
      gsap.utils.toArray<HTMLElement>(".gsap-fly-in").forEach((item, index) => {
        gsap.fromTo(item, { x: index % 2 === 0 ? -42 : 42, y: 22, opacity: 0, rotate: index % 2 === 0 ? -2 : 2 }, {
          x: 0, y: 0, opacity: 1, rotate: 0, duration: 0.95, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
      gsap.to(".hero-orb", {
        y: -24, x: 18, scale: 1.06, duration: 5.5, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });
      gsap.utils.toArray<HTMLElement>(".gsap-section").slice(1).forEach((section) => {
        gsap.fromTo(section, { y: 44, opacity: 0.55, scale: 0.985 }, {
          y: 0, opacity: 1, scale: 1, duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 86%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".motion-card").forEach((card) => {
        const hover = gsap.to(card, { y: -7, rotateX: 2, duration: 0.3, ease: "power2.out", paused: true });
        card.addEventListener("mouseenter", () => hover.play());
        card.addEventListener("mouseleave", () => hover.reverse());
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="overflow-x-clip">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="gdg-nav sticky top-0 z-30 !border-transparent !bg-transparent !shadow-none !backdrop-blur-none">
        <div className="container flex h-[76px] items-center justify-between">
          <a href="#" className="flex items-center" aria-label="GDG SBU home"><Mark /></a>
          <nav
            className="hidden items-center gap-1 rounded-full border border-white/60 bg-white/40 p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-xl backdrop-saturate-150 lg:flex"
            aria-label="Main navigation"
          >
            {nav.map(([label, href]) => <a key={label} href={href} className="rounded-full px-4 py-2.5 text-[12px] font-semibold text-[var(--ink)]/70 transition-all hover:bg-white/70 hover:text-[var(--ink)] hover:shadow-sm">{label}</a>)}
            <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="button-primary ml-1 !rounded-full !px-5 !py-2.5">Join the community <ArrowUpRight size={14} /></a>
          </nav>
          <button className="grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/40 shadow-[0_8px_24px_-8px_rgba(0,0,0,.25)] backdrop-blur-xl lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {menuOpen && <nav aria-label="Mobile navigation" className="container lg:hidden"><div className="grid gap-1 rounded-3xl border border-white/60 bg-white/50 p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-xl backdrop-saturate-150">{nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="rounded-full px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/70">{label}</a>)}<a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="button-primary mt-1 !justify-center !rounded-full">Join the community <ArrowUpRight size={14} /></a></div></nav>}
      </header>

      <div id="main-content" />
      <section className="gsap-section hero-landscape-section" aria-labelledby="hero-title">
        <img
          className="hero-landscape-art"
          src="/illustrations/Snowy%20Campus%20Sunset%20Landscape.png"
          alt="Illustrated Jharkhand landscape featuring the Sarala Birla University campus"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">GDG on Campus</h1>
          <p className="hero-university">Sarala Birla University</p>
          <div className="hero-actions">
            <a href="#events" className="button-primary">Explore Events <ArrowUpRight size={15} /></a>
            <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="button-secondary"><Users size={15} /> Join the Community</a>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-black/10 py-4" aria-label="Make things. Break things. Learn things. Repeat."><div className="marquee flex w-max gap-8 text-[11px] font-bold tracking-[.18em] text-[var(--muted)]">{Array.from({ length: 4 }, (_, i) => <span key={i} className="flex items-center gap-8">MAKE THINGS <span className="text-[var(--blue)]">✳</span> BREAK THINGS (ON PURPOSE) <span className="text-[var(--green)]">✳</span> LEARN LOUDLY <span className="text-[var(--orange)]">✳</span> SHARE THE CREDIT <span className="text-[#b38b00]">✳</span> REPEAT. <span className="text-[var(--blue)]">✳</span> NO GATEKEEPING. NO GURU ENERGY.</span>)}</div></div>

      <AboutSection />

      <PlaygroundSection />

      <EventsSection />

      <ExperienceSection />

      <section id="tracks" className="gsap-section section-pad scroll-mt-24 bg-[var(--ink)] text-[var(--paper)]">
        <div className="container">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-5 text-[var(--amber)]">05 / Explore the stack</p><h2 className="display text-5xl font-semibold md:text-7xl">Different paths.<br/>One community.</h2></div><p className="max-w-[320px] text-sm leading-6 text-white/55">A snapshot of areas our community can explore. These are interest areas, not a published event track or promised curriculum.</p></div>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {[
              ["01","AI, data & intelligence","Experiment with machine learning, generative AI and data-powered ideas.","#f4772b"],
              ["02","Web, apps & product","Design and develop useful digital experiences from interface to backend.","#4285f4"],
              ["03","Cloud, systems & open source","Understand the platforms behind modern software and learn by contributing.","#34a853"]
            ].map(([n,t,d,c],i)=><Reveal key={n} delay={i*.07}><article className="grid gap-4 py-7 md:grid-cols-[80px_1fr_1.1fr] md:items-center"><span className="eyebrow text-white/40">{n}</span><h3 className="display text-2xl font-semibold md:text-3xl">{t}</h3><div className="flex items-start gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{background:c}}/><p className="max-w-[430px] text-sm leading-6 text-white/55">{d}</p></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <DevSparkSection communityUrl={COMMUNITY_URL} />

      <MemoriesSection />

      <PeopleSection communityUrl={COMMUNITY_URL} />

      <FaqSection communityUrl={COMMUNITY_URL} />

      <NextStepSection communityUrl={COMMUNITY_URL} />

      <footer className="container py-9">
        <div className="flex flex-col justify-between gap-6 border-t border-black/10 pt-7 sm:flex-row sm:items-center"><a href="#" className="flex items-center" aria-label="GDG SBU home"><Mark /></a><p className="text-[11px] text-[var(--muted)]">Made with curiosity in Ranchi, Jharkhand. Debugging is a group activity.</p><div className="flex gap-4"><a className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]" href="https://github.com/Rishi-Raj25/GDG-SBU" aria-label="GitHub"><Github size={17} /></a><a className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]" href={COMMUNITY_URL} target="_blank" rel="noreferrer" aria-label="GDG Community"><Layers3 size={17} /></a></div></div>
      </footer>
    </main>
  );
}