import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { number: '3+', label: 'Years Coding' },
    { number: '50+', label: 'Projects Built' },
    { number: '∞', label: 'Cups of Coffee' },
    { number: '24/7', label: 'Learning Mode' }
  ];

  const paragraphs = [
    "I'm a software engineer with a deep focus on backend systems, high-performance web architecture, and Web3 technologies. My journey into tech began with curiosity about how complex distributed systems operate behind the scenes, and that curiosity has driven me to build robust, scalable applications.",
    "I thrive on solving complex problems through clean, maintainable code. Whether it's designing high-throughput RESTful APIs, optimizing database queries, building production software platforms, or developing smart contracts on Ethereum/EVM, I approach each challenge with precision and creativity.",
    "When I'm not coding, you'll find me exploring new Web3 protocols, contributing to open-source projects, or diving deeper into distributed system design."
  ];

  const pillars = [
    {
      index: '01',
      title: 'Frontend Development',
      description:
        'Creating intuitive, fast user interfaces with React, Svelte, and modern TypeScript.'
    },
    {
      index: '02',
      title: 'Backend Engineering',
      description:
        'Building scalable APIs, microservices, and robust database architectures with Node.js and Laravel.'
    },
    {
      index: '03',
      title: 'Web3 & Smart Contracts',
      description:
        'Developing decentralized applications, writing Solidity smart contracts, and EVM integration.'
    }
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-10 lg:px-16 relative bg-transparent">
      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Editorial Section Header */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-editorial text-4xl sm:text-5xl font-normal text-stone-950 tracking-tight mb-3"
          >
            About
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-stone-800 max-w-2xl font-normal"
          >
            I engineer resilient backend systems and decentralized protocols that scale gracefully.
          </motion.p>
        </div>

        {/* Open-Air Typographic Stats Row with Self-Drawing Top & Bottom Lines + Staggered Counters */}
        <div className="relative py-8 mb-14">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-stone-300/75 origin-left"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.09,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="space-y-1"
              >
                <div className="font-serif-editorial text-3xl sm:text-4xl text-stone-950">
                  {stat.number}
                </div>
                <div className="text-xs uppercase tracking-widest text-stone-500 font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-stone-300/75 origin-left"
          />
        </div>

        {/* Two-Column Editorial Narrative & Numbered Focus Rows (Each Animated Individually) */}
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-6 space-y-5 text-stone-700 text-base leading-relaxed">
            {paragraphs.map((text, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <div className="md:col-span-6 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-full bg-stone-300/75 origin-left"
            />
            {pillars.map((pillar, idx) => (
              <div key={pillar.index} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="py-6 group"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif-editorial text-2xl text-stone-950">
                      {pillar.title}
                    </h3>
                    <span className="font-mono text-xs text-stone-400 group-hover:text-stone-900 transition-colors">
                      {pillar.index}
                    </span>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{pillar.description}</p>
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.85,
                    delay: 0.08 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="h-[1px] w-full bg-stone-300/75 origin-left"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Full-Width Link Row with Self-Drawing Bottom Line */}
        <div className="mt-16 pt-4 relative">
          <a
            href="#contact"
            className="w-full pb-4 flex items-center justify-between text-stone-950 group"
          >
            <motion.span
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight group-hover:italic transition-all block"
            >
              Let&apos;s collaborate on your next system
            </motion.span>
            <ArrowUpRight
              size={24}
              className="text-stone-500 group-hover:text-stone-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] w-full bg-stone-300/80 origin-left"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
