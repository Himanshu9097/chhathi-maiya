import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "The Soul of Bihar | Cultural Heritage",
  description: "Explore the rich cultural heritage, art, and history of Bihar.",
};

export default function BiharPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-offwhite selection:bg-[#4a2e26] selection:text-white font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 md:p-10 z-50 mix-blend-difference pointer-events-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          <span>Return</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black z-10" />
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5a3a31] via-brand-black to-brand-black" />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20 md:mt-0">
          <h1 className="font-devanagari text-5xl md:text-8xl font-bold mb-6 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            बिहार की आत्मा
          </h1>
          <p className="text-sm md:text-xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-80">
            The Soul of Bihar
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 space-y-32 md:space-y-48">
        
        {/* Nalanda - History */}
        <section className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-sm md:text-base font-mono tracking-[0.2em] opacity-50 uppercase">01 / The Legacy</h2>
            <h3 className="font-devanagari text-3xl md:text-5xl font-bold leading-tight">
              ज्ञान की भूमि <br/><span className="font-sans font-light tracking-normal text-2xl md:text-4xl text-white/80">The Seat of Knowledge</span>
            </h3>
            <p className="text-base md:text-lg leading-relaxed opacity-70 font-light">
              Long before Oxford or Cambridge, there was Nalanda. Founded in the 5th century CE, it was one of the world's first residential universities, attracting scholars from Tibet, China, Greece, and Persia. Bihar is the birthplace of empires—the Maurya and Gupta dynasties—and the soil where Buddha attained enlightenment. It is a land that taught the world mathematics, statecraft, and philosophy.
            </p>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1736235300171-eb8aa382b594?q=80&w=1000&auto=format&fit=crop" 
              alt="Ancient Architecture representing Nalanda" 
              fill 
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
          </div>
        </section>

        {/* Madhubani - Art */}
        <section className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src="/images/madhubani-art.jpg" 
              alt="Intricate Indian Patterns representing Madhubani Art" 
              fill 
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
          </div>
          <div className="space-y-6">
            <h2 className="text-sm md:text-base font-mono tracking-[0.2em] opacity-50 uppercase">02 / The Canvas</h2>
            <h3 className="font-devanagari text-3xl md:text-5xl font-bold leading-tight">
              मिथिला की कला <br/><span className="font-sans font-light tracking-normal text-2xl md:text-4xl text-white/80">Madhubani Art</span>
            </h3>
            <p className="text-base md:text-lg leading-relaxed opacity-70 font-light">
              Born in the Mithila region of Bihar, Madhubani painting is a vibrant expression of nature, mythology, and life. Originally created by women on freshly plastered mud walls of their homes, this art form is characterized by eye-catching geometric patterns and natural dyes. It is a living tradition that has empowered communities and put Bihar on the global art map.
            </p>
          </div>
        </section>

        {/* Resilience - The People */}
        <section className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-sm md:text-base font-mono tracking-[0.2em] opacity-50 uppercase">03 / The Spirit</h2>
            <h3 className="font-devanagari text-3xl md:text-5xl font-bold leading-tight">
              अडिग संकल्प <br/><span className="font-sans font-light tracking-normal text-2xl md:text-4xl text-white/80">Unyielding Resilience</span>
            </h3>
            <p className="text-base md:text-lg leading-relaxed opacity-70 font-light">
              To understand Bihar is to understand resilience. It is a state defined by its hardworking people who migrate across the country, building the very foundations of modern India. The spirit of Bihar is deeply intertwined with simplicity, strong community bonds, and an unwavering connection to the roots. Chhath Puja is the ultimate manifestation of this spirit—a festival of purity, discipline, and profound gratitude.
            </p>
          </div>
          <div className="order-1 md:order-2 relative w-full aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src="/images/bihar-map.png" 
              alt="Map of Bihar" 
              fill 
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
          </div>
        </section>

      </div>
      
      {/* Footer */}
      <footer className="w-full py-12 md:py-24 flex flex-col items-center justify-center text-center opacity-40 border-t border-white/10 mt-12 md:mt-24">
        <span className="font-sans text-xs tracking-[0.4em] uppercase mb-4">The Roots remain strong</span>
        <span className="font-devanagari text-xl">जय बिहार</span>
      </footer>

    </main>
  );
}
