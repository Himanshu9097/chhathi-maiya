"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ImageChapterProps {
  id: string;
  imageSrc: string;
  texts: { text: string; start: number; end: number; className?: string }[];
  isFinal?: boolean;
}

export default function ImageChapter({
  id,
  imageSrc,
  texts,
  isFinal = false,
}: ImageChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !imageRef.current) return;

    // Very subtle slow scale (parallax/Ken Burns effect) as user scrolls through the chapter
    gsap.fromTo(
      imageRef.current,
      { scale: 1 },
      {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Text animations inside this chapter
    texts.forEach((txt, index) => {
      gsap.fromTo(
        `.text-${id}-${index}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${txt.start * 100}% center`,
            end: `${txt.end * 100}% center`,
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === containerRef.current) t.kill();
      });
    };
  }, [id, texts]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative w-full ${isFinal ? "h-[100dvh]" : "h-[200dvh]"}`}
    >
      <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden bg-brand-black">
        <Image
          ref={imageRef}
          src={imageSrc}
          alt={`Chapter ${id}`}
          fill
          className="object-cover opacity-80 mix-blend-screen"
          priority
        />
        
        {/* Cinematic gradient overlays to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

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
