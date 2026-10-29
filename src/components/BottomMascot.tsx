import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MascotMode = 'walk' | 'sprint' | 'skid' | 'moonwalk' | 'dance' | 'coffee' | 'poked';

type PassType =
  | 'bug-chase'     // Pass 1: Sprinting across the screen with a bug chasing right behind!
  | 'casual-walk'   // Pass 2: Chill casual walk all the way across
  | 'moonwalk'      // Pass 3: Smooth backslide moonwalk all the way across
  | 'sprint-skid'   // Pass 4: Sprints in, halts with dust in the middle, then sprints out
  | 'walk-coffee';  // Pass 5: Walks in, takes a quick coffee/dance break mid-screen, walks out

const PASS_SEQUENCE: PassType[] = [
  'bug-chase',
  'casual-walk',
  'moonwalk',
  'sprint-skid',
  'walk-coffee'
];

interface DustParticle {
  id: number;
  x: number;
  size: number;
  delay: number;
}

const PASS_QUOTES: Record<PassType, string[]> = {
  'bug-chase': [
    "WHO DEPLOYED THIS BUG?! 🐞💨",
    "IT'S NOT A FEATURE, IT'S CHASING ME!!",
    "hotfix incoming—run!! 🚀",
    "unhandled exception on my heels!!"
  ],
  'casual-walk': [
    "shipping clean code ~",
    "0 warnings, 0 errors ✨",
    "building scalable APIs...",
    "git status -> working tree clean"
  ],
  'moonwalk': [
    "moonwalking through prod ♪",
    "smooth rollback ~ ♫",
    "sliding into the merge queue ♪",
    "backsliding past legacy code ~"
  ],
  'sprint-skid': [
    "benchmarking at 10,000 req/s!!",
    "deploying to mainnet—hold up!",
    "gotta catch that race condition!"
  ],
  'walk-coffee': [
    "turning coffee into backend architecture ☕",
    "deploy succeeded on Friday!! ♪",
    "refueling caffeine buffer ☕"
  ]
};

const POKE_QUOTES = [
  "Hey! Don't poke while I'm compiling!",
  "Whoa! You almost knocked my semicolon off!",
  "Ouch! That's a protected endpoint!",
  "429 Too Many Pokes!! Rate limit exceeded!",
  "DDoS attack detected!! Initiating turbo dash!"
];

const BottomMascot: React.FC = () => {
  const [xPos, setXPos] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth * 0.65;
    }
    return 500;
  });
  // -1 = moving/facing left, 1 = moving/facing right
  const [facing, setFacing] = useState<-1 | 1>(-1);
  const [passType, setPassType] = useState<PassType>('bug-chase');
  const [mode, setMode] = useState<MascotMode>('sprint');
  const [quote, setQuote] = useState<string>("IT'S NOT A FEATURE, IT'S CHASING ME!!");
  const [isHovered, setIsHovered] = useState(false);
  const [pokeStreak, setPokeStreak] = useState(0);
  const [dustParticles, setDustParticles] = useState<DustParticle[]>([]);
  const [doBackflip, setDoBackflip] = useState(false);

  const posRef = useRef(xPos);
  const facingRef = useRef<-1 | 1>(-1);
  const passIndexRef = useRef(0);
  const passTypeRef = useRef<PassType>('bug-chase');
  const modeRef = useRef<MascotMode>('sprint');
  const velocityRef = useRef<number>(-2.8);
  const hoveredRef = useRef(false);
  const midPassTriggeredRef = useRef(false);
  const pokeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const midStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particleIdRef = useRef(0);

  useEffect(() => {
    hoveredRef.current = isHovered;
  }, [isHovered]);

  const spawnDust = (count = 5) => {
    const newParticles: DustParticle[] = Array.from({ length: count }).map((_, idx) => ({
      id: ++particleIdRef.current,
      x: (idx - 1.5) * 9,
      size: 6 + Math.random() * 7,
      delay: idx * 0.04
    }));
    setDustParticles(newParticles);
    setTimeout(() => {
      setDustParticles([]);
    }, 750);
  };

  // Start a new full-screen pass with a single cohesive motion theme
  const startNewPass = (nextPassIndex: number, enterFromSide?: 'left' | 'right') => {
    if (midStopTimeoutRef.current) {
      clearTimeout(midStopTimeoutRef.current);
    }

    const nextPass = PASS_SEQUENCE[nextPassIndex % PASS_SEQUENCE.length];
    passIndexRef.current = nextPassIndex;
    passTypeRef.current = nextPass;
    setPassType(nextPass);
    midPassTriggeredRef.current = false;

    const quotes = PASS_QUOTES[nextPass];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Pick initial mode for this pass
    let initialMode: MascotMode = 'walk';
    if (nextPass === 'bug-chase' || nextPass === 'sprint-skid') {
      initialMode = 'sprint';
    } else if (nextPass === 'moonwalk') {
      initialMode = 'moonwalk';
    } else {
      initialMode = 'walk';
    }

    modeRef.current = initialMode;
    setMode(initialMode);

    // Position at the entry edge
    const offscreenLeft = -135;
    const offscreenRight = window.innerWidth + 35;

    if (enterFromSide === 'left') {
      posRef.current = offscreenLeft;
      // Moving right across the screen; if moonwalking, face left (-1) so it slides right!
      facingRef.current = nextPass === 'moonwalk' ? -1 : 1;
      setFacing(facingRef.current);
    } else if (enterFromSide === 'right') {
      posRef.current = offscreenRight;
      // Moving left across the screen; if moonwalking, face right (1) so it slides left!
      facingRef.current = nextPass === 'moonwalk' ? 1 : -1;
      setFacing(facingRef.current);
    }
  };

  // 60fps physics & single-pass movement loop
  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const currentMode = modeRef.current;
      const currentPass = passTypeRef.current;
      const offscreenLeft = -140;
      const offscreenRight = window.innerWidth + 40;

      // Direction of actual travel across the screen (-1 = moving left, +1 = moving right)
      const travelDir = currentMode === 'moonwalk' ? -facingRef.current : facingRef.current;

      let targetSpeed = 0;

      if (hoveredRef.current && currentMode !== 'poked' && currentMode !== 'skid') {
        targetSpeed = 0;
      } else {
        switch (currentMode) {
          case 'walk':
            targetSpeed = travelDir * 0.95;
            break;
          case 'sprint':
            targetSpeed = travelDir * (currentPass === 'bug-chase' ? 2.65 : 2.95);
            break;
          case 'skid':
            velocityRef.current *= 0.90;
            targetSpeed = velocityRef.current;
            break;
          case 'moonwalk':
            targetSpeed = travelDir * 1.15;
            break;
          case 'dance':
          case 'coffee':
          case 'poked':
            targetSpeed = 0;
            break;
        }
      }

      if (currentMode !== 'skid') {
        velocityRef.current = targetSpeed;
      }

      let nextX = posRef.current + velocityRef.current;

      // Check if we reached the middle of the screen for passes that have a mid-pass signature move
      const centerScreen = window.innerWidth * 0.48;
      if (
        !midPassTriggeredRef.current &&
        Math.abs(nextX - centerScreen) < 18 &&
        currentMode !== 'poked'
      ) {
        if (currentPass === 'sprint-skid') {
          midPassTriggeredRef.current = true;
          modeRef.current = 'skid';
          setMode('skid');
          setQuote("screeech— halted at breakpoint! 💨");
          spawnDust(6);

          midStopTimeoutRef.current = setTimeout(() => {
            if (modeRef.current === 'skid') {
              modeRef.current = 'sprint';
              setMode('sprint');
              setQuote("tests green! resuming sprint 🚀");
            }
          }, 1250);
        } else if (currentPass === 'walk-coffee') {
          midPassTriggeredRef.current = true;
          const stopMode: MascotMode = Math.random() > 0.5 ? 'coffee' : 'dance';
          modeRef.current = stopMode;
          setMode(stopMode);
          setQuote(
            stopMode === 'coffee'
              ? "quick espresso sip mid-pass ☕"
              : "vibe check: 200 OK ♪ ♫"
          );

          midStopTimeoutRef.current = setTimeout(() => {
            if (modeRef.current === stopMode) {
              modeRef.current = 'walk';
              setMode('walk');
            }
          }, 2200);
        }
      }

      // When the mascot exits either side of the screen, start the NEXT pass with a new motion!
      if (nextX < offscreenLeft) {
        // Exited left -> re-enter from right (or occasionally left) with the next pass motion
        const enterSide = Math.random() < 0.75 ? 'right' : 'left';
        startNewPass(passIndexRef.current + 1, enterSide);
        nextX = posRef.current;
      } else if (nextX > offscreenRight) {
        // Exited right -> re-enter from left (or occasionally right) with the next pass motion
        const enterSide = Math.random() < 0.75 ? 'left' : 'right';
        startNewPass(passIndexRef.current + 1, enterSide);
        nextX = posRef.current;
      }

      posRef.current = nextX;
      setXPos(nextX);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Interactive Poke Handler
  const handlePoke = () => {
    if (pokeTimeoutRef.current) {
      clearTimeout(pokeTimeoutRef.current);
    }
    if (midStopTimeoutRef.current) {
      clearTimeout(midStopTimeoutRef.current);
    }

    const nextStreak = pokeStreak + 1;
    setPokeStreak(nextStreak);
    spawnDust(5);

    const chosenQuote =
      nextStreak >= 3
        ? POKE_QUOTES[Math.min(nextStreak - 1, POKE_QUOTES.length - 1)]
        : POKE_QUOTES[(nextStreak - 1) % 3];

    if (nextStreak >= 3) {
      setDoBackflip(true);
      setTimeout(() => setDoBackflip(false), 600);
    }

    modeRef.current = 'poked';
    setMode('poked');
    setQuote(chosenQuote);

    pokeTimeoutRef.current = setTimeout(() => {
      setPokeStreak(0);
      // Resume or bolt out to finish the pass
      modeRef.current = 'sprint';
      setMode('sprint');
      setQuote("Gotta run before you poke again!! 💨");
    }, 1400);
  };

  const isMovingWalk = mode === 'walk' && !isHovered;
  const isMovingSprint = mode === 'sprint' && !isHovered;
  const isMovingMoonwalk = mode === 'moonwalk' && !isHovered;
  const isDancing = mode === 'dance';

  const leg1Class = isMovingSprint
    ? 'mascot-leg-sprint-1'
    : isMovingMoonwalk
    ? 'mascot-leg-moonwalk-1'
    : isMovingWalk
    ? 'mascot-leg-walk-1'
    : '';

  const leg2Class = isMovingSprint
    ? 'mascot-leg-sprint-2'
    : isMovingMoonwalk
    ? 'mascot-leg-moonwalk-2'
    : isMovingWalk
    ? 'mascot-leg-walk-2'
    : '';

  const bodyClass = isMovingSprint
    ? 'mascot-body-sprint'
    : isDancing
    ? 'mascot-body-dance'
    : isMovingWalk || isMovingMoonwalk
    ? 'mascot-body-walk'
    : '';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none select-none overflow-hidden h-44"
      aria-hidden="true"
    >
      <div
        style={{ transform: `translate3d(${xPos}px, 0, 0)` }}
        className="absolute bottom-0 left-0 pointer-events-auto cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePoke}
        title="Poke me!"
      >
        {/* Speech Bubble (never mirrored so text is always crisp) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quote}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="mb-1.5 flex justify-center"
          >
            <div
              className={`px-3.5 py-1 rounded-full backdrop-blur-xs border-[1.5px] text-xs font-medium tracking-tight whitespace-nowrap shadow-xs transition-colors ${
                mode === 'poked'
                  ? 'bg-amber-50 border-amber-900 text-amber-950 font-semibold'
                  : 'bg-[#FDFBF6]/95 border-[#14213D] text-[#14213D]'
              }`}
            >
              {quote}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Music / Sparkle / Shock Notes */}
        <AnimatePresence>
          {(mode === 'dance' || mode === 'moonwalk') && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 1, 0], y: -18, x: [0, 6, -4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="absolute -top-2 right-2 text-xs font-bold text-amber-600 pointer-events-none"
            >
              ♪ ♫
            </motion.div>
          )}
          {mode === 'poked' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1.2, y: -12 }}
              exit={{ opacity: 0 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-rose-600 pointer-events-none"
            >
              ⚡ ! ⚡
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Container (flips horizontally based on facing direction) */}
        <motion.div
          animate={{
            scaleX: facing === -1 ? 1 : -1,
            y: mode === 'poked' ? -14 : 0,
            rotate: doBackflip ? 360 : mode === 'skid' ? 14 : mode === 'moonwalk' ? 6 : 0
          }}
          transition={{
            y: { type: 'spring', stiffness: 450, damping: 14 },
            rotate: { duration: doBackflip ? 0.5 : 0.25 },
            scaleX: { duration: 0.18 }
          }}
          className="relative flex items-end justify-center px-3"
        >
          {/* Speed Lines when Sprinting */}
          {mode === 'sprint' && !isHovered && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 pointer-events-none">
              <motion.div
                animate={{ x: [0, 14], opacity: [0.8, 0] }}
                transition={{ duration: 0.25, repeat: Infinity }}
                className="w-5 h-0.5 bg-[#14213D]/40 rounded-full"
              />
              <motion.div
                animate={{ x: [0, 18], opacity: [0.8, 0] }}
                transition={{ duration: 0.25, delay: 0.08, repeat: Infinity }}
                className="w-7 h-0.5 bg-[#14213D]/30 rounded-full"
              />
              <motion.div
                animate={{ x: [0, 12], opacity: [0.8, 0] }}
                transition={{ duration: 0.25, delay: 0.15, repeat: Infinity }}
                className="w-4 h-0.5 bg-[#14213D]/40 rounded-full"
              />
            </div>
          )}

          {/* Skid / Poke Dust Cloud Puffs at the feet */}
          <AnimatePresence>
            {dustParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0.85, scale: 0.4, x: p.x - 10, y: -2 }}
                animate={{ opacity: 0, scale: 1.7, x: p.x - 26, y: -14 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: p.delay, ease: 'easeOut' }}
                style={{ width: p.size, height: p.size }}
                className="absolute bottom-1 left-6 rounded-full bg-stone-400/60 border border-stone-500/30 pointer-events-none"
              />
            ))}
          </AnimatePresence>

          {/* Floating Companion Drone / Terminal Node Orb */}
          <motion.svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            animate={{
              y: [0, -6, 0],
              rotate: mode === 'poked' ? [0, -20, 20, 0] : [0, 5, -5, 0]
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-10 mr-1"
          >
            <circle
              cx="11"
              cy="11"
              r="8.5"
              stroke="#14213D"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <circle cx="11" cy="11" r="5.5" fill="#14213D" />
            <circle
              cx="9"
              cy="10.5"
              r="1.6"
              fill={mode === 'poked' ? '#F59E0B' : '#38BDF8'}
            />
          </motion.svg>

          {/* Original "Byte" Hoodie Cyber-Coder Mascot SVG */}
          <svg
            width="68"
            height="86"
            viewBox="0 0 68 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={bodyClass}
          >
            {/* Back Leg & Sneaker */}
            <g className={leg2Class}>
              <path
                d="M39 60L42 77"
                stroke="#0F172A"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <rect x="35" y="76" width="11" height="5.5" rx="2.75" fill="#1E293B" />
              <line x1="35" y1="80.5" x2="46" y2="80.5" stroke="#FDFBF6" strokeWidth="1.5" />
            </g>

            {/* Front Leg & Sneaker */}
            <g className={leg1Class}>
              <path
                d="M31 60L28 78"
                stroke="#14213D"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <rect x="21" y="77" width="12" height="5.5" rx="2.75" fill="#14213D" />
              <line x1="21" y1="81.5" x2="33" y2="81.5" stroke="#F59E0B" strokeWidth="1.6" />
            </g>

            {/* Oversized Developer Hoodie Torso */}
            <path
              d="M19 38C19 32.4772 23.4772 28 29 28H41C46.5228 28 51 32.4772 51 38V58C51 61.3137 48.3137 64 45 64H25C21.6863 64 19 61.3137 19 58V38Z"
              fill="#14213D"
            />

            {/* Hoodie Kangaroo Pocket */}
            <path d="M23 50H39L41 60H21L23 50Z" fill="#1E325C" />

            {/* Hoodie Drawstrings */}
            <path
              d="M29 33V43M35 33V41"
              stroke="#FDFBF6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Dev Badge on Chest */}
            <circle cx="42" cy="40" r="3" fill="#F59E0B" />

            {/* Hood & Head Silhouette */}
            <rect x="16" y="8" width="36" height="27" rx="13.5" fill="#14213D" />
            <rect x="18.5" y="11" width="28" height="21" rx="10.5" fill="#0B1325" />

            {/* Studio Over-Ear Headphones */}
            <path
              d="M20 20C20 10.5 26 6 34 6C42 6 48 10.5 48 20"
              stroke="#F59E0B"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <rect
              x="44"
              y="16"
              width="7"
              height="11"
              rx="3.5"
              fill="#F59E0B"
              stroke="#14213D"
              strokeWidth="1.5"
            />

            {/* Dynamic LED Visor / Facial Expressions */}
            {mode === 'poked' ? (
              <g>
                <path
                  d="M23 18L27 21L23 24"
                  stroke="#F59E0B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M37 18L33 21L37 24"
                  stroke="#F59E0B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="30" cy="26" r="2" fill="#F59E0B" />
              </g>
            ) : mode === 'dance' || mode === 'coffee' ? (
              <g>
                <path
                  d="M22.5 22C23.5 19 26.5 19 27.5 22"
                  stroke="#38BDF8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M32.5 22C33.5 19 36.5 19 37.5 22"
                  stroke="#38BDF8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M28 25.5C29.2 27 31 27 32.2 25.5"
                  stroke="#38BDF8"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </g>
            ) : mode === 'sprint' || mode === 'skid' ? (
              <g>
                <line
                  x1="22"
                  y1="19"
                  x2="27.5"
                  y2="21"
                  stroke="#38BDF8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <line
                  x1="32"
                  y1="21"
                  x2="37.5"
                  y2="19"
                  stroke="#38BDF8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <g>
                <rect x="23" y="18" width="4" height="6.5" rx="2" fill="#38BDF8" />
                <rect x="33" y="18" width="4" height="6.5" rx="2" fill="#38BDF8" />
              </g>
            )}

            {/* Arms */}
            {mode === 'sprint' ? (
              <path
                d="M38 40L56 34"
                stroke="#1E325C"
                strokeWidth="6"
                strokeLinecap="round"
              />
            ) : mode === 'dance' || mode === 'poked' ? (
              <g>
                <path
                  d="M21 40L12 28"
                  stroke="#1E325C"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <path
                  d="M46 40L55 28"
                  stroke="#1E325C"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
              </g>
            ) : mode === 'coffee' ? (
              <g>
                <path
                  d="M24 44L14 39"
                  stroke="#1E325C"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <rect
                  x="6"
                  y="32"
                  width="9"
                  height="10"
                  rx="2"
                  fill="#FDFBF6"
                  stroke="#14213D"
                  strokeWidth="1.5"
                />
                <path d="M15 34.5H17V39.5H15" stroke="#14213D" strokeWidth="1.4" />
                <path
                  d="M9 29C9 27.5 10.5 27.5 10.5 26M12.5 29C12.5 27.5 14 27.5 14 26"
                  stroke="#78716C"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <path
                d="M36 39C40 44 39 50 34 53"
                stroke="#1E325C"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Chasing Bug (Appears right behind the mascot during the 'bug-chase' pass!) */}
          {passType === 'bug-chase' && (
            <motion.svg
              width="30"
              height="22"
              viewBox="0 0 28 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                y: !isHovered ? [0, -2.5, 0] : 0,
                x: !isHovered ? [0, -3, 0] : 0
              }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="mb-0.5 ml-2"
            >
              {/* Antennae pointing toward the mascot */}
              <path
                d="M7 9C4.5 6 2.5 5.5 1.5 6.5"
                stroke="#14213D"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M9 8C7 4.5 5 4 4 5"
                stroke="#14213D"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* Bug Body */}
              <path
                d="M6 13.5C6 9.35786 10.0294 6 15 6C19.9706 6 24 9.35786 24 13.5C24 15.2 22.8 16 21 16H9C7.2 16 6 15.2 6 13.5Z"
                fill="#14213D"
              />
              {/* Glowing red/amber bug eye */}
              <circle cx="8.5" cy="11.5" r="1.3" fill="#F59E0B" />
              {/* Scurrying Legs */}
              <path
                d="M10 15.5L8.5 19M13 15.5L12 19M17 15.5L17.5 19M20 15.5L21.5 19"
                stroke="#14213D"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </motion.svg>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BottomMascot;
