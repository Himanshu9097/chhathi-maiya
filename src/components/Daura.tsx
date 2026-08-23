"use client";

import { useState } from "react";
import Image from "next/image";

const DAURA_ITEMS = [
  {
    id: "thekua",
    name: "THEKUA",
    desc: "घर की मिठास।",
    x: 40,
    y: 30,
  },
  {
    id: "banana",
    name: "BANANA",
    desc: "एक साधारण फल, एक खास अर्पण।",
    x: 60,
    y: 50,
  },
  {
    id: "sugarcane",
    name: "SUGARCANE",
    desc: "फसल, मिट्टी और मौसम की याद।",
    x: 30,
    y: 70,
  },
];

export default function Daura() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-brand-black overflow-hidden py-20" data-cursor="LOOK">
      
      <div className="absolute top-10 text-center font-devanagari text-brand-offwhite opacity-60">
        <h2 className="text-xl md:text-2xl tracking-widest uppercase font-sans opacity-50 mb-2">Daura</h2>
        <p className="text-lg">छठी मइया का प्रसाद</p>
      </div>

      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mt-10">
        {/* The Bamboo Daura Image */}
        <div className="absolute inset-0 z-10 pointer-events-none drop-shadow-2xl">
          <Image
            src="/images/daura.png"
            alt="Chhath Daura"
            fill
            className="object-contain"
          />
        </div>

        {/* Hotspots */}
        {DAURA_ITEMS.map((item) => (
          <div
            key={item.id}
            className="absolute z-20"
            style={{ top: `${item.y}%`, left: `${item.x}%`, transform: "translate(-50%, -50%)" }}
            onMouseEnter={() => setActiveItem(item.id)}
            onMouseLeave={() => setActiveItem(null)}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)} // For mobile
          >
            {/* The hotspot dot */}
            <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center cursor-pointer backdrop-blur-sm transition-all duration-300 ${
              activeItem === item.id ? "bg-white/40 scale-125" : "bg-white/10 hover:bg-white/30 hover:scale-110 animate-pulse"
            }`}>
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>

            {/* The Label */}
            <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-48 text-center transition-all duration-500 pointer-events-none ${
              activeItem === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-brand-offwhite mb-1">
                {item.name}
              </h3>
              <p className="font-devanagari text-brand-offwhite/80 text-sm md:text-base leading-snug">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
