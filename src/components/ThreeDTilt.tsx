import React, { useRef, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Higher numbers mean LESS tilt (acts as divider)
}

export default function ThreeDTilt({ children, className = '', intensity = 20 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkCapabilitiesAndSetup = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isDisabled = isTouch || window.innerWidth < 1024;

      if (isDisabled) {
        el.style.transform = 'none';
        return;
      }

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();

        // Mouse position relative to the element
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate normalized position from center (-0.5 to 0.5)
        const normX = x / rect.width - 0.5;
        const normY = y / rect.height - 0.5;

        // Calculate precise tilt angles
        const rotateX = -(normY * (300 / intensity)).toFixed(2);
        const rotateY = (normX * (300 / intensity)).toFixed(2);

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
        el.style.zIndex = '10';
      };

      const handleMouseLeave = () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        el.style.zIndex = 'auto';
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    };

    const cleanup = checkCapabilitiesAndSetup();
    return () => {
      if (cleanup) cleanup();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`interactive-card cursor-pointer ${className}`}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
