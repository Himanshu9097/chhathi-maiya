"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px) hover: none").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    
    if (!cursorDot || !cursorRing) return;

    // Fast tracking dot
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
      // Trailing ring
      gsap.to(cursorRing, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    // Expand on hover
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, input, [role="button"]')) {
        gsap.to(cursorRing, { scale: 1.8, backgroundColor: "rgba(255,255,255,0.2)", duration: 0.3, ease: "power2.out" });
        gsap.to(cursorDot, { scale: 0, opacity: 0, duration: 0.2 });
      } else {
        gsap.to(cursorRing, { scale: 1, backgroundColor: "rgba(255,255,255,0.05)", duration: 0.3, ease: "power2.out" });
        gsap.to(cursorDot, { scale: 1, opacity: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        id="cursor-dot"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      <div
        id="cursor-ring"
        className="pointer-events-none fixed left-0 top-0 z-[99] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/5 backdrop-blur-[2px]"
      />
    </>
  );
}
