# KEYS BEATS // Audio Portfolio & Promotional Nexus

A high-fidelity, interactive promotional page designed for **Keys Beats**, featuring a real-time audio-reactive ecosystem and a brutalist neon aesthetic. Built as part of the **DTE Ecosystem** to showcase professional musical narrative and deterministic soundscapes.

## 🚀 Live Nexus
[https://keys-beats.vercel.app/](https://keys-beats.vercel.app/)

## ⚡ Key Features

- **Interactive Neon Bloom Visualizer**: A 360-degree polar coordinate canvas engine that reacts to frequency and volume data via the Web Audio API.
- **Dynamic Friction Cursor**: A custom particle-based neon trail system that adjusts physics (stickiness/friction) when hovering over interactive elements.
- **Organic Kinetic Energy**: The animation engine utilizes Perlin-inspired randomness and orbital drift to ensure a fluid, "alive" visual experience.
- **Elite Typographic Standard**: Powered by **Space Grotesk**, utilizing a brutalist magazine-cover layout with high-fashion grayscale-to-color transitions.
- **Performance Optimized**: Custom multi-pass canvas rendering techniques replace expensive CSS blurs, ensuring a smooth 60 FPS experience on Vercel.

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS 3 (Lux Forest Aesthetic)
- **Animation**: Canvas 2D API + RequestAnimationFrame + Framer Motion
- **Audio**: HTML5 Web Audio API + AnalyserNode
- **Deployment**: Vercel (Production)

## 📁 Project Structure

```text
client/
├── components/          # Interactive UI & Canvas Engines
│   ├── CentralHero.tsx  # Landing focal point & Typography
│   ├── CircularVisualizer.tsx # Neon Bloom Engine
│   └── NeonCursor.tsx   # Dynamic Friction Cursor
├── pages/               # Route components (Index.tsx)
└── utils/               # Shared AudioContext & Logic
public/                  # MP3 tracks & High-Fidelity assets
```

## 🎹 Development

To run the Nexus locally:

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start the engine**:
   ```bash
   pnpm dev
   ```

3. **Production Build**:
   ```bash
   pnpm build
   ```

---
**DESIGN BY DTE SOLUTIONS**  
*Analytical Twin // High-Fidelity Data Integrity*
