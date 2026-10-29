import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Lock } from 'lucide-react';

interface Project {
  title: string;
  category?: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  image?: string;
}

const Projects: React.FC = () => {
  const [showArchive, setShowArchive] = useState(true);
  const bentoRef = useRef<HTMLDivElement | null>(null);

  // Scroll-Linked Multi-Plane Bento Parallax
  const { scrollYProgress } = useScroll({
    target: bentoRef,
    offset: ['start end', 'end start']
  });

  // Gentle parallax that never overlaps the heading above
  const leftCardY = useTransform(scrollYProgress, [0, 1], [18, -8]);
  const rightColumnY = useTransform(scrollYProgress, [0, 1], [36, -14]);
  // Inner screenshot counter-parallax
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.04]);

  const projects: Project[] = [
    {
      title: 'Nexflo',
      category: 'Lead Automation Platform',
      description:
        'Automated Instagram comment and DM lead generation platform converting engagements into qualified sales leads.',
      technologies: ['Svelte', 'Node.js', 'Express', 'Meta Graph API', 'Tailwind CSS'],
      liveUrl: 'https://www.nexfloapp.com/',
      featured: true,
      image: '/nexflo.png'
    },
    {
      title: 'EasyBuy',
      category: 'B2B Smart Sourcing & Procurement',
      description:
        'B2B wholesale procurement platform connecting corporate buyers to verified manufacturers with automated RFQ quoting.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'REST API'],
      liveUrl: 'https://easybuy-web.onrender.com/',
      githubUrl: 'https://github.com/Jim9code/easybuy',
      featured: true,
      image: '/easybuy.png'
    },
    {
      title: 'Ocean Pulse',
      category: 'Enterprise Tech & Digital Solutions',
      description:
        'Enterprise technology platform showcasing custom software development and scalable infrastructure for global commerce.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
      liveUrl: 'https://oceanpulse.tech/home',
      featured: true,
      image: '/oceanpulse.png'
    },
    {
      title: 'TruckBook',
      category: 'Logistics & Freight',
      description:
        'Freight scheduling and logistics web application for streamlined truck bookings, transport dispatch, and cargo routing.',
      technologies: ['Svelte', 'JavaScript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://truckbook.vercel.app',
      githubUrl: 'https://github.com/Jim9code/truckbook',
      featured: false
    },
    {
      title: 'Styles Furniture',
      category: 'E-Commerce Storefront',
      description:
        'Interactive furniture catalog and storefront showcasing modern interior collections with dynamic filtering and carts.',
      technologies: ['Svelte', 'Tailwind CSS', 'JavaScript', 'Vercel'],
      liveUrl: 'https://stylesfurniture.vercel.app',
      githubUrl: 'https://github.com/Jim9code/stylesfurniture',
      featured: false
    },
    {
      title: 'Adashe',
      category: 'Community Fintech',
      description:
        'Digital thrift and rotational peer-to-peer cooperative savings platform for community fund pooling.',
      technologies: ['TypeScript', 'Node.js', 'REST API'],
      githubUrl: 'https://github.com/Jim9code/Adashe',
      featured: false
    },
    {
      title: 'PQ Finder',
      category: 'EdTech Portal',
      description:
        'Academic study resource and past questions search portal enabling students to find and filter university exam materials.',
      technologies: ['Svelte', 'JavaScript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://pq-finder.vercel.app',
      githubUrl: 'https://github.com/Jim9code/pq_finder',
      featured: false
    },
    {
      title: 'Forex Academy',
      category: 'Finance & Trading EdTech',
      description:
        'Trading education platform featuring structured financial market curriculum and interactive chart breakdowns.',
      technologies: ['Svelte', 'JavaScript', 'CSS', 'Vercel'],
      liveUrl: 'https://forexacademy-blue.vercel.app',
      githubUrl: 'https://github.com/Jim9code/forexacademy',
      featured: false
    },
    {
      title: 'Customer Acquisition Funnel',
      category: 'Lead Conversion System',
      description:
        'High-conversion marketing landing page and customer onboarding funnel built for rapid lead capture and analytics.',
      technologies: ['Svelte', 'JavaScript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://acquisition-eosin.vercel.app',
      githubUrl: 'https://github.com/Jim9code/Acquisition',
      featured: false
    },
    {
      title: 'Hotel Partner Onboarding',
      category: 'Hospitality & Travel Tech',
      description:
        'Multi-step property partner onboarding and verification portal for travel booking and hotel management systems.',
      technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://travel-hotel-onboard.vercel.app',
      githubUrl: 'https://github.com/Jim9code/travel_hotelOnboard',
      featured: false
    },
    {
      title: 'JETHFEX Bot',
      category: 'Trading Automation',
      description:
        'Automated Python trading signal analysis script for technical market indicators, risk calculations, and real-time alerts.',
      technologies: ['Python', 'Automation', 'Trading API'],
      githubUrl: 'https://github.com/Jim9code/JETHFEX_bot',
      featured: false
    },
    {
      title: 'Blooming Chicken',
      category: 'Restaurant Ordering',
      description:
        'Responsive online food ordering and table reservation system with dynamic menu browsing and checkout.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
      liveUrl: 'https://blooming-chiken.vercel.app',
      githubUrl: 'https://github.com/Jim9code/bloomingChiken',
      featured: false
    }
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const primaryProject = featuredProjects[0];
  const secondaryProjects = featuredProjects.slice(1);

  return (
    <section
      id="projects"
      className="py-24 px-6 sm:px-10 lg:px-16 bg-transparent relative"
    >
      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Reference-Style Header Row: "Selected Work" + "View GitHub ↗" */}
        <div className="flex items-baseline justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-editorial text-4xl sm:text-5xl font-normal text-stone-950 tracking-tight"
          >
            Selected Work
          </motion.h2>
          <motion.a
            href="https://github.com/Jim9code/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-950 transition-colors"
          >
            <span>View GitHub</span>
            <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* Asymmetric Bento Showcase Grid with Multi-Plane Scroll Parallax */}
        <div ref={bentoRef} className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-14">
          {/* Primary Featured Tile (Left 7 Columns) */}
          {primaryProject && (
            <motion.div
              style={{ y: leftCardY }}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-[#0A0A0D] text-[#FDFBF6] min-h-[420px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-8 group"
            >
              {/* Top Bar: Category & Action Icons */}
              <div className="relative z-20 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-stone-400">
                  {primaryProject.category}
                </span>
                <div className="flex items-center gap-2">
                  {primaryProject.githubUrl ? (
                    <a
                      href={primaryProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Source Code"
                    >
                      <Github size={15} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-stone-300 text-[10px]">
                      <Lock size={11} />
                      <span>Private</span>
                    </span>
                  )}
                  {primaryProject.liveUrl && (
                    <a
                      href={primaryProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-stone-950 transition-colors"
                      title="Visit Live Site"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Framed Screenshot Centerpiece with Inner Scroll Parallax */}
              {primaryProject.image && (
                <a
                  href={primaryProject.liveUrl || '#projects'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 my-6 rounded-xl overflow-hidden border border-white/10 shadow-2xl block"
                >
                  <motion.div style={{ y: imageParallaxY, scale: imageScale }}>
                    <picture>
                      <source
                        srcSet={primaryProject.image.replace(/\.(png|jpe?g)$/i, '.webp')}
                        type="image/webp"
                      />
                      <img
                        src={primaryProject.image}
                        alt={primaryProject.title}
                        className="w-full h-56 sm:h-64 object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </motion.div>
                </a>
              )}

              {/* Bottom Info Overlay */}
              <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-md">
                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-1">
                    {primaryProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                    {primaryProject.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:justify-end">
                  {primaryProject.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-stone-300 px-2 py-0.5 rounded bg-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Stacked Tiles (Right 5 Columns) */}
          <motion.div
            style={{ y: rightColumnY }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {secondaryProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: (idx + 1) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex-1 rounded-2xl overflow-hidden bg-stone-900 text-white min-h-[240px] p-6 flex flex-col justify-between group"
              >
                {project.image && (
                  <motion.div
                    style={{ y: imageParallaxY, scale: imageScale }}
                    className="absolute inset-0 z-0"
                  >
                    <picture>
                      <source
                        srcSet={project.image.replace(/\.(png|jpe?g)$/i, '.webp')}
                        type="image/webp"
                      />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top opacity-45 group-hover:scale-105 group-hover:opacity-55 transition-all duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                  </motion.div>
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-stone-300">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
                        title="View Source"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-stone-950 transition-colors"
                        title="Visit Live Site"
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="relative z-10 mt-auto pt-12">
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Reference-Style Editorial Toggle Row with Self-Drawing Bottom Line */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowArchive((prev) => !prev)}
            className="w-full pt-4 pb-4 flex items-center justify-between text-left group cursor-pointer"
          >
            <motion.span
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-stone-950 tracking-tight group-hover:italic transition-all block"
            >
              See all my projects
            </motion.span>
            <ArrowUpRight
              size={24}
              className={`text-stone-500 group-hover:text-stone-950 transition-transform duration-300 ${
                showArchive ? 'rotate-90' : ''
              }`}
            />
          </button>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] w-full bg-stone-300/80 origin-left"
          />
        </div>

        {/* Cardless Editorial Archive Ledger with Individual Staggered Rows & Drawing Lines */}
        <AnimatePresence initial={false}>
          {showArchive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div>
                {otherProjects.map((project, idx) => (
                  <div key={project.title} className="relative">
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.55,
                        delay: idx * 0.04,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group"
                    >
                      {/* Title & Number */}
                      <div className="md:col-span-4 flex items-baseline gap-3">
                        <span className="font-mono text-xs text-stone-400">
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="font-serif-editorial text-2xl text-stone-950 group-hover:italic transition-all">
                            {project.title}
                          </h4>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-5 text-sm text-stone-600 leading-relaxed">
                        {project.description}
                      </div>

                      {/* Tech & Direct Links */}
                      <div className="md:col-span-3 flex items-center md:justify-end gap-4">
                        <span className="font-mono text-xs text-stone-400 hidden sm:inline">
                          {project.technologies.slice(0, 2).join(' · ')}
                        </span>
                        <div className="flex items-center gap-2.5 text-stone-500">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-stone-950 transition-colors"
                              title="GitHub Repository"
                            >
                              <Github size={16} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 text-xs font-medium text-stone-800 hover:text-stone-950 transition-colors"
                              title="Live Project"
                            >
                              <span>Live</span>
                              <ArrowUpRight size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.75, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="h-[1px] w-full bg-stone-300/70 origin-left"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
