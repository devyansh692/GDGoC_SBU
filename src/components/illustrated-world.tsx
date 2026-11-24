"use client";

import { useEffect } from "react";

export function IllustratedWorld() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        items.forEach((item) => {
          const speed = Number(item.dataset.parallax || 0.04);
          item.style.setProperty("--parallax-y", `${y * speed}px`);
        });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className="jharkhand-flow" aria-hidden="true">
      <img className="flow-river flow-river--one" src="/illustrations/forest-river.svg" alt="" data-parallax="0.035" />
      <img className="flow-branch flow-branch--left" src="/illustrations/sal-branch.svg" alt="" data-parallax="0.075" />
      <img className="flow-river flow-river--two" src="/illustrations/forest-river.svg" alt="" data-parallax="0.025" />
      <img className="flow-branch flow-branch--right" src="/illustrations/sal-branch.svg" alt="" data-parallax="0.055" />
      <img className="flow-river flow-river--three" src="/illustrations/forest-river.svg" alt="" data-parallax="0.03" />
    </div>
  );
}
