import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(true);

  useEffect(() => {
    // Determine responsive constraints and capabilities
    const checkCapabilities = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      // Also verify if the device supports hover interactions (coarse/fine pointer analysis)
      const supportsHover = window.matchMedia('(any-hover: hover)').matches;
      const isTouchOnly = window.matchMedia('(pointer: coarse)').matches;
      
      const disableCursor = !isLargeScreen || !supportsHover || isTouchOnly;
      setIsMobileOrTablet(disableCursor);

      if (disableCursor) {
        document.documentElement.style.cursor = 'auto';
        document.body.style.cursor = 'auto';
      } else {
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';
      }
    };

    checkCapabilities();
    window.addEventListener('resize', checkCapabilities);

    // Track mouse coordinates without triggering state re-renders
    let mouseX = 0;
    let mouseY = 0;
    let currentRingX = 0;
    let currentRingY = 0;
    let isVisible = false;
    let isHovered = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '0.8';
      }

      // Live update the center dot immediately for snappy responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '0.8';
    };

    // Hover detection using event delegation to scale the outer ring
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.interactive-card');

      isHovered = !!isInteractive;

      if (ringRef.current) {
        if (isInteractive) {
          ringRef.current.style.borderColor = '#f59e0b'; // Amber-500 tint
          ringRef.current.style.backgroundColor = 'rgba(245, 158, 11, 0.08)';
        } else {
          ringRef.current.style.borderColor = '#d97706'; // Amber-600 original
          ringRef.current.style.backgroundColor = 'transparent';
        }
      }
    };

    // Smooth lerp loop for the trailing outer ring, bypassing react triggers completely
    let animFrameId: number;
    const updateRing = () => {
      // Linear interpolation calculation
      currentRingX += (mouseX - currentRingX) * 0.14;
      currentRingY += (mouseY - currentRingY) * 0.14;

      if (ringRef.current) {
        // We read dynamic hover flag from style classes or element checking
        ringRef.current.style.transform = `translate3d(${currentRingX - 18}px, ${currentRingY - 18}px, 0) scale(${isHovered ? 1.6 : 1})`;
      }

      animFrameId = requestAnimationFrame(updateRing);
    };

    // Register high performance events on valid desktop layout
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver);

    // Warm start trail animation
    animFrameId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('resize', checkCapabilities);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animFrameId);
      
      // Always revert browser cursor styles to default on destruction
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (isMobileOrTablet) {
    return null;
  }

  return (
    <>
      {/* Outer elegant trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 pointer-events-none rounded-full border border-amber-600/80 z-50 mix-blend-difference transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: 0,
          willChange: 'transform, opacity',
          transitionProperty: 'background-color, border-color',
          transitionDuration: '200ms',
        }}
      />
      {/* Inner precise high contrast dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none rounded-full bg-amber-400 z-50 mix-blend-difference opacity-0 transition-opacity duration-200 pointer-events-none"
        style={{
          boxShadow: '0 0 12px rgba(245, 158, 11, 0.7)',
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}
