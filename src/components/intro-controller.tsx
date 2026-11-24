"use client";

import { useEffect, useState } from "react";

const BLUE = "#4285F4";
const RED = "#EA4335";
const YELLOW = "#FBBC05";
const GREEN = "#34A853";

const INTRO_KEY = "gdg-sbu-intro-seen";
const EXIT_AT = 3900; // ms – when the overlay starts fading out
const END_AT = 4500; // ms – when the intro is fully removed

/* ------------------------------------------------------------------ */
/*  Google "G" – four coloured pieces that fly in and assemble         */
/* ------------------------------------------------------------------ */
function GoogleG() {
  return (
    <svg className="gil-g" viewBox="0 0 48 48" role="img" aria-label="Google G">
      <g className="gil-piece" style={{ ["--fx" as string]: "0px", ["--fy" as string]: "-26px", ["--fr" as string]: "-90deg", animationDelay: "0.1s" }}>
        <path fill={RED} d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      </g>
      <g className="gil-piece" style={{ ["--fx" as string]: "26px", ["--fy" as string]: "0px", ["--fr" as string]: "90deg", animationDelay: "0.25s" }}>
        <path fill={BLUE} d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      </g>
      <g className="gil-piece" style={{ ["--fx" as string]: "-26px", ["--fy" as string]: "0px", ["--fr" as string]: "-90deg", animationDelay: "0.4s" }}>
        <path fill={YELLOW} d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      </g>
      <g className="gil-piece" style={{ ["--fx" as string]: "0px", ["--fy" as string]: "26px", ["--fr" as string]: "90deg", animationDelay: "0.55s" }}>
        <path fill={GREEN} d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </g>
    </svg>
  );
}

/* Letters that rise in one by one */
function Letters({
  text,
  start,
  step,
  className = "",
}: {
  text: string;
  start: number;
  step: number;
  className?: string;
}) {
  let n = 0;
  return (
    <span className={`gil-line ${className}`} aria-hidden="true">
      {Array.from(text).map((ch, i) => {
        if (ch === " ") return <span key={i} className="gil-space" />;
        const idx = n++;
        return (
          <span
            key={i}
            className="gil-letter"
            style={{ animationDelay: `${start + idx * step}s` }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles (self-contained)                                            */
/* ------------------------------------------------------------------ */
const CSS = `
.gil-overlay{
  position:fixed; inset:0; z-index:100;
  display:flex; align-items:center; justify-content:center;
  background:#fff; overflow:hidden;
  font-family:"Google Sans","Product Sans","Poppins","Segoe UI",Arial,sans-serif;
}
.gil-overlay--exit{ animation:gil-exit .6s cubic-bezier(.65,0,.35,1) forwards; pointer-events:none; }
@keyframes gil-exit{ to{ opacity:0; transform:scale(1.04); } }

/* soft Google-coloured blobs */
.gil-blob{ position:absolute; width:46vmax; height:46vmax; border-radius:50%; filter:blur(80px); opacity:0; animation:gil-blob-in 1.4s ease forwards, gil-blob-float 7s ease-in-out infinite alternate; }
.gil-blob--b{ background:${BLUE}; top:-22vmax; left:-18vmax; opacity:0; animation-delay:.1s,.1s; }
.gil-blob--r{ background:${RED}; top:-20vmax; right:-20vmax; animation-delay:.3s,.3s; }
.gil-blob--y{ background:${YELLOW}; bottom:-24vmax; left:-14vmax; animation-delay:.5s,.5s; }
.gil-blob--g{ background:${GREEN}; bottom:-22vmax; right:-16vmax; animation-delay:.7s,.7s; }
@keyframes gil-blob-in{ to{ opacity:.16; } }
@keyframes gil-blob-float{ from{ transform:translate(0,0) scale(1);} to{ transform:translate(3vmax,2vmax) scale(1.08);} }

/* top bar */
.gil-top{ position:absolute; top:0; left:0; right:0; display:flex; justify-content:flex-end; padding:20px 24px; }
.gil-skip{
  border:1px solid rgba(0,0,0,.25); background:rgba(255,255,255,.7); backdrop-filter:blur(8px);
  color:#000; font:600 12px/1 inherit; font-family:inherit; letter-spacing:.04em;
  padding:10px 16px; border-radius:999px; cursor:pointer; transition:background .2s, transform .2s;
  opacity:0; animation:gil-fade .5s ease .6s forwards;
}
.gil-skip:hover{ background:#fff; transform:translateY(-1px); }

/* main row: G + text */
.gil-row{ position:relative; display:flex; align-items:center; justify-content:center; padding:0 16px; }

.gil-g{
  width:clamp(52px, 12vw, 88px); height:clamp(52px, 12vw, 88px); flex:none; overflow:visible;
  animation:gil-g-pop .6s cubic-bezier(.34,1.56,.64,1) 1.05s both;
}
.gil-piece{
  transform-box:fill-box; transform-origin:center; opacity:0;
  animation:gil-piece-in .8s cubic-bezier(.34,1.4,.64,1) forwards;
}
@keyframes gil-piece-in{
  0%{ opacity:0; transform:translate(var(--fx),var(--fy)) rotate(var(--fr)) scale(.2); }
  55%{ opacity:1; }
  100%{ opacity:1; transform:none; }
}
@keyframes gil-g-pop{ 0%{ transform:scale(1);} 50%{ transform:scale(1.14) rotate(-6deg);} 100%{ transform:scale(1) rotate(0);} }

/* text expands from the G – so the G slides to the left */
.gil-text{
  max-width:0; opacity:0; overflow:hidden; white-space:nowrap;
  padding:.12em 0 .18em;
  color:#000;
  animation:gil-expand .95s cubic-bezier(.22,1,.36,1) 1.25s forwards;
}
@keyframes gil-expand{
  from{ max-width:0; opacity:0; margin-left:0; }
  to{ max-width:30rem; opacity:1; margin-left:clamp(10px,2vw,20px); }
}
.gil-line{ display:block; white-space:nowrap; color:#000; }
.gil-title{ font-size:clamp(1.6rem, 6vw, 2.75rem); font-weight:700; letter-spacing:.03em; line-height:1.1; }
.gil-sub{ margin-top:.55em; font-size:clamp(.6rem, 2.2vw, .9rem); font-weight:600; letter-spacing:.26em; }

.gil-letter{ display:inline-block; color:#000; opacity:0; transform:translateY(110%) scale(.8); animation:gil-letter-in .55s cubic-bezier(.34,1.56,.64,1) forwards; }
.gil-space{ display:inline-block; width:.3em; }
@keyframes gil-letter-in{ to{ opacity:1; transform:none; } }

/* bottom words */
.gil-bottom{
  position:absolute; bottom:28px; left:0; right:0; display:flex; justify-content:center; gap:22px;
  font-size:11px; font-weight:700; letter-spacing:.28em; color:#000;
}
.gil-bottom span{ display:flex; align-items:center; gap:8px; opacity:0; animation:gil-fade .5s ease forwards; }
.gil-bottom i{ width:7px; height:7px; border-radius:50%; display:inline-block; }
@keyframes gil-fade{ to{ opacity:1; } }

/* 4-colour loading bar */
.gil-bar{ position:absolute; left:0; right:0; bottom:0; height:4px; display:flex; }
.gil-bar span{ flex:1; transform:scaleX(0); transform-origin:left; animation:gil-fill .85s cubic-bezier(.4,0,.2,1) forwards; }
@keyframes gil-fill{ to{ transform:scaleX(1); } }

@media (max-width:480px){
  .gil-bottom{ gap:14px; font-size:10px; letter-spacing:.2em; }
}
`;

/* ------------------------------------------------------------------ */
/*  Controller                                                         */
/* ------------------------------------------------------------------ */
export function IntroController() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(false);
  const [exiting, setExiting] = useState(false);

  // decide whether to show the intro
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen: string | null = null;
    try {
      seen = window.sessionStorage.getItem(INTRO_KEY);
    } catch {}
    if (!seen && !reduced) setVisible(true);
    else setProgress(true);
  }, []);

  const finishIntro = () => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setVisible(false);
    setProgress(true);
  };

  // timeline: fade out, then remove (also lock page scroll while visible)
  useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t1 = window.setTimeout(() => setExiting(true), EXIT_AT);
    const t2 = window.setTimeout(finishIntro, END_AT);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const skip = () => finishIntro();

  return (
    <>
      {visible && (
        <div
          className={`gil-overlay${exiting ? " gil-overlay--exit" : ""}`}
          role="status"
          aria-label="GDG on Campus, Sarala Birla University – loading"
        >
          <style dangerouslySetInnerHTML={{ __html: CSS }} />

          {/* ambient Google-colour glow */}
          <span className="gil-blob gil-blob--b" />
          <span className="gil-blob gil-blob--r" />
          <span className="gil-blob gil-blob--y" />
          <span className="gil-blob gil-blob--g" />

          <div className="gil-top">
            <button onClick={skip} className="gil-skip">
              Skip intro ↗
            </button>
          </div>

          <div className="gil-row">
            <GoogleG />
            <div className="gil-text">
              <Letters className="gil-title" text="GDG ON CAMPUS" start={1.55} step={0.05} />
              <Letters className="gil-sub" text="SARALA BIRLA UNIVERSITY" start={2.0} step={0.03} />
            </div>
          </div>

          <div className="gil-bottom" aria-hidden="true">
            <span style={{ animationDelay: "2.6s" }}><i style={{ background: BLUE }} />LEARN</span>
            <span style={{ animationDelay: "2.8s" }}><i style={{ background: RED }} />BUILD</span>
            <span style={{ animationDelay: "3.0s" }}><i style={{ background: GREEN }} />SHARE</span>
          </div>

          <div className="gil-bar" aria-hidden="true">
            <span style={{ background: BLUE, animationDelay: "0.2s" }} />
            <span style={{ background: RED, animationDelay: "1.05s" }} />
            <span style={{ background: YELLOW, animationDelay: "1.9s" }} />
            <span style={{ background: GREEN, animationDelay: "2.75s" }} />
          </div>
        </div>
      )}
      <div className={progress ? "intro-progress intro-progress--ready" : "intro-progress"} />
    </>
  );
}