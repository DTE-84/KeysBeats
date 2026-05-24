import { useState, useEffect } from "react";
import { X, Music, Info, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NexusGateway() {
  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Close modal and allow audio context to start
  const handleEnter = () => {
    setIsOpen(false);
    setHasInteracted(true);
    // This interaction allows the Web Audio API to resume later
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* High-Blur Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden group">
        {/* Kinetic Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Logo Placeholder / Icon */}
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
            <Music className="text-primary w-8 h-8" />
          </div>

          <h2 className="font-sans font-bold text-3xl tracking-tight text-white uppercase mb-2">
            Keys Beats
          </h2>
          <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-10">
            [ ESTABLISHING CONNECTION // KEYS BEATS ]
          </p>

          {/* Navigation Grid */}
          <div className="w-full grid grid-cols-1 gap-4 mb-10">
            <button
              onClick={handleEnter}
              data-hover-slow
              className="group flex items-center justify-between p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <Music className="w-5 h-5 text-primary" />
                <span className="font-sans font-bold text-white uppercase tracking-wider">
                  MUSIC
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-600">[ ACTIVE ]</span>
            </button>

            <div className="flex items-center justify-between p-5 bg-zinc-900/20 border border-zinc-900/50 rounded-2xl opacity-50 cursor-not-allowed">
              <div className="flex items-center space-x-4">
                <Info className="w-5 h-5 text-zinc-600" />
                <span className="font-sans font-bold text-zinc-600 uppercase tracking-wider">
                  IDENTITY
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-700">
                [ OFFLINE ]
              </span>
            </div>

            <div className="flex items-center justify-between p-5 bg-zinc-900/20 border border-zinc-900/50 rounded-2xl opacity-50 cursor-not-allowed">
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-zinc-600" />
                <span className="font-sans font-bold text-zinc-600 uppercase tracking-wider">
                  CONTACT
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-700">
                [ OFFLINE ]
              </span>
            </div>
          </div>

          {/* Footer Intel */}
          <p className="font-sans text-zinc-600 text-xs leading-relaxed max-w-xs italic">
            "Signal clarity is the only metric that matters."
          </p>
        </div>
      </div>
    </div>
  );
}
