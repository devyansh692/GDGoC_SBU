"use client";

import { ArrowUpRight, ChevronDown, GraduationCap, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./motion";

/* ------------------------------------------------------------------ */
/*  DATA – edit names / photos here                                    */
/*  Put PNGs in /public/team/ and set `photo`, e.g. "/team/nitika.png" */
/* ------------------------------------------------------------------ */

type Person = { name: string; program?: string; role: string; photo?: string };
type Team = { no: string; title: string; color: string; lead: Person; co: Person };

// Every person tile uses this width on desktop so all tiles match
const TILE_W = "md:w-[250px]";

const BLUE = "#4285f4";
const RED = "#ea4335";
const YELLOW = "#f6b94a";
const GREEN = "#34a853";
const ORANGE = "#f4772b";

// Row 0 – Faculty Coordinator (single tile)
const facultyCoordinator: Person & { color: string } = {
  name: "Dr. Dipti Kumari", // <- edit
  program: "Assistant Professor, CSE Department", // <- edit
  role: "Faculty Coordinator GDG On Campus SBU", // <- edit
  color: RED,
  photo: "/team/faculty-coordinator.png",
};

// Row 1 – the organizers
const organizers: (Person & { color: string; tag: string })[] = [
  { name: "Aishwarya", program: "GDG on Campus", role: "Organizer", tag: "SBU", color: BLUE, photo: "/team/university-organizer.png" },
  { name: "Riddhi Kumari", program: "GDG on Campus", role: "Organizer", tag: "GDG", color: RED, photo: "/team/gdg-organizer.png" },
  { name: "Abhishhek Kumar Verma", program: "GDG on Campus", role: "Organizer", tag: "GDG", color: YELLOW, photo: "/team/organizer-3.png" },
];

// Row 2 – Tech team
const techTeam: Team = {
  no: "01",
  title: "Tech Team",
  color: GREEN,
  lead: { name: "Devyansh Mandal", program: "BCA – V", role: "Tech Team Lead", photo: "/team/tech-lead.png" },
  co: { name: "Rishi Raj", program: "BCA – III", role: "Tech Team Co-Lead", photo: "/team/tech-colead.png" },
};

// Shown after "View all members"
const teams: Team[] = [
  {
    no: "02", title: "Design Team", color: ORANGE,
    lead: { name: "Nitika Dolai", program: "MCA – I", role: "Lead", photo: "/team/nitika-dolai.png" },
    co: { name: "Ashish Kumar", program: "B.Tech – III", role: "Co-Lead", photo: "/team/ashish-kumar.png" },
  },
  {
    no: "03", title: "Social Media Team", color: BLUE,
    lead: { name: "Ayush Ranjan", program: "Nursing – III", role: "Lead", photo: "/team/ayush-ranjan.png" },
    co: { name: "Priyanka Pramanik", program: "MCA – I", role: "Co-Lead", photo: "/team/priyanka-pramanik.png" },
  },
  {
    no: "04", title: "Outreach & Sponsorship", color: YELLOW,
    lead: { name: "Aditi", program: "MCA – I", role: "Lead", photo: "/team/aditi.png" },
    co: { name: "Kshitiz Kumar", program: "B.Tech – III", role: "Co-Lead", photo: "/team/kshitiz-kumar.png" },
  },
  {
    no: "05", title: "Event Management", color: RED,
    lead: { name: "Ankur Kr. Pandey", program: "Diploma – V", role: "Lead", photo: "/team/ankur-pandey.png" },
    co: { name: "Mishabh Fatma", program: "MCA – I", role: "Co-Lead", photo: "/team/mishabh-fatma.png" },
  },
  {
    no: "06", title: "Discipline Team", color: GREEN,
    lead: { name: "Pushpak Ladia", program: "B.Tech – V", role: "Lead", photo: "/team/pushpak-ladia.png" },
    co: { name: "Rounak Kumar", program: "B.Tech – I", role: "Co-Lead", photo: "/team/rounak-kumar.png" },
  },
  {
    no: "07", title: "Content & Report Writing", color: BLUE,
    lead: { name: "Mahwish Firdaus", program: "B.Tech – V", role: "Lead", photo: "/team/mahwish-firdaus.png" },
    co: { name: "Tannu Singh", program: "BCA – III", role: "Co-Lead", photo: "/team/tannu-singh.png" },
  },
  {
    no: "08", title: "Video Editing Team", color: ORANGE,
    lead: { name: "Shreyas Raj", program: "B.Tech – V", role: "Lead", photo: "/team/shreyas-raj.png" },
    co: { name: "Vishal Kumar", program: "BCA – III", role: "Co-Lead", photo: "/team/vishal-kumar.png" },
  },
];

const volunteers: Person[] = [
  { name: "Tarun Singh", program: "BCA – III", role: "Volunteer", photo: "/team/tarun-singh.png" },
  { name: "Ayush Kr. Mahato", program: "BCA – III", role: "Volunteer", photo: "/team/ayush-mahato.png" },
  { name: "Shourya Kumar", program: "B.Tech – I", role: "Volunteer", photo: "/team/shourya-kumar.png" },
  { name: "Ekta Kumari", program: "B.Tech – V", role: "Volunteer", photo: "/team/ekta-kumari.png" },
  { name: "Satyam Dubey", program: "B.Tech – III", role: "Volunteer", photo: "/team/satyam-dubey.png" },
];

/* ------------------------------------------------------------------ */
/*  UI pieces                                                          */
/* ------------------------------------------------------------------ */

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

/**
 * "Sticker" effect for transparent PNGs. drop-shadow() follows the alpha
 * channel, so the filters hug the person's outline instead of the box.
 *  1) thick white outline (4 offsets = a solid stroke all the way round)
 *  2) thin coloured ring outside the white stroke
 *  3) soft coloured glow
 *  4) deep ground shadow for depth
 */
function stickerFilter(color: string, stroke: number) {
  const s = stroke;
  return [
    `drop-shadow(${s}px 0 0 #fff)`,
    `drop-shadow(-${s}px 0 0 #fff)`,
    `drop-shadow(0 ${s}px 0 #fff)`,
    `drop-shadow(0 -${s}px 0 #fff)`,
    `drop-shadow(0 0 1px ${color})`,
    `drop-shadow(0 0 10px ${color}66)`,
    `drop-shadow(0 14px 14px rgba(0,0,0,.38))`,
  ].join(" ");
}

function Photo({
  person,
  color,
  className = "",
  stroke = 3,
}: {
  person: Person;
  color: string;
  className?: string;
  stroke?: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(145deg, ${color}26, ${color}0d 60%, transparent)`,
        boxShadow: `inset 0 0 0 1.5px ${color}55, inset 0 -30px 40px -20px ${color}33`,
      }}
    >
      {/* Google-style decorative shapes */}
      <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-25 transition-transform duration-500 group-hover:scale-125" style={{ background: color }} />
      <span className="absolute -bottom-5 -left-5 h-16 w-16 rotate-12 rounded-2xl opacity-15 transition-transform duration-500 group-hover:rotate-45" style={{ background: color }} />

      {/* soft contact shadow under the person */}
      <span
        aria-hidden
        className="absolute bottom-1 left-1/2 z-[5] h-4 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/30 blur-md transition-all duration-500 group-hover:w-[85%] group-hover:bg-black/40"
      />

      {person.photo && !failed ? (
        <img
          src={person.photo}
          alt={person.name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="relative z-10 h-full w-full object-cover object-top transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
          style={{ filter: stickerFilter(color, stroke) }}
        />
      ) : (
        <div className="relative z-10 grid h-full w-full place-items-center">
          <span className="display text-5xl font-semibold" style={{ color }}>{initials(person.name)}</span>
        </div>
      )}
    </div>
  );
}

function PersonTile({ person, color }: { person: Person; color: string }) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border bg-white/70 p-3 backdrop-blur transition-all duration-300 hover:-translate-y-1.5"
      style={{
        borderColor: `${color}55`,
        boxShadow: `0 1px 0 rgba(0,0,0,.04), 0 12px 28px -14px ${color}88, 0 4px 10px -4px rgba(0,0,0,.18)`,
      }}
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: color }} />
      <Photo person={person} color={color} className="aspect-[4/4.6] rounded-2xl" />
      <div className="px-2 pb-2 pt-4">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em]"
          style={{ background: `${color}1f`, color: color === YELLOW ? "#8a6a00" : color }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
          {person.role}
        </span>
        <h4 className="display mt-3 text-lg font-semibold leading-tight">{person.name}</h4>
        {person.program && <p className="mt-1 text-xs font-medium text-[var(--muted)]">{person.program}</p>}
      </div>
    </article>
  );
}

function TeamBlock({ team }: { team: Team }) {
  return (
    <div
      className="rounded-[28px] border bg-white/40 p-4 md:p-5"
      style={{ borderColor: `${team.color}40`, boxShadow: `0 18px 40px -26px ${team.color}99` }}
    >
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold text-white shadow-md" style={{ background: team.color }}>{team.no}</span>
          <h3 className="display text-xl font-semibold md:text-2xl">{team.title}</h3>
        </div>
        <span className="hidden h-px flex-1 bg-black/10 sm:ml-5 sm:block" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:flex md:justify-center md:gap-4">
        <div className={TILE_W}><PersonTile person={team.lead} color={team.color} /></div>
        <div className={TILE_W}><PersonTile person={team.co} color={team.color} /></div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function PeopleSection({ communityUrl }: { communityUrl: string }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="organizers" className="gsap-section section-pad relative scroll-mt-24 overflow-hidden bg-[var(--paper-deep)]">
      {/* ambient Google-colour glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: BLUE }} />
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: YELLOW }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: GREEN }} />
      </div>

      <div className="container relative">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <p className="eyebrow mb-5 text-[var(--orange)]">08 / The people</p>
              <h2 className="display text-5xl font-semibold md:text-7xl">
                Good things<br />are built together.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[340px] text-sm leading-7 text-[var(--muted)]">
              The students and mentors who keep GDG on Campus at SBU curious, loud and welcoming — one meetup at a time.
            </p>
          </Reveal>
        </div>

        {/* Row 0 – faculty coordinator */}
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <GraduationCap size={16} className="text-[var(--orange)]" />
            <h3 className="text-[11px] font-bold uppercase tracking-[.2em] text-[var(--muted)]">Faculty Coordinator</h3>
            <span className="h-px flex-1 bg-black/10" />
          </div>
        </Reveal>
        <div className="flex justify-center">
          {/* col-span trick: on mobile the tile takes half width, centered */}
          <div className={`w-1/2 ${TILE_W}`}>
            <Reveal>
              <PersonTile person={facultyCoordinator} color={facultyCoordinator.color} />
            </Reveal>
          </div>
        </div>

        {/* Row 1 – organizers */}
        <Reveal>
          <div className="mb-4 mt-12 flex items-center gap-3">
            <Sparkles size={16} className="text-[var(--orange)]" />
            <h3 className="text-[11px] font-bold uppercase tracking-[.2em] text-[var(--muted)]">Organizers</h3>
            <span className="h-px flex-1 bg-black/10" />
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:flex md:justify-center md:gap-6">
          {organizers.map((o, i) => (
            <div key={i} className={TILE_W}>
              <Reveal delay={i * 0.08}>
                <PersonTile person={o} color={o.color} />
              </Reveal>
            </div>
          ))}
        </div>

        {/* Row 2 – tech team */}
        <Reveal>
          <div className="mb-4 mt-12 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full" style={{ background: GREEN }} />
            <h3 className="text-[11px] font-bold uppercase tracking-[.2em] text-[var(--muted)]">{techTeam.title}</h3>
            <span className="h-px flex-1 bg-black/10" />
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:flex md:justify-center md:gap-6">
          <div className={TILE_W}><Reveal><PersonTile person={techTeam.lead} color={techTeam.color} /></Reveal></div>
          <div className={TILE_W}><Reveal delay={0.08}><PersonTile person={techTeam.co} color={techTeam.color} /></Reveal></div>
        </div>

        {/* View all toggle */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="all-members"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-7 py-4 text-sm font-bold text-[var(--paper)] shadow-[0_14px_30px_-12px_rgba(0,0,0,.5)] transition-transform hover:-translate-y-0.5"
          >
            <Users size={16} />
            {showAll ? "Show fewer members" : "View all members"}
            <ChevronDown size={16} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Expanded content */}
        <div
          id="all-members"
          className={`grid transition-all duration-700 ease-out ${showAll ? "mt-12 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            {/* padding so card shadows aren't clipped by overflow-hidden */}
            <div className="-m-3 p-3">
              <div className="grid gap-5 xl:grid-cols-2">
                {teams.map((t) => <TeamBlock key={t.no} team={t} />)}
              </div>

              {/* Volunteers */}
              <div className="mt-8 rounded-[28px] border border-white/10 bg-[var(--ink)] p-5 text-[var(--paper)] shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)] md:p-8">
                <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="eyebrow mb-3 text-[var(--amber)]">🤝 Volunteers</p>
                    <h3 className="display text-3xl font-semibold md:text-4xl">Our newly selected volunteers</h3>
                  </div>
                  <p className="max-w-[300px] text-sm leading-6 text-white/55">We also welcome the new faces joining the chapter this year.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {volunteers.map((v, i) => {
                    const c = [BLUE, RED, YELLOW, GREEN, ORANGE][i % 5];
                    return (
                      <article
                        key={v.name}
                        className="group rounded-2xl border bg-white/[.06] p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                        style={{ borderColor: `${c}55`, boxShadow: `0 12px 24px -14px ${c}aa` }}
                      >
                        <Photo person={v} color={c} stroke={2} className="aspect-square rounded-xl" />
                        <div className="px-1 pb-1 pt-3">
                          <h4 className="text-sm font-semibold leading-tight">{v.name}</h4>
                          <p className="mt-0.5 text-[11px] text-white/55">{v.program}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <a href={communityUrl} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 text-sm font-bold">
            Visit the official chapter page <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}