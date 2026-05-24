import { useRef, useState } from "react";
import { getAudioContext } from "@/utils/audioContext";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrackRow({
  src,
  title,
  trackId,
}: {
  src: string;
  title: string;
  trackId: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceConnected = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const { context, analyser } = getAudioContext();
    if (!context || !analyser) return;

    // Browser security: Resume the audio graph if it was suspended
    if (context.state === "suspended") {
      await context.resume();
    }

    // Connect the HTML5 audio element tag to your Web Audio pipeline exactly once
    if (!sourceConnected.current) {
      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);
      sourceConnected.current = true;
    }

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      data-hover-slow
      onClick={handleTogglePlay}
      className="group flex justify-between items-center py-6 border-b border-zinc-900 cursor-none relative z-10 transition-colors hover:bg-zinc-950/50 px-4"
    >
      <audio
        ref={audioRef}
        src={src}
        crossOrigin="anonymous"
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex items-center space-x-6">
        <span className="font-mono text-zinc-700 text-xs">{trackId}</span>
        <div className="flex items-center space-x-3">
          <div
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full border border-zinc-800 transition-all",
              isPlaying ? "bg-primary border-primary" : "bg-transparent"
            )}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-black" />
            ) : (
              <Play className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
            )}
          </div>
          <h3 className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        </div>
      </div>
      <span className="font-mono text-[10px] tracking-widest text-zinc-600 group-hover:text-white transition-colors uppercase">
        {isPlaying ? "[ STREAMING ]" : "[ CLICK TO STREAM ]"}
      </span>
    </div>
  );
}
