"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "chapter-01", num: "01", title: "नहाय-खाय" },
  { id: "chapter-02", num: "02", title: "खरना" },
  { id: "chapter-03", num: "03", title: "संध्या" },
  { id: "night-kosi", num: "04", title: "कोसी" },
];

export default function ChapterIndicator() {
  const [activeId, setActiveId] = useState<string>("chapter-01");

  useEffect(() => {
    const handleScroll = () => {
      // Find the chapter currently most visible in viewport
      let closestId = activeId;
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      CHAPTERS.forEach((ch) => {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - elementCenter);
          // If the element's top is past center but bottom hasn't passed it
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            closestId = ch.id;
            minDistance = -1; // Exact match
          } else if (distance < minDistance && minDistance !== -1) {
            closestId = ch.id;
            minDistance = distance;
          }
        }
      });

      if (closestId !== activeId) {
        setActiveId(closestId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 mix-blend-difference pointer-events-auto">
      {CHAPTERS.map((ch) => {
        const isActive = activeId === ch.id;
        return (
          <button
            key={ch.id}
            onClick={() => scrollTo(ch.id)}
            className="group flex flex-col items-end gap-1 text-right transition-all duration-500"
          >
            <span
              className={`font-sans text-xs tracking-widest transition-all duration-500 ${
                isActive ? "text-brand-offwhite opacity-100" : "text-brand-offwhite opacity-30 group-hover:opacity-60"
              }`}
            >
              {ch.num}
            </span>
            <span
              className={`font-devanagari text-sm tracking-wide transition-all duration-500 ${
                isActive
                  ? "text-brand-offwhite opacity-100 translate-x-0"
                  : "text-brand-offwhite opacity-0 translate-x-4 pointer-events-none group-hover:opacity-40 group-hover:translate-x-2"
              }`}
            >
              {ch.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
