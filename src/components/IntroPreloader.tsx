import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroSoundEngine from '../utils/introAudio';

interface IntroPreloaderProps {
  onComplete: () => void;
}

const WORDS = ['Builder.', 'Architect.', 'Engineer.'];

// Fine SVG noise data URI for the lighter, tactile matte-charcoal cardstock grain
const NOISE_SVG_URI = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`;

function getGridDimensions() {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 640) {
      return { cols: 4, rows: 7 }; // Mobile portrait
    }
    if (window.innerWidth < 1024) {
      return { cols: 6, rows: 6 }; // Tablet
    }
  }
  return { cols: 8, rows: 5 }; // Desktop
}

const IntroPreloader: React.FC<IntroPreloaderProps> = ({ onComplete }) => {
  const [visibleWords, setVisibleWords] = useState(0);
  const [phase, setPhase] = useState<'awaiting-gesture' | 'words' | 'flipping' | 'done'>('words');
  const [{ cols, rows }, setGrid] = useState(getGridDimensions);

  // Origin tile that starts the scatter (defaults to a random tile on each load,
  // and immediately updates to whichever exact tile the user taps or clicks)
  const [originTile, setOriginTile] = useState<{ row: number; col: number }>(() => {
    const initial = getGridDimensions();
    return {
      row: Math.floor(Math.random() * initial.rows),
      col: Math.floor(Math.random() * initial.cols)
    };
  });
  const [tappedTileIndex, setTappedTileIndex] = useState<number | null>(null);
  const [scatterSeed, setScatterSeed] = useState<number>(() => Math.random());

  const soundRef = useRef<IntroSoundEngine>(new IntroSoundEngine());
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sequenceRunningRef = useRef(false);
  const tilesRef = useRef<Array<{ delay: number; col: number }>>([]);

  // Keep grid proportions synced if viewport resizes
  useEffect(() => {
    const handleResize = () => {
      const next = getGridDimensions();
      setGrid(next);
      setOriginTile((prev) => ({
        row: Math.min(prev.row, next.rows - 1),
        col: Math.min(prev.col, next.cols - 1)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Build organic, unpredictable scatter starting from `originTile` (delay = 0)
  const tiles = useMemo(() => {
    // Pseudo-random generator seeded by `scatterSeed` so each load/tap gets a unique scatter pattern
    const seededRandom = (n: number) => {
      const x = Math.sin(scatterSeed * 9999 + n * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };

    const computed = Array.from({ length: cols * rows }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const isOrigin = row === originTile.row && col === originTile.col;

      // Radial distance from the tapped/origin tile
      const dist = Math.hypot(row - originTile.row, col - originTile.col);

      // Unpredictable scatter:
      // - The tapped tile ALWAYS flips first at 0.00s
      // - Immediate neighbors get a quick spark (0.04s - 0.14s)
      // - Remaining tiles combine loose distance bias with heavy random jitter (up to 0.44s)
      //   so the scatter feels organic and non-robotic every single time
      const randA = seededRandom(i * 3 + 1);
      const randB = seededRandom(i * 7 + 2);
      const randC = seededRandom(i * 13 + 5);

      const delay = isOrigin
        ? 0
        : dist <= 1.45
        ? 0.045 + randA * 0.13
        : 0.08 + dist * 0.042 + randA * 0.38 + randB * 0.12;

      // Randomize flip axis & direction per tile so they don't all rotate identically
      const useYAxis = randB > 0.68;
      const flipSign = randC > 0.5 ? -1 : 1;

      return {
        index: i,
        row,
        col,
        isOrigin,
        delay,
        useYAxis,
        flipAngle: 180 * flipSign
      };
    });

    tilesRef.current = computed.map(({ delay, col }) => ({ delay, col }));
    return computed;
  }, [cols, rows, originTile, scatterSeed]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  const runIntroSequence = useCallback(() => {
    if (sequenceRunningRef.current) return;
    sequenceRunningRef.current = true;
    clearAllTimers();

    const sound = soundRef.current;
    setPhase('words');

    const t1 = setTimeout(() => {
      setVisibleWords(1);
      sound.playWordReveal(0);
    }, 120);

    const t2 = setTimeout(() => {
      setVisibleWords(2);
      sound.playWordReveal(1);
    }, 640);

    const t3 = setTimeout(() => {
      setVisibleWords(3);
      sound.playWordReveal(2);
    }, 1160);

    // Begin organic scattered double-sided card flip + stereo paper-flicking sound cascade
    const tFlip = setTimeout(() => {
      setPhase('flipping');
      sound.playTilePaperCascade(cols, rows, tilesRef.current);
    }, 1880);

    // Unmount cleanly and suspend the audio engine once the transition completes
    const tDone = setTimeout(() => {
      sound.suspend();
      setPhase('done');
      onComplete();
    }, 3550);

    timersRef.current = [t1, t2, t3, tFlip, tDone];
  }, [clearAllTimers, cols, rows, onComplete]);

  // Capture the exact tile tapped/clicked by the user to seed the scatter origin
  const handlePointerDownTile = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (phase === 'flipping' || phase === 'done') return;

      const clampedX = Math.max(0, Math.min(window.innerWidth - 1, e.clientX));
      const clampedY = Math.max(0, Math.min(window.innerHeight - 1, e.clientY));
      const tappedCol = Math.floor((clampedX / window.innerWidth) * cols);
      const tappedRow = Math.floor((clampedY / window.innerHeight) * rows);
      const tileIdx = tappedRow * cols + tappedCol;

      setOriginTile({ row: tappedRow, col: tappedCol });
      setTappedTileIndex(tileIdx);
      setScatterSeed(Math.random());

      const sound = soundRef.current;
      sound.tryUnlock().then(() => {
        sound.playTileTap(clampedX / Math.max(window.innerWidth, 1));
        if (!sequenceRunningRef.current) {
          runIntroSequence();
        }
      });
    },
    [cols, rows, phase, runIntroSequence]
  );

  useEffect(() => {
    let cancelled = false;
    const sound = soundRef.current;

    const handleKeyDown = () => {
      sound.tryUnlock().then(() => {
        if (!cancelled && !sequenceRunningRef.current) {
          runIntroSequence();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown, { passive: true });

    sound.tryUnlock().then((unlocked) => {
      if (cancelled) return;
      if (unlocked) {
        runIntroSequence();
      } else {
        setPhase('awaiting-gesture');
      }
    });

    return () => {
      cancelled = true;
      sequenceRunningRef.current = false;
      clearAllTimers();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearAllTimers, runIntroSequence]);

  if (phase === 'done') return null;

  return (
    <div
      onPointerDown={handlePointerDownTile}
      className={`fixed inset-0 z-[100] overflow-hidden ${
        phase === 'flipping' ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
      }`}
      aria-hidden="true"
    >
      {/* Locked Edge-to-Edge Grid of Double-Sided Textured Tiles */}
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}
      >
        {tiles.map(({ index, delay, useYAxis, flipAngle }) => {
          const isTapped = tappedTileIndex === index;
          return (
            <div
              key={index}
              className="relative w-full h-full"
              style={{
                perspective: '1000px'
              }}
            >
              <motion.div
                initial={{ rotateX: 0, rotateY: 0, scale: 1 }}
                animate={
                  phase === 'flipping'
                    ? {
                        rotateX: useYAxis ? 0 : flipAngle,
                        rotateY: useYAxis ? flipAngle : 0,
                        scale: 1
                      }
                    : isTapped
                    ? {
                        rotateX: 0,
                        rotateY: 0,
                        scale: [1, 0.94, 1]
                      }
                    : { rotateX: 0, rotateY: 0, scale: 1 }
                }
                transition={
                  phase === 'flipping'
                    ? {
                        duration: 0.78,
                        delay,
                        ease: [0.45, 0.02, 0.2, 1]
                      }
                    : {
                        duration: 0.28,
                        ease: 'easeOut'
                      }
                }
                style={{
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  transformOrigin: 'center center'
                }}
                className="relative w-full h-full"
              >
                {/* FRONT FACE: Lighter Matte-Charcoal Cardstock (#141416 + SVG Paper Grain & Micro-Dots) */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(0.5px)',
                    backgroundColor: '#141416',
                    backgroundImage: `${NOISE_SVG_URI}, radial-gradient(rgba(255, 255, 255, 0.09) 1.1px, transparent 1.1px)`,
                    backgroundSize: '140px 140px, 24px 24px'
                  }}
                  className={`absolute inset-0 w-full h-full transition-colors ${
                    phase === 'flipping' || isTapped
                      ? 'border-[0.5px] border-white/[0.11] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_18px_35px_rgba(0,0,0,0.45)]'
                      : 'border-[0.5px] border-white/[0.04]'
                  }`}
                >
                  {/* Dynamic Warm Studio Light Sweep as the Front Cardstock Tilts */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={
                      phase === 'flipping'
                        ? { opacity: [0, 0.9, 0] }
                        : isTapped
                        ? { opacity: [0, 0.35, 0.08] }
                        : { opacity: 0 }
                    }
                    transition={
                      phase === 'flipping'
                        ? {
                            duration: 0.45,
                            delay,
                            ease: 'easeInOut'
                          }
                        : { duration: 0.35 }
                    }
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(253, 251, 246, 0.24) 0%, rgba(253, 251, 246, 0.05) 60%, rgba(0, 0, 0, 0.45) 100%)'
                    }}
                  />
                </div>

                {/* BACK FACE: Textured Warm-Cream Dotted Paper (matches flip axis & dissolves into Hero) */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={
                    phase === 'flipping'
                      ? { opacity: [1, 1, 0] }
                      : { opacity: 1 }
                  }
                  transition={{
                    duration: 0.78,
                    delay: phase === 'flipping' ? delay : 0,
                    times: [0, 0.62, 1],
                    ease: 'easeOut'
                  }}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: useYAxis
                      ? 'rotateY(180deg) translateZ(0.5px)'
                      : 'rotateX(180deg) translateZ(0.5px)',
                    backgroundColor: '#FDFBF6',
                    backgroundImage: `${NOISE_SVG_URI}, radial-gradient(rgba(120, 113, 108, 0.26) 1.25px, transparent 1.25px)`,
                    backgroundSize: '140px 140px, 24px 24px'
                  }}
                  className="absolute inset-0 w-full h-full border-[0.5px] border-stone-300/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_12px_24px_rgba(20,33,61,0.12)]"
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Minimal Gesture Prompt when Browser Blocks Autoplay on Refresh */}
      <AnimatePresence>
        {phase === 'awaiting-gesture' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 gap-3 pointer-events-none"
          >
            <span className="font-serif-editorial italic text-2xl sm:text-3xl text-[#FDFBF6]/90 tracking-tight">
              Rinfwang Daspan
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 animate-pulse">
              [ Tap any tile to enter ]
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered Editorial Intro Words ("Builder. Architect. Engineer.") */}
      <AnimatePresence>
        {phase === 'words' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: 'blur(4px)',
              transition: { duration: 0.25, ease: 'easeInOut' }
            }}
            className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
          >
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-4 text-3xl sm:text-5xl md:text-6xl font-serif-editorial font-light tracking-tight text-[#FDFBF6]">
              {WORDS.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                  animate={
                    visibleWords > idx
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 14, filter: 'blur(4px)' }
                  }
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={idx === 2 ? 'italic' : ''}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroPreloader;
