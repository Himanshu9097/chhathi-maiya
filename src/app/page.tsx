"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";

import UiOverlay from "@/components/UiOverlay";
import Hero from "@/components/Hero";
import ImageChapter from "@/components/ImageChapter";
import FrameScrollChapter from "@/components/FrameScrollChapter";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const chapters = [
    {
      id: "chapter-01",
      imageSrc: "/images/story-1.jpg",
      texts: [
        { text: "मैं घर लौट आया।", start: 0.3, end: 0.7 },
      ],
    },
    {
      id: "chapter-02",
      imageSrc: "/images/story-2.jpg",
      texts: [
        { text: "माँ अब भी वही करती है।", start: 0.3, end: 0.7 },
      ],
    },
    {
      id: "chapter-03",
      imageSrc: "/images/story-3.jpg",
      isFinal: true,
      texts: [
        { text: "अब मुझे समझ आया कि क्यों।", start: 0.3, end: 0.7 },
      ],
    },
  ];

  return (
    <>

      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <SmoothScroll>
          <UiOverlay />
          <main className="bg-brand-black text-brand-offwhite">
            <Hero />

            {/* Cinematic Story Chapters */}
            <ImageChapter {...chapters[0]} />
            
            {/* Seamless Video Transition (combining chapters 2 and 3) */}
            <FrameScrollChapter
              id="transition-chapter"
              frameCount={226}
              framePath="/frames/transition/frame_"
              frameExt=".jpg"
              isFinal={true}
              texts={[
                { text: "माँ अब भी वही करती है।", start: 0.15, end: 0.35 },
                { text: "अब मुझे समझ आया कि क्यों।", start: 0.65, end: 0.85 },
              ]}
            />

            {/* Final Closing Screen */}
            <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between bg-brand-black z-20 overflow-hidden">
              <div className="flex-grow flex flex-col items-center justify-center text-center max-w-3xl px-4 font-devanagari">
                <span className="text-3xl md:text-6xl font-bold mt-8 mb-4">छठ कोई festival नहीं है।</span>
                <span className="text-2xl md:text-5xl font-medium mb-8">ये एक emotion है।</span>
                
                <span className="text-base md:text-2xl opacity-80 mt-8 leading-relaxed px-2">
                  कुछ रिश्ते, कुछ यादें और एक सूरज —<br/>हर साल हमें वापस बुलाता है।
                </span>
                
                <div className="flex flex-col gap-2 font-sans text-sm uppercase tracking-[0.3em] text-brand-offwhite/50 mt-16">
                  <span>Bihar se, dil tak.</span>
                </div>
              </div>

              {/* Spotlight Footer Text */}
              <div className="w-full pb-10 flex justify-center items-end select-none pointer-events-none">
                <h1 className="font-devanagari text-[18vw] md:text-[15vw] leading-[0.8] tracking-tight whitespace-nowrap spotlight-text opacity-90 mix-blend-screen">
                  जय छठी मैया
                </h1>
              </div>
            </section>
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
