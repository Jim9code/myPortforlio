import React, { useEffect } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

/**
 * Global Inertial / Momentum Smooth Scroll Hook (Lenis-style lerp damping).
 * Adds physical weight, friction, and silky deceleration to wheel/trackpad scrolling
 * as well as anchor links and programmatic smooth-scroll events.
 */
export function useInertialScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect users who explicitly prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let rafId: number | null = null;
    let isAnimating = false;
    let lastFrameTime = performance.now();

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clampTarget = (val: number) => Math.max(0, Math.min(getMaxScroll(), val));

    const updateScroll = (now: number) => {
      const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      // Frame-rate independent exponential friction damping (soft, weighty glide)
      const dampingFactor = 1 - Math.exp(-7.8 * dt);
      const diff = targetY - currentY;

      if (Math.abs(diff) > 0.35) {
        currentY += diff * dampingFactor;
        window.scrollTo(0, currentY);
        rafId = requestAnimationFrame(updateScroll);
      } else {
        currentY = targetY;
        window.scrollTo(0, targetY);
        isAnimating = false;
        rafId = null;
      }
    };

    const startLoop = () => {
      if (!isAnimating) {
        isAnimating = true;
        lastFrameTime = performance.now();
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Allow pinch-to-zoom or scrollable inner modals (like the Cmd+K terminal) to scroll natively
      if (e.ctrlKey) return;
      const targetEl = e.target as HTMLElement | null;
      if (targetEl && targetEl.closest('[data-native-scroll="true"]')) {
        return;
      }

      e.preventDefault();

      // Normalize wheel delta across mouse wheels (line mode) and trackpads (pixel mode)
      const rawDelta =
        e.deltaMode === 1
          ? e.deltaY * 36
          : e.deltaMode === 2
          ? e.deltaY * window.innerHeight
          : e.deltaY;

      // Apply soft friction multiplier (0.78x) so scrolling feels weighted and never too fast
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }

      targetY = clampTarget(targetY + rawDelta * 0.78);
      startLoop();
    };

    // Sync if the user drags the native scrollbar or uses touch/keyboard when wheel loop is idle
    const handleNativeScroll = () => {
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    // Intercept anchor clicks (#projects, #about, etc.) so they glide through the same inertial spring
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const destination = document.querySelector(hash);
      if (destination) {
        e.preventDefault();
        const rect = destination.getBoundingClientRect();
        if (!isAnimating) {
          currentY = window.scrollY;
        }
        targetY = clampTarget(window.scrollY + rect.top);
        startLoop();
      }
    };

    // Support custom programmatic smooth scroll events (e.g., ScrollToTop button or Cmd+K modal)
    const handleCustomScrollTo = (e: Event) => {
      const customEvent = e as CustomEvent<{ top?: number; id?: string }>;
      if (!isAnimating) {
        currentY = window.scrollY;
      }
      if (typeof customEvent.detail?.top === 'number') {
        targetY = clampTarget(customEvent.detail.top);
        startLoop();
      } else if (customEvent.detail?.id) {
        const el = document.getElementById(customEvent.detail.id);
        if (el) {
          targetY = clampTarget(window.scrollY + el.getBoundingClientRect().top);
          startLoop();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('inertial-scroll-to', handleCustomScrollTo);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleNativeScroll);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('inertial-scroll-to', handleCustomScrollTo);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
}

/**
 * Elastic Scroll-Velocity Wrapper.
 * Gives each section a soft, stretchy elastic tension (spring lag + subtle scaleY stretch + fluid skew)
 * that responds to live scroll velocity and settles smoothly back to rest.
 */
export const ElasticSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Soft, damped elastic spring that tracks scroll velocity
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 115,
    damping: 22,
    mass: 0.65
  });

  // Soft vertical spring pull/lag against scroll direction
  const y = useTransform(smoothVelocity, [-2400, 0, 2400], [22, 0, -22]);

  // Subtle vertical elastic stretch as velocity increases
  const scaleY = useTransform(smoothVelocity, [-2400, 0, 2400], [1.026, 1, 1.026]);

  // Gentle organic editorial skew during fast scroll
  const skewY = useTransform(smoothVelocity, [-2400, 0, 2400], [-0.95, 0, 0.95]);

  return (
    <motion.div
      style={{
        y,
        scaleY,
        skewY,
        transformOrigin: 'center center',
        willChange: 'transform'
      }}
    >
      {children}
    </motion.div>
  );
};

