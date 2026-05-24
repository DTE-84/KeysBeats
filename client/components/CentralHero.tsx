import CircularVisualizer from "./CircularVisualizer";

export default function CentralHero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* 1. Neon Bloom Canvas Engine Layer */}
      <CircularVisualizer />

      {/* 2. Interactive SVG Logo & Typography Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Central Logo Container */}
        <div
          data-hover-slow
          className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center p-6 bg-zinc-950/40 backdrop-blur-md rounded-full border border-zinc-900 shadow-[0_0_60px_rgba(0,0,0,0.9)] transition-all duration-500 hover:scale-105 group"
        >
          {/* Custom SVG Path Injection or Photo */}
          <img
            src="/placeholder.svg"
            alt="Artist Logo"
            className="w-full h-full object-contain invert opacity-90 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          />
        </div>

        {/* Space Grotesk Branding Content */}
        <h1 className="mt-10 font-sans font-bold text-4xl sm:text-5xl tracking-tight text-white uppercase">
          KEYS BEATS
        </h1>

        <div className="mt-3 flex items-center space-x-3 font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
          <span>[ AUDIO PORTFOLIO ]</span>
          <span className="text-zinc-700">•</span>
          <span>[ DESIGN BY NOVA ]</span>
        </div>
      </div>
    </section>
  );
}
