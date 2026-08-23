"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface LocationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationOverlay({ isOpen, onClose }: LocationOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setMounted(false), 700); // match transition duration
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-brand-black/95 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-brand-offwhite/50 hover:text-brand-offwhite transition-colors"
      >
        <X size={24} strokeWidth={1.5} />
      </button>

      <div className="flex flex-col items-center text-center">
        <h2 className="font-sans text-xs tracking-[0.4em] uppercase text-brand-offwhite/60 mb-12">
          Bihar / India
        </h2>

        {/* Minimal Stylized Map Representation */}
        <div className="relative w-64 h-48 md:w-96 md:h-64 border border-brand-offwhite/10 rounded-3xl bg-brand-offwhite/[0.02] flex items-center justify-center overflow-hidden mb-12">
          {/* Subtle grid lines */}
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          
          {/* Main River (Ganga) abstract representation */}
          <svg className="absolute w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,40 50,55 T100,45" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>

          {/* Dots for cities */}
          <div className="absolute top-[45%] left-[40%] w-1.5 h-1.5 bg-brand-sunsetorange rounded-full shadow-[0_0_10px_rgba(224,109,40,0.8)]" />
          <span className="absolute top-[45%] left-[40%] -translate-x-1/2 -translate-y-6 text-[9px] font-sans tracking-widest text-brand-offwhite/50">PATNA</span>

          <div className="absolute top-[35%] left-[55%] w-1 h-1 bg-brand-offwhite/40 rounded-full" />
          <span className="absolute top-[35%] left-[55%] -translate-x-1/2 -translate-y-4 text-[8px] font-sans tracking-widest text-brand-offwhite/30">DARBHANGA</span>

          <div className="absolute top-[50%] left-[70%] w-1 h-1 bg-brand-offwhite/40 rounded-full" />
          <span className="absolute top-[50%] left-[70%] -translate-x-1/2 -translate-y-4 text-[8px] font-sans tracking-widest text-brand-offwhite/30">BHAGALPUR</span>
        </div>

        <h3 className="font-devanagari text-xl md:text-3xl text-brand-offwhite mb-4">
          A story from the riverbanks of Bihar.
        </h3>
        <p className="font-sans text-xs tracking-widest text-brand-offwhite/40">
          25.0961° N, 85.3131° E
        </p>
      </div>
    </div>
  );
}
