"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat } from "lucide-react";
import Countdown from "./Countdown";
import Link from "next/link";

const TRACKS = [
  {
    title: "Uga Ho Surujdev Bhel Bhinsarva",
    artist: "Anuradha Paudwal",
    src: "/audio/Uga Ho Surujdev Bhel Bhinsarva (From Chhath Pooja Ke Geet) - Anuradha Paudwal.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02269b133db727cafcd5ad3a00",
    lyrics: "उग हो सुरुज देव भेल भिनसरवा\nअरघ के रे बेरवा\nपूजन के रे बेरवा\n\nबाँझिन के अँगना में गूंजत बाटे रोदनवा\nसुरुज देव, बाटे रोदनवा\n\nदीं ना सुरुज देव एको बलकवा\nअरघ के रे बेरवा\nपूजन के रे बेरवा"
  },
  {
    title: "Ho Deenanath",
    artist: "Sharda Sinha",
    src: "/audio/Ho Deenanath - Sharda Sinha.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ea4c3c7440a4f6336d88238d",
  },
  {
    title: "Pahile Pahil Chhathi Maiya",
    artist: "Sharda Sinha",
    src: "/audio/Pahile Pahil Chhathi Maiya - Sharda Sinha.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02046587dbfed932bc7476a000",
  },
  {
    title: "Kelwa Ke Paat Par",
    artist: "Sharda Sinha",
    src: "/audio/Kelwa Ke Paat Par - Sharda Sinha.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ea4c3c7440a4f6336d88238d",
  },
  {
    title: "Uthau Suruj Bhaile Bihaan",
    artist: "Sharda Sinha",
    src: "/audio/Uthau Suruj Bhaile Bihaan - Sharda Sinha.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ea4c3c7440a4f6336d88238d",
  },
  {
    title: "Baanjhi Kewdawa Dhaile Thaadh",
    artist: "Sharda Sinha",
    src: "/audio/Baanjhi Kewdawa Dhaile Thaadh - Sharda Sinha.mp3",
    cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02ea4c3c7440a4f6336d88238d",
  },
  {
    title: "Chaar Pahar Hum Jal Thal Sevila",
    artist: "Anuradha Paudwal",
    src: "/audio/Chaar Pahar Hum Jal Thal Sevila (From Chhath Mahima) - Anuradha Paudwal.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020c2077ba6d35d2f8f573b8de",
  },
  {
    title: "Uga Hai Suruj Dev",
    artist: "Kalpana Patowary",
    src: "/audio/Uga Hai Suruj Dev - Kalpana Patowary.mp3",
    cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e029b3da7928de9b3310e8da26f",
  },
  {
    title: "Jal Beech Khada Hoee",
    artist: "Pawan Singh, Palak",
    src: "/audio/Jal Beech Khada Hoee (From Daras Dekhava Ae Deenanath) - Pawan Singh, Palak.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d0c1970d8e13bb15f5ccb41d",
  },
  {
    title: "Bhor Bhai Din Chad Gaya",
    artist: "Alka Yagnik",
    src: "/audio/Bhor Bhai Din Chad Gaya Meri Ambe Aarti - Alka Yagnik.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e023cd128ce408b5a66995674a4",
  },
  {
    title: "Ugi Hai Dinanath",
    artist: "Mohit Musik, swati mishra",
    src: "/audio/Ugi Hai Dinanath chath puja song - Mohit Musik, swati mishra.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e029b45c794003b9b25b94c019c",
  },
  {
    title: "Chhath Ke Baratiya",
    artist: "Sharda Sinha",
    src: "/audio/Chhath Ke Baratiya - Sharda Sinha.mp3",
    cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e027a62489785bd58618865da7e",
  },
  {
    title: "Chhathi Maai Aaili Naiharva",
    artist: "Kalpana Patowary",
    src: "/audio/Chhathi Maai Aaili Naiharva - Kalpana Patowary.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020d4862e7c7e2c38048dd4284",
  },
  {
    title: "Chaar Hin Chakka Ke Motarva",
    artist: "Kalpana Patowary",
    src: "/audio/Chaar Hin Chakka Ke Motarva - Kalpana Patowary.mp3",
    cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02f28f10409078e4ffba5a743f",
  },
  {
    title: "Hey Chhathi Maiya",
    artist: "Sharda Sinha",
    src: "/audio/Hey Chhathi Maiya - Sharda Sinha.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ea4c3c7440a4f6336d88238d",
  },
  {
    title: "Bairiya Ke Beri",
    artist: "Anuradha Paudwal",
    src: "/audio/Bairiya Ke Beri - Anuradha Paudwal.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020acc71d97a1bd00d140fee0f",
  },
  {
    title: "Ugi Ugi Ugi He Aditmal Purub Oriya",
    artist: "Karina Pandey",
    src: "/audio/Ugi Ugi Ugi He Aditmal Purub Oriya - Karina Pandey.mp3",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e027a496d952c7e01e8f929d89a",
  }
];

export default function UiOverlay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(isPlaying);
  
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const trackIndexRef = useRef(currentTrackIndex);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    trackIndexRef.current = currentTrackIndex;
  }, [isPlaying, currentTrackIndex]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Scroll listener to hide countdown on mobile when scrolling down
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      const audio = new Audio(TRACKS[0].src);
      audio.loop = false;
      audioRef.current = audio;
      
      // Event listeners for track progression
      audio.addEventListener("timeupdate", () => {
        setProgress(audio.currentTime || 0);
      });
      
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration || 0);
      });

      audio.addEventListener("ended", () => {
        nextTrack();
      });
      
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Run once on mount

  const loadAndPlayTrack = async (index: number) => {
    if (!audioRef.current) return;
    
    // Pause current audio to safely interrupt any pending play promises
    audioRef.current.pause();
    
    audioRef.current.src = TRACKS[index].src;
    audioRef.current.load(); // Force preload
    
    if (isPlayingRef.current) {
      try {
        await audioRef.current.play();
      } catch (error: any) {
        // Ignore AbortError caused by rapid next/prev clicks
        if (error.name !== 'AbortError') {
          setIsPlaying(false);
        }
      }
    }
  };

  const nextTrack = () => {
    const nextIdx = (trackIndexRef.current + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    loadAndPlayTrack(nextIdx);
  };

  const prevTrack = () => {
    const nextIdx = (trackIndexRef.current - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    loadAndPlayTrack(nextIdx);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    if (isPlayingRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true); // Optimistic UI update
      try {
        await audioRef.current.play();
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          setIsPlaying(false);
        }
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (newMutedState) setVolume(0);
      else setVolume(audioRef.current.volume || 1);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      const newLoopState = !isLooping;
      audioRef.current.loop = newLoopState;
      setIsLooping(newLoopState);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) {
        audioRef.current.muted = true;
        setIsMuted(true);
      } else {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const currentTrack: any = TRACKS[currentTrackIndex];

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between">
      {/* Top markers */}
      <div className="flex justify-between p-6 md:p-10 font-sans text-xs uppercase tracking-widest text-brand-offwhite mix-blend-difference relative">
        <div className="flex flex-col gap-1">
          <span>CHHATH PUJA</span>
          <span className="opacity-50">VOL. I</span>
        </div>
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <div className={`absolute top-24 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:top-auto md:left-auto flex justify-center w-full md:w-auto transition-opacity duration-700 ${isScrolled ? 'opacity-0 md:opacity-100 pointer-events-none' : 'opacity-100'}`}>
            <Countdown />
          </div>
          <Link href="/bihar" className="group flex flex-col items-end gap-1 opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer">
            <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md group-hover:bg-white/10 group-hover:border-white/40 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <span className="tracking-[0.3em] font-sans text-[9px] md:text-[10px] text-white">25°N / 85°E</span>
            </div>
            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white/80 transition-colors mr-2">Explore Bihar</span>
          </Link>
        </div>
      </div>

      {/* Floating Center Audio Player */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto w-[95vw] sm:w-[500px] md:w-[600px] flex justify-center">
        <div className="w-full h-20 md:h-24 bg-gradient-to-r from-[#5a3a31]/80 to-[#4a2e26]/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center px-2 md:px-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          
          {/* Vinyl Album Art */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
            <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              fill
              className={`object-cover rounded-full p-[2px] border border-white/20 transition-transform duration-1000 ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`}
            />
            {/* Center Vinyl Hole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#2a1a15] rounded-full border border-black/40 shadow-inner z-10" />
          </div>

          {/* Track Info & Progress */}
          <div className="flex flex-col flex-grow ml-3 md:ml-4 mr-2 overflow-hidden justify-center h-full pt-1">
            <h3 className="text-white font-medium text-sm md:text-base truncate drop-shadow-md">
              {currentTrack.title}
            </h3>
            <p className="text-white/60 text-xs truncate mb-2 drop-shadow-md">
              {currentTrack.artist}
            </p>
            
            {/* Progress Bar & Time */}
            <div className="flex items-center gap-2">
              <input 
                type="range"
                min="0"
                max={duration || 100}
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer outline-none"
              />
            </div>
            <div className="text-[9px] md:text-[10px] text-white/50 mt-1 font-mono tracking-wider whitespace-nowrap">
              {formatTime(progress)} / {formatTime(duration)}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 md:gap-2 mr-2 md:mr-3 shrink-0">
            <button onClick={prevTrack} className="p-1 md:p-2 text-white/80 hover:text-white transition-colors active:scale-95">
              <SkipBack size={16} className="fill-current md:w-5 md:h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-8 h-8 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center text-[#4a2e26] hover:scale-105 active:scale-95 transition-all shadow-lg shrink-0"
            >
              {isPlaying ? (
                <Pause size={16} className="fill-current md:w-5 md:h-5 ml-[1px]" />
              ) : (
                <Play size={16} className="fill-current md:w-5 md:h-5 ml-[2px]" />
              )}
            </button>
            <button onClick={nextTrack} className="p-1 md:p-2 text-white/80 hover:text-white transition-colors active:scale-95">
              <SkipForward size={16} className="fill-current md:w-5 md:h-5" />
            </button>
            <button onClick={toggleLoop} title="Toggle Loop" className={`p-1 md:p-2 transition-colors active:scale-95 ${isLooping ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-white/50 hover:text-white/80'}`}>
              <Repeat size={16} className="md:w-4 md:h-4" />
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-1 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-1">
              <button onClick={toggleMute} className="p-1 md:p-2 text-white/80 hover:text-white transition-colors active:scale-95">
                {isMuted || volume === 0 ? (
                  <VolumeX size={16} className="md:w-5 md:h-5" />
                ) : (
                  <Volume2 size={16} className="md:w-5 md:h-5" />
                )}
              </button>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-12 md:w-16 h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer outline-none"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Spotify Link */}
      <a 
        href="https://open.spotify.com/search/chhath%20puja/playlists"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-[110px] md:bottom-20 right-4 md:right-10 pointer-events-auto opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2 text-[#1ED760]"
      >
        <span className="font-sans text-[9px] tracking-[0.2em] uppercase hidden md:inline text-brand-offwhite">Listen on Spotify</span>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.56.3z" />
        </svg>
      </a>

    </div>
  );
}
