"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface VideoScrubChapterProps {
  id: string;
  videoSrc: string;
  texts: { text: string; start: number; end: number; className?: string }[];
  isNightMode?: boolean;
}

export default function VideoScrubChapter({
  id,
  videoSrc,
  texts,
  isNightMode = false,
}: VideoScrubChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !videoRef.current) return;

    const video = videoRef.current;
    
    // Ensure video metadata is loaded before creating scroll trigger
    const createScrub = () => {
      if (isNaN(video.duration) || video.duration === 0) return;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });

      // Animate video current time
      tl.to(video, {
        currentTime: video.duration,
        ease: "none",
      });

      // Text animations
      texts.forEach((txt, index) => {
        gsap.set(`.text-${id}-${index}`, { opacity: 0, y: 30 });
        
        gsap.to(`.text-${id}-${index}`, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${txt.start * 100}% center`,
            end: `${txt.end * 100}% center`,
            scrub: true,
          },
          keyframes: {
            "0%": { opacity: 0, y: 30, ease: "power2.out" },
            "20%": { opacity: 1, y: 0, ease: "none" },
            "80%": { opacity: 1, y: 0, ease: "power2.in" },
            "100%": { opacity: 0, y: -30, ease: "none" }
          }
        });
      });
      
      // If it's night mode, trigger global variable changes
      if (isNightMode) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => document.documentElement.style.setProperty("--color-brand-black", "#02040a"), // Deep Navy/Black
          onLeaveBack: () => document.documentElement.style.setProperty("--color-brand-black", "#050505"), // Back to normal
        });
      }
    };

    if (video.readyState >= 1) {
      createScrub();
    } else {
      video.addEventListener("loadedmetadata", createScrub);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === containerRef.current) t.kill();
      });
      video.removeEventListener("loadedmetadata", createScrub);
    };
  }, [id, texts, isNightMode]);

  return (
    <div
      id={id}
      ref={containerRef}
      className="relative w-full h-[400vh]"
      data-cursor="SCRUB"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-brand-black">
        <video
          ref={videoRef}
          src={videoSrc}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isNightMode ? "opacity-70" : "opacity-90"}`}
          muted
          playsInline
          preload="auto"
        />
        
        {/* Cinematic gradient overlays to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black pointer-events-none" />

        {/* Texts */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
          {texts.map((txt, index) => (
            <div
              key={index}
              className={`text-${id}-${index} absolute text-center text-brand-offwhite font-devanagari text-3xl md:text-5xl lg:text-6xl font-medium tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] opacity-0 ${
                txt.className || ""
              }`}
            >
              {txt.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
