'use client';

import { useRef, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

// Uses refs + RAF throttle instead of state to avoid re-renders on every mousemove
export function useMousePosition(): MousePosition {
  const pos = useRef<MousePosition>({ x: 0, y: 0 });
  const rafScheduled = useRef(false);
  const stablePos = useRef<MousePosition>({ x: 0, y: 0 });

  const update = useCallback(() => {
    stablePos.current = { ...pos.current };
    rafScheduled.current = false;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!rafScheduled.current) {
        rafScheduled.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [update]);

  return pos.current;
}
