import React from 'react';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      index: '01',
      title: 'Backend Engineering',
      skills: [
        'Node.js',
        'Express',
        'Laravel',
        'PHP',
        'REST APIs',
        'GraphQL',
        'Microservices',
        'Authentication'
      ]
    },
    {
      index: '02',
      title: 'Web3 & Blockchain',
      skills: [
        'Solidity',
        'Smart Contracts',
        'Ethers.js',
        'Web3.js',
        'Hardhat',
        'Foundry',
        'Ethereum / EVM',
        'ERC-20 / ERC-721',
        'IPFS'
      ]
    },
    {
      index: '03',
      title: 'Frontend Architecture',
      skills: ['TypeScript', 'JavaScript', 'React', 'Svelte', 'Tailwind CSS', 'HTML5', 'CSS3']
    },
    {
      index: '04',
      title: 'Databases & Caching',
      skills: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Redis',
        'Database Design',
        'Query Optimization'
      ]
    },
    {
      index: '05',
      title: 'DevOps & Tooling',
      skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Vercel', 'Postman']
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 sm:px-10 lg:px-16 bg-transparent relative">
      <div className="max-w-[1320px] mx-auto relative z-10">
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
              Skills &amp; <br className="hidden md:block" />
              Technologies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-stone-500 leading-relaxed max-w-xs"
            >
              Core languages, frameworks, and infrastructure tools I use to take products from
              architecture to production.
            </motion.p>
          </div>

          {/* Right Column: Cardless Editorial Index Rows with Individual Animations */}
          <div className="md:col-span-8 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-full bg-stone-300/75 origin-left"
            />
            {skillCategories.map((category, rowIdx) => (
              <div key={category.title} className="relative">
                <div className="py-9 grid sm:grid-cols-12 gap-4 sm:gap-6 items-baseline group">
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: rowIdx * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="sm:col-span-5 flex items-baseline gap-3"
                  >
                    <span className="font-mono text-xs text-stone-400 group-hover:text-stone-900 transition-colors">
                      {category.index}
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-[1.7rem] text-stone-950">
                      {category.title}
                    </h3>
                  </motion.div>

                  <div className="sm:col-span-7 flex flex-wrap gap-x-2 gap-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.45,
                          delay: rowIdx * 0.04 + sIdx * 0.04,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="text-sm text-stone-700 hover:text-stone-950 transition-colors"
                      >
                        {skill}
                        {sIdx < category.skills.length - 1 && (
                          <span className="text-stone-300 ml-2">·</span>
                        )}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.85,
                    delay: rowIdx * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
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

export default Skills;
