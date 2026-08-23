"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {

  useEffect(() => {
    // Sequence:
    // 0-2s: Black screen
    // 2-4s: Fade in "छठ कोई festival नहीं है।"
    // 4-6s: Fade to "ये एक emotion है।"
    // 6-8s: Fade out to black, then show Enter button

    const tl = gsap.timeline({
      onComplete: () => {
        // Automatically transition out
        gsap.to(".loader-container", {
          opacity: 0,
          duration: 1,
          onComplete,
        });
      },
    });

    tl.to(".loader-text-1", { opacity: 1, duration: 2, delay: 1 })
      .to(".loader-text-1", { opacity: 0, duration: 1, delay: 1 })
      .to(".loader-text-2", { opacity: 1, duration: 2 })
      .to(".loader-text-2", { opacity: 0, duration: 1, delay: 1 });
  }, []);

  return (
    <div className="loader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-black pointer-events-none">
      <div className="relative text-center font-devanagari text-white w-full h-full flex items-center justify-center">
        <h1 className="loader-text-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-3xl font-medium opacity-0 md:text-5xl">
          छठ कोई festival नहीं है।
        </h1>
        <h1 className="loader-text-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-3xl font-medium opacity-0 md:text-5xl">
          ये एक <span className="font-semibold">emotion</span> है।
        </h1>
      </div>
    </div>
  );
}
