import { useEffect, useRef } from "react";
import { getAudioContext } from "@/utils/audioContext";

export default function CircularVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { analyser } = getAudioContext();
    if (!analyser) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const bufferLength = analyser.frequencyBinCount;
    // Focus primarily on bass and mid frequencies for cleaner visual spikes
    const usableBufferLength = Math.floor(bufferLength * 0.75);
    const dataArray = new Uint8Array(bufferLength);

    let animationFrameId: number;

    const renderFrame = () => {
      animationFrameId = requestAnimationFrame(renderFrame);

      analyser.getByteFrequencyData(dataArray);

      // Reset the canvas with pure black
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.22;

      // Enable a 'screen' composite mode to stack light values for an intense bloom
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < usableBufferLength; i++) {
        const value = dataArray[i];
        const percent = value / 255;

        // Spike size reactions
        const spikeLength = percent * 110;
        const angle = (i / usableBufferLength) * Math.PI * 2;

        const startX = centerX + Math.cos(angle) * baseRadius;
        const startY = centerY + Math.sin(angle) * baseRadius;
        const endX = centerX + Math.cos(angle) * (baseRadius + spikeLength);
        const endY = centerY + Math.sin(angle) * (baseRadius + spikeLength);

        // NEON BLOOM MATH: Scale glow intensity exponentially with volume
        const neonColor = "#00ffcc"; // Electric Cyan / Mint

        ctx.shadowColor = neonColor;
        ctx.shadowBlur = percent * 25; // Dynamic blur intensity matching the track bass
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw the core bright center line
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw an outer colored accent bar right on top to spread the bloom hue
        ctx.strokeStyle = neonColor;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Reset composite configuration for other UI layers
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0; // Clear shadow buffer
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
