import CircularVisualizer from "./CircularVisualizer";

export default function CentralHero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* 1. Neon Bloom Canvas Engine Layer */}
      <CircularVisualizer />

      {/* 2. Interactive Logo & Typography Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Central Logo Container - Absolutely centered in the viewport */}
        <div
          data-hover-slow
          className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center p-0 bg-zinc-950/40 backdrop-blur-md rounded-full border border-zinc-900 shadow-[0_0_60px_rgba(0,0,0,0.9)] transition-all duration-500 hover:scale-105 group overflow-hidden z-20"
        >
          {/* Main Artist Logo - Clipped to Circle */}
          <img
            src="/keysmainlogo.png"
            alt="Keys Beats Logo"
            className="w-full h-full object-cover grayscale brightness-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out"
          />
        </div>

        {/* Space Grotesk Branding Content - Positioned below the logo without pushing it off-center */}
        <div className="absolute top-full mt-10 w-max flex flex-col items-center">
          <h1 className="font-sans font-bold text-4xl sm:text-5xl tracking-tight text-white uppercase whitespace-nowrap">
            KEYS BEATS
          </h1>

          <div className="mt-3 flex items-center space-x-3 font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
            <span>[ AUDIO PORTFOLIO ]</span>
            <span className="text-zinc-700">•</span>
            <span>[ DESIGN BY DTE SOLUTIONS ]</span>
          </div>
        </div>
      </div>
    </section>
  );
}

