"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FrameScrollChapterProps {
  id: string;
  frameCount: number;
  framePath: string; // e.g. "/frames/transition/frame_"
  frameExt: string;  // e.g. ".jpg"
  texts: { text: string; start: number; end: number; className?: string }[];
  isFinal?: boolean;
}

export default function FrameScrollChapter({
  id,
  frameCount,
  framePath,
  frameExt,
  texts,
  isFinal = false,
}: FrameScrollChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const renderFrame = (index: number, images = imagesRef.current) => {
    if (!canvasRef.current || !images[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    currentFrameRef.current = index;
    
    // Draw image to fill canvas (cover)
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(4, "0");
      img.src = `${framePath}${paddedIndex}${frameExt}`;
      
      img.onload = () => {
        loadedCount++;
        setLoaded(Math.round((loadedCount / frameCount) * 100));
        if (i === 1) {
          // Render first frame immediately once loaded
          renderFrame(0, images);
        }
      };
      
      // Still push it so indices line up
      images.push(img);
    }
    imagesRef.current = images;
  }, [frameCount, framePath, frameExt]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !canvasRef.current) return;

    const playhead = { frame: 0 };

    // Scrub animation for canvas frames
    gsap.to(playhead, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // slightly smoothed scrub
      },
      onUpdate: () => renderFrame(playhead.frame),
    });

    // Text animations inside this chapter
    texts.forEach((txt, index) => {
      // Start hidden
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
          "25%": { opacity: 1, y: 0, ease: "none" },
          "75%": { opacity: 1, y: 0, ease: "power2.in" },
          "100%": { opacity: 0, y: -30, ease: "none" }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === containerRef.current) t.kill();
      });
    };
  }, [id, frameCount, texts]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(currentFrameRef.current);
      }
    };
    handleResize(); // Initial set
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative w-full ${isFinal ? "h-[300dvh]" : "h-[600dvh]"}`}
    >
      <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden bg-brand-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-80 mix-blend-screen"
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
        
        {/* Loading Indicator */}
        {loaded < 100 && (
          <div className="absolute bottom-10 right-10 text-[10px] tracking-widest font-mono text-white/50 pointer-events-none">
            BUFFERING TRANSITION {loaded}%
          </div>
        )}
      </div>
    </div>
  );
}
