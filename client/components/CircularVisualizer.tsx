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
      // Tightened base radius to sit just outside the logo (roughly 0.12 of viewport)
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.13;
      const time = Date.now() * 0.001; // For organic drifting

      // Enable a 'screen' composite mode to stack light values for an intense bloom
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < usableBufferLength; i++) {
        const value = dataArray[i];
        const percent = value / 255;

        // ORGANIC RANDOMNESS:
        // 1. Time-based sine wave for "breathing"
        // 2. Random jitter to prevent uniform spikes
        const jitter = Math.sin(i * 0.5 + time * 2) * 15;
        const randomness = (Math.random() - 0.5) * 25 * percent;
        
        // Spike size reactions with organic scaling
        const spikeLength = (percent * 130) + jitter + randomness;
        
        // Add a slight time-based rotation to the ring
        const angle = (i / usableBufferLength) * Math.PI * 2 + (time * 0.05);

        const startX = centerX + Math.cos(angle) * baseRadius;
        const startY = centerY + Math.sin(angle) * baseRadius;
        const endX = centerX + Math.cos(angle) * (baseRadius + spikeLength);
        const endY = centerY + Math.sin(angle) * (baseRadius + spikeLength);

        // NEON BLOOM OPTIMIZATION:
        // Avoid ctx.shadowBlur as it is extremely expensive in loops.
        // Instead, we use a "multi-pass" stroke to simulate a glow.
        const neonColor = "#00ffcc";

        // Pass 1: Outer wide glow (low opacity)
        ctx.strokeStyle = neonColor;
        ctx.lineWidth = 6 + (percent * 8);
        ctx.globalAlpha = 0.15 * percent;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Pass 2: Middle glow
        ctx.lineWidth = 3 + (percent * 4);
        ctx.globalAlpha = 0.3 * percent;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Pass 3: Core bright line
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1 + (percent * 2);
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Reset alpha for next iteration
        ctx.globalAlpha = 1.0;
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
