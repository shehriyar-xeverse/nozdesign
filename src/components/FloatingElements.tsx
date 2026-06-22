import { useEffect, useState, useMemo } from 'react';

interface GlowItem {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface FallingParticle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  swayDist: number;
  opacity: number;
}

export default function FloatingElements() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use useMemo to generate stable background metrics so they never re-compute or re-draw on component re-render
  const glowElements = useMemo<GlowItem[]>(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: i % 2 === 0 ? Math.random() * 30 : 60 + Math.random() * 30,
      y: i * 15 + Math.random() * 10,
      size: Math.random() * 200 + 250, // 250px - 450px
      delay: Math.random() * -15,
      duration: Math.random() * 15 + 15, // 15s to 30s
      opacity: Math.random() * 0.05 + 0.02,
    }));
  }, []);

  const fallingParticles = useMemo<FallingParticle[]>(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage x coordinate
      size: Math.random() * 4 + 2, // 2px to 6px
      delay: Math.random() * -20, // start negative so they are already spread out immediately
      duration: Math.random() * 12 + 12, // 12s to 24s
      swayDist: Math.random() * 50 + 20, // 20px to 70px sway
      opacity: Math.random() * 0.25 + 0.15,
    }));
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 selection:bg-transparent">
      {/* Dynamic Style Injection for standalone high-performance CSS animations */}
      <style>{`
        @keyframes float-ambient {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -40px) scale(1.08);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes fall-and-sway-anim {
          0% {
            transform: translate3d(0, -5vh, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--sway-x), 105vh, 0) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-ambient-glow {
          will-change: transform;
          animation: float-ambient infinite ease-in-out;
        }
        .animate-falling-gold {
          will-change: transform, opacity;
          animation: fall-and-sway-anim infinite linear;
        }
      `}</style>

      {/* Large Ambient Pulsing Glow Globes */}
      {glowElements.map((glow) => (
        <div
          key={`glow-${glow.id}`}
          className="absolute rounded-full bg-amber-600 animate-ambient-glow filter blur-[150px] mix-blend-screen"
          style={{
            left: `${glow.x}%`,
            top: `${glow.y}%`,
            width: `${glow.size}px`,
            height: `${glow.size}px`,
            opacity: glow.opacity,
            animationDuration: `${glow.duration}s`,
            animationDelay: `${glow.delay}s`,
          }}
        />
      ))}

      {/* Luxury Falling Tiny Gold Flakes / Orbs */}
      {fallingParticles.map((pt) => (
        <div
          key={`pt-${pt.id}`}
          className="absolute rounded-full bg-gradient-to-b from-amber-400 to-amber-600 animate-falling-gold shadow-md"
          style={{
            left: `${pt.left}%`,
            top: 0,
            width: `${pt.size}px`,
            height: `${pt.size}px`,
            opacity: pt.opacity,
            animationDuration: `${pt.duration}s`,
            animationDelay: `${pt.delay}s`,
            // Set custom properties for sway calculation in CSS transform
            ['--sway-x' as any]: `${pt.swayDist}px`,
          }}
        />
      ))}
    </div>
  );
}
