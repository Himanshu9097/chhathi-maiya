"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] bg-brand-black overflow-hidden">
      {/* PC Image */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/images/hero-pc.png"
          alt="Chhath Puja"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden absolute inset-0">
        <Image
          src="/images/hero-mobile.png"
          alt="Chhath Puja"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center font-devanagari text-2xl md:text-4xl px-4 text-center z-10 opacity-90 text-brand-offwhite drop-shadow-lg">
        <span className="mb-4">कुछ त्योहार मनाए जाते हैं।</span>
        <span className="mb-4">कुछ महसूस किए जाते हैं।</span>
        <span className="text-5xl md:text-8xl font-bold mt-8 text-brand-sunsetorange">छठ।</span>
      </div>
    </section>
  );
}
