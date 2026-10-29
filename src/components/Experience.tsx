import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  type?: string;
  location: string;
  period: string;
  technologies?: string[];
  description: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: 'Lead Node.js Backend Engineer',
      company: 'Ocean Pulse',
      companyUrl: 'https://oceanpulse.tech/home',
      type: 'Lead Role',
      location: 'Abuja, NG',
      period: '2024 — Present',
      technologies: [
        'Node.js',
        'Express',
        'TypeScript',
        'PostgreSQL',
        'Redis',
        'Microservices',
        'REST APIs'
      ],
      description: [
        'Lead the core backend architecture, designing scalable RESTful APIs and distributed server systems using Node.js.',
        'Architect high-performance database schemas, query optimizations, and caching layers for enterprise clients.',
        'Build secure authentication pipelines, business logic workflows, and microservices for scalable platforms.',
        'Direct technical decision-making, API design standards, code reviews, and CI/CD deployment pipelines.'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'Nexflo',
      companyUrl: 'https://www.nexfloapp.com/',
      type: 'Freelance & Maintenance',
      location: 'Remote',
      period: '2026 — Present',
      technologies: [
        'Svelte',
        'Node.js',
        'Express',
        'Meta Graph API',
        'Tailwind CSS',
        'Webhooks'
      ],
      description: [
        'Architected and built the entire Nexflo platform end-to-end from scratch as the sole software engineer.',
        'Engineered real-time Instagram Comment & DM lead generation engine integrated with the Meta Graph API.',
        'Implemented custom keyword triggers, automated conversation funnels, and CRM contact synchronization.',
        'Continue to provide active system maintenance, performance optimization, server monitoring, and feature updates.'
      ]
    },
    {
      title: 'Junior Developer',
      company: 'TheTravelHunters',
      type: 'Full-time',
      location: 'Abuja, NG',
      period: '2024 — 2025',
      technologies: ['JavaScript', 'React', 'Node.js', 'MySQL', 'MongoDB', 'REST APIs'],
      description: [
        'Developed dynamic, responsive web interfaces and integrated backend REST endpoints.',
        'Implemented database schemas, query optimizations, and user authentication mechanisms.',
        'Collaborated with the engineering team in agile sprints, participating in code reviews and release planning.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 sm:px-10 lg:px-16 bg-transparent relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Editorial Heading Column (stays still until the end of the section) */}
          <div className="md:col-span-4 md:sticky md:top-28 self-start">
            <motion.h2
              initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-editorial text-4xl sm:text-5xl font-normal text-stone-950 tracking-tight leading-[1.08] mb-4"
            >
              Work <br className="hidden md:block" />
              Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-stone-500 leading-relaxed max-w-xs"
            >
              Engineering roles leading backend architecture, crafting software platforms, and
              maintaining production systems.
            </motion.p>
          </div>

          {/* Right Multi-Column Cardless Editorial Ledger with Individual Staggered Animations */}
          <div className="md:col-span-8 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-full bg-stone-300/75 origin-left"
            />
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="py-10">
                  {/* Period & Location Kicker */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-center justify-between gap-2 mb-3"
                  >
                    <span className="font-mono text-xs text-stone-500 uppercase tracking-wider">
                      {exp.period} · {exp.location}
                    </span>
                    {exp.type && (
                      <span className="font-mono text-[11px] text-stone-400">
                        {exp.type}
                      </span>
                    )}
                  </motion.div>

                  {/* Role & Company */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-baseline justify-between gap-2 mb-5"
                  >
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-stone-950">
                      {exp.title}
                    </h3>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-stone-800 hover:text-stone-950 transition-colors"
                      >
                        <span>— {exp.company}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-stone-700">
                        — {exp.company}
                      </span>
                    )}
                  </motion.div>

                  {/* Highlights (Each Bullet Animates Individually) */}
                  <ul className="space-y-2.5 mb-5">
                    {exp.description.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1 + itemIndex * 0.07,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="text-stone-600 text-sm sm:text-base leading-relaxed flex items-start gap-3"
                      >
                        <span className="text-stone-400 select-none">—</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Subtle Inline Stack (Each Tag Animates Individually) */}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-x-2 gap-y-1 pt-2">
                      {exp.technologies.map((tech, tIdx) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.18 + tIdx * 0.04,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className="font-mono text-xs text-stone-400"
                        >
                          {tech}
                          {tIdx < exp.technologies!.length - 1 && (
                            <span className="ml-2 text-stone-300">/</span>
                          )}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1px] w-full bg-stone-300/75 origin-left"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
