import TrackRow from "./TrackRow";

const tracks = [
  { id: "01", title: "NEXUS FLOW", src: "/nexus-flow.mp3" },
  { id: "02", title: "SIGNAL CLARITY", src: "/signal-clarity.mp3" },
  { id: "03", title: "KINETIC NEON", src: "/kinetic-neon.mp3" },
  { id: "04", title: "LUX FOREST", src: "/lux-forest.mp3" },
];

export default function Tracklist() {
  return (
    <section className="bg-black py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-sm font-bold tracking-[0.3em] text-zinc-500 mb-12 uppercase text-center">
        [ RELEASED WORK ]
      </h2>
      <div className="divide-y divide-zinc-900 border-t border-b border-zinc-900">
        {tracks.map((track) => (
          <TrackRow
            key={track.id}
            trackId={track.id}
            title={track.title}
            src={track.src}
          />
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="font-mono text-[10px] tracking-widest text-zinc-700 uppercase">
          © 2026 KEYS BEATS // ALL RIGHTS RESERVED
        </p>
      </div>
    </section>
  );
}
