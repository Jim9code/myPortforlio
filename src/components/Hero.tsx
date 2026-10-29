import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  User,
  Briefcase,
  Layers,
  BookOpen,
  Terminal,
  X
} from 'lucide-react';

const CYCLING_WORDS = ['scale.', 'transact.', 'connect.', 'build.'];

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 17 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const XBrandIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<
    { cmd?: string; output: string }[]
  >([
    {
      output:
        'rinfwang-os v2.4.0 — Type "help", "stack", "work", or "contact" and press Enter.'
    }
  ]);

  // Scroll-Linked Hero Recede
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.08]);
  const heroScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.85], [0, 65]);

  // Cycle the italic action word smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut: Cmd+K or Ctrl+K to toggle interactive terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsTerminalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    window.dispatchEvent(
      new CustomEvent('inertial-scroll-to', { detail: { id } })
    );
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = terminalInput.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();

    let reply = '';
    if (cmd === 'help') {
      reply = 'Available commands: whoami, stack, work, experience, contact, clear';
    } else if (cmd === 'whoami') {
      reply =
        'Rinfwang Daspan — Software Engineer building resilient backends, distributed systems, and smart contracts.';
    } else if (cmd === 'stack' || cmd === 'skills') {
      reply =
        'Core Stack: Node.js, TypeScript, Express, Laravel, Solidity, React, Svelte, PostgreSQL, Redis, Docker.';
      scrollToSection('skills');
    } else if (cmd === 'work' || cmd === 'projects') {
      reply = 'Navigating to Selected Work (Nexflo, EasyBuy, Ocean Pulse)...';
      scrollToSection('projects');
    } else if (cmd === 'experience') {
      reply = 'Navigating to Work Experience...';
      scrollToSection('experience');
    } else if (cmd === 'contact') {
      reply =
        'Opening Contact section (rinfwang4@gmail.com | WhatsApp: +234 701 427 8746)...';
      scrollToSection('contact');
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      reply = `zsh: command not found: ${raw}. Type "help" for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: raw, output: reply }]);
    setTerminalInput('');
  };

  const navLinks = [
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Work', icon: Briefcase },
    { id: 'skills', label: 'Stack', icon: Layers },
    { id: 'experience', label: 'Experience', icon: BookOpen }
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-[100dvh] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12 sm:py-16 relative bg-transparent"
    >
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="max-w-[1320px] w-full mx-auto relative z-10 origin-top"
      >
        {/* ROW 1: Minimal Top Corner Header Bar + Self-Drawing Hairline Rule */}
        <div className="relative pb-3.5">
          <div className="flex items-center justify-between text-xs sm:text-[13px] font-medium text-stone-800 tracking-tight">
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Rinfwang Daspan
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Software Engineer
            </motion.span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-stone-300/55 origin-left"
          />
        </div>

        {/* ROW 2: Monumental 3-Line Serif Statement */}
        <div className="mt-7 sm:mt-9 mb-10 sm:mb-14">
          <h1 className="font-serif-editorial text-[2.85rem] sm:text-[4.6rem] md:text-[5.8rem] lg:text-[6.8rem] xl:text-[7.4rem] font-normal leading-[1.02] tracking-[-0.025em] text-stone-950">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Engineering systems that
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                power how people
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block relative min-w-[4ch]"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={CYCLING_WORDS[wordIndex]}
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="italic font-normal inline-block"
                  >
                    {CYCLING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </span>
          </h1>
        </div>

        {/* ROW 3 & 4: Bottom Architectural Ledger */}
        <div className="space-y-7">
          {/* ROW 3: Quiet One-Liner Bio (Left) + Staggered Vertical Icon Navigation (Right) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-1">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-[15px] text-stone-400 leading-relaxed max-w-lg"
            >
              I architect systems with precision. Specializing in{' '}
              <span className="text-stone-900 font-medium">
                scalable backends &amp; smart contracts
              </span>
              .
            </motion.p>

            {/* Vertical Navigation Stack on Right */}
            <nav
              aria-label="Section navigation"
              className="flex flex-col items-start gap-2.5 text-xs sm:text-[13px] text-stone-500 sm:pr-4"
            >
              {navLinks.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.38 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-3 hover:text-stone-950 transition-colors group"
                  >
                    <IconComponent
                      size={14}
                      strokeWidth={1.6}
                      className="text-stone-400 group-hover:text-stone-950 transition-colors"
                    />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* ROW 4: Self-Drawing Hairline Divider + Social Icons (Left) & Command Pill (Right) */}
          <div className="relative pt-5 flex items-center justify-between">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.95, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-[1px] bg-stone-300/55 origin-left"
            />

            <div className="flex items-center gap-4 sm:gap-5 text-stone-400">
              {[
                {
                  href: 'https://github.com/Jim9code/',
                  label: 'GitHub',
                  icon: Github,
                  external: true
                },
                {
                  href: 'https://www.linkedin.com/in/rinfwang-yusuf-daspan-b95b772b9',
                  label: 'LinkedIn',
                  icon: Linkedin,
                  external: true
                },
                {
                  href: 'https://x.com/Jethrinfwang',
                  label: 'X (Twitter)',
                  icon: XBrandIcon,
                  external: true
                },
                {
                  href: 'https://www.instagram.com/thissoftwareguy?dlrf=azhmaDRrOXp6OHll',
                  label: 'Instagram',
                  icon: Instagram,
                  external: true
                },
                {
                  href: 'https://www.tiktok.com/@thissoftwareguy',
                  label: 'TikTok',
                  icon: TikTokIcon,
                  external: true
                },
                {
                  href: 'https://wa.me/2347014278746',
                  label: 'WhatsApp',
                  icon: WhatsAppIcon,
                  external: true
                },
                {
                  href: 'mailto:rinfwang4@gmail.com',
                  label: 'Email',
                  icon: Mail,
                  external: false
                }
              ].map((soc, idx) => {
                const SocIcon = soc.icon;
                return (
                  <motion.a
                    key={soc.label}
                    href={soc.href}
                    target={soc.external ? '_blank' : undefined}
                    rel={soc.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.55 + idx * 0.07 }}
                    className="hover:text-stone-950 transition-colors duration-200"
                    aria-label={soc.label}
                  >
                    <SocIcon size={17} strokeWidth={1.6} />
                  </motion.a>
                );
              })}
            </div>

            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              onClick={() => setIsTerminalOpen(true)}
              className="bg-stone-950 text-[#FDFBF6] px-4 py-1.5 rounded-full text-xs font-medium tracking-tight hover:bg-stone-800 transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span className="font-mono text-[11px] text-stone-400">⌘K</span>
              <span>Terminal</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Interactive ⌘K Terminal Modal */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsTerminalOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-[#0D0E12] text-stone-200 border border-white/10 shadow-2xl overflow-hidden font-mono text-xs"
            >
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-stone-400" />
                  <span className="text-stone-400">rinfwang@dev: ~ (zsh)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTerminalOpen(false)}
                  className="text-stone-400 hover:text-white transition-colors"
                  aria-label="Close terminal"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                <div className="text-emerald-400">
                  $ console.log(&quot;Hello, World!&quot;);
                </div>
                {terminalHistory.map((item, i) => (
                  <div key={i} className="space-y-1">
                    {item.cmd && (
                      <div className="text-stone-400">
                        <span className="text-sky-400">➜</span> ~ {item.cmd}
                      </div>
                    )}
                    <div className="text-stone-300 leading-relaxed">{item.output}</div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleTerminalSubmit}
                className="px-4 py-3 border-t border-white/10 flex items-center gap-2 bg-white/[0.01]"
              >
                <span className="text-sky-400">➜</span>
                <span className="text-stone-500">~</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type a command (help, work, stack, contact)..."
                  autoFocus
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-stone-600"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
