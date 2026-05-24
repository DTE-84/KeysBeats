import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function NeonCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isActive: false });
  const particlesRef = useRef<Particle[]>([]);

  // Track system physics state across frames
  const physicsRef = useRef({
    currentFriction: 0.15, // Native trailing drift speed
    targetFriction: 0.15,
  });

  const neonColors = [
    "#00ffcc",
    "#ff0055",
    "#00ff33",
    "#ff9900",
    "#9900ff",
    "#00a8ff",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isActive = true;

      // ENGINE OPTIMIZATION: Check if cursor is over a "slow-down" element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("[data-hover-slow]") ||
          target.hasAttribute("data-hover-slow"))
      ) {
        physicsRef.current.targetFriction = 0.02; // Heavy friction makes particles slow/sticky
      } else {
        physicsRef.current.targetFriction = 0.15; // Reset to regular fast drift fluid physics
      }

      const dist = Math.hypot(
        mouseRef.current.x - mouseRef.current.lastX,
        mouseRef.current.y - mouseRef.current.lastY
      );

      // Scale generation pace based on whether we are moving or stuck in slow-mo
      const generationThreshold =
        physicsRef.current.targetFriction === 0.02 ? 2 : 5;

      if (dist > generationThreshold) {
        // Linear interpolation step to determine velocity constraints
        const speedModifier = physicsRef.current.currentFriction * 18;

        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            // Particles break outwards slower when mouse is hovering an action item
            vx: (Math.random() - 0.5) * speedModifier,
            vy: (Math.random() - 0.5) * speedModifier,
            alpha: 1.0,
            size: Math.random() * 5 + 3,
            color: neonColors[Math.floor(Math.random() * neonColors.length)],
          });
        }
        mouseRef.current.lastX = mouseRef.current.x;
        mouseRef.current.lastY = mouseRef.current.y;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const updateAndRender = () => {
      animationFrameId = requestAnimationFrame(updateAndRender);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly interpolate current friction state to target friction state
      physicsRef.current.currentFriction +=
        (physicsRef.current.targetFriction -
          physicsRef.current.currentFriction) *
        0.1;

      // Render out existing trail particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.x += p.vx;
        p.y += p.vy;

        // Decay variables alter smoothly based on the current physics friction interpolation
        p.alpha -= physicsRef.current.targetFriction === 0.02 ? 0.04 : 0.025;
        p.size *= physicsRef.current.targetFriction === 0.02 ? 0.92 : 0.96;

        if (p.alpha <= 0 || p.size <= 0.5) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        // OPTIMIZED GLOW: Instead of shadowBlur, draw two circles
        // 1. Outer glow circle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // 2. Inner core circle
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      // Render primary targeting pointer indicator
      if (mouseRef.current.isActive) {
        ctx.save();
        // Simplified core pointer
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        const cursorRadius = physicsRef.current.targetFriction === 0.02 ? 2.5 : 4;
        ctx.arc(mouseRef.current.x, mouseRef.current.y, cursorRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    updateAndRender();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999] hidden md:block"
    />
  );
}
