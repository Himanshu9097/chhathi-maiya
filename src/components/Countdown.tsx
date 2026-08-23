"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sandhya Arghya, Main Chhath Puja day: Nov 15, 2026
    const targetDate = new Date("2026-11-15T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  if (!mounted) return <div className="h-[30px]" />; // preserve space

  return (
    <div className="flex gap-4 md:gap-4 font-mono text-2xl md:text-sm tracking-[0.1em] tabular-nums">
      <div className="flex flex-col items-center">
        <span className="text-white drop-shadow-md font-bold md:font-normal">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-[10px] md:text-[9px] text-white/70 md:text-white/50 uppercase font-sans tracking-[0.3em] md:tracking-[0.2em] mt-1 font-semibold md:font-normal">Days</span>
      </div>
      <span className="text-white/50 md:text-white/30 mt-[1px] md:mt-[2px] font-bold md:font-normal">:</span>
      <div className="flex flex-col items-center">
        <span className="text-white drop-shadow-md font-bold md:font-normal">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[10px] md:text-[9px] text-white/70 md:text-white/50 uppercase font-sans tracking-[0.3em] md:tracking-[0.2em] mt-1 font-semibold md:font-normal">Hrs</span>
      </div>
      <span className="text-white/50 md:text-white/30 mt-[1px] md:mt-[2px] font-bold md:font-normal">:</span>
      <div className="flex flex-col items-center">
        <span className="text-white drop-shadow-md font-bold md:font-normal">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[10px] md:text-[9px] text-white/70 md:text-white/50 uppercase font-sans tracking-[0.3em] md:tracking-[0.2em] mt-1 font-semibold md:font-normal">Min</span>
      </div>
      <span className="text-white/50 md:text-white/30 mt-[1px] md:mt-[2px] font-bold md:font-normal">:</span>
      <div className="flex flex-col items-center">
        <span className="text-white drop-shadow-md font-bold md:font-normal">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[10px] md:text-[9px] text-white/70 md:text-white/50 uppercase font-sans tracking-[0.3em] md:tracking-[0.2em] mt-1 font-semibold md:font-normal">Sec</span>
      </div>
    </div>
  );
}
