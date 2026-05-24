import CentralHero from "@/components/CentralHero";
import Tracklist from "@/components/Tracklist";
import NeonCursor from "@/components/NeonCursor";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-black text-white select-none overflow-x-hidden">
      {/* 1. Custom Interactive Cursor (Desktop Only) */}
      <NeonCursor />

      {/* 2. Audio-Reactive Hero Section */}
      <CentralHero />

      {/* 3. Content Area with Tracklist */}
      <div className="relative z-20 bg-black shadow-[0_-30px_50px_rgba(0,0,0,0.9)]">
        <Tracklist />
      </div>

      {/* 4. Footer Narrative */}
      <footer className="py-20 px-6 border-t border-zinc-900 bg-black text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-sans text-zinc-500 text-sm leading-relaxed tracking-wide">
            KEYS BEATS IS A MULTI-DISCIPLINARY ARTIST FOCUSED ON HIGH-FIDELITY
            SOUNDSCAPES AND DETERMINISTIC RHYTHMS. BASED IN THE NEXUS, PRODUCING
            SIGNAL CLARITY FOR THE NEXT GENERATION.
          </p>
        </div>
      </footer>
    </main>
  );
}

