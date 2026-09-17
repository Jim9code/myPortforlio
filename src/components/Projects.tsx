import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock } from 'lucide-react';

interface Project {
  title: string;
  category?: string;
  hook?: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  image?: string;
  gradient?: string;
  emoji?: string;
  rotationClass?: string;
  translateClass?: string;
  cardStyle?: 'white' | 'yellow' | 'dark' | 'cream';
  accentType?: 'pin' | 'tape';
  pinColor?: string;
  stampBadge?: string;
  stampColor?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Nexflo',
      category: 'Lead Automation Platform',
      description: 'An automated Instagram comment and DM lead generation platform. Converts audience engagements into qualified sales leads using custom keyword triggers, automated responses, and CRM workflows.',
      technologies: ['Svelte', 'Node.js', 'Express', 'Meta Graph API', 'Tailwind CSS', 'REST API'],
      liveUrl: 'https://www.nexfloapp.com/',
      featured: true,
      image: '/nexflo.png',
      gradient: 'from-purple-600 via-pink-600 to-rose-500',
      emoji: '⚡'
    },
    {
      title: 'EasyBuy',
      category: 'B2B Smart Sourcing & Procurement',
      description: 'A comprehensive B2B wholesale procurement platform connecting corporate buyers directly to verified manufacturers. Features automated supplier matching, instant RFQ quoting, and consolidated single-invoice delivery.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Blade', 'REST API'],
      liveUrl: 'https://easybuy-web.onrender.com/',
      githubUrl: 'https://github.com/Jim9code/easybuy',
      featured: true,
      image: '/easybuy.png',
      gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
      emoji: '🛒'
    },
    {
      title: 'Ocean Pulse',
      category: 'Enterprise Tech & Digital Solutions',
      description: 'A modern enterprise technology company platform showcasing innovative custom software development, high-performance digital platforms, and scalable infrastructure designed for global commerce.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
      liveUrl: 'https://oceanpulse.tech/home',
      featured: true,
      image: '/oceanpulse.png',
      gradient: 'from-teal-500 via-cyan-600 to-blue-600',
      emoji: '🌊'
    },
    {
      title: 'TruckBook',
      category: 'Logistics & Freight',
      hook: '“Logistics dispatch and truck booking with real-time routing.”',
      description: 'A freight scheduling and logistics web application designed for streamlined truck bookings, transport dispatch, and cargo scheduling.',
      technologies: ['Svelte', 'JavaScript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://truckbook.vercel.app',
      githubUrl: 'https://github.com/Jim9code/truckbook',
      featured: false,
      cardStyle: 'white',
      accentType: 'pin',
      pinColor: 'bg-orange-500',
      rotationClass: '-rotate-2 md:-rotate-2',
      translateClass: 'md:translate-y-2',
      stampBadge: '✓ Verified App',
      stampColor: 'text-emerald-700 bg-emerald-50/80 border-emerald-300/70'
    },
    {
      title: 'Styles Furniture',
      category: 'E-Commerce Storefront',
      hook: '“Interactive e-commerce storefront showcasing modern home collections.”',
      description: 'An interactive furniture catalog and e-commerce platform showcasing modern interior collections with responsive product filtering and dynamic carts.',
      technologies: ['Svelte', 'Tailwind CSS', 'JavaScript', 'Vercel'],
      liveUrl: 'https://stylesfurniture.vercel.app',
      githubUrl: 'https://github.com/Jim9code/stylesfurniture',
      featured: false,
      cardStyle: 'yellow',
      accentType: 'tape',
      rotationClass: 'rotate-2 md:rotate-2',
      translateClass: 'md:-translate-y-4',
      stampBadge: '🛋️ Live Store',
      stampColor: 'text-amber-900 bg-amber-200/80 border-amber-400/60'
    },
    {
      title: 'Adashe',
      category: 'Community Fintech',
      hook: '“Community thrift & peer-to-peer rotational savings system.”',
      description: 'Digital thrift and rotational peer-to-peer cooperative savings platform for community fund pooling and automated contribution tracking.',
      technologies: ['TypeScript', 'Node.js', 'REST API'],
      githubUrl: 'https://github.com/Jim9code/Adashe',
      featured: false,
      cardStyle: 'dark',
      accentType: 'pin',
      pinColor: 'bg-amber-400',
      rotationClass: '-rotate-1.5 md:-rotate-2',
      translateClass: 'md:translate-y-5',
      stampBadge: '💰 P2P Thrift',
      stampColor: 'text-amber-300 bg-stone-800 border-amber-400/40'
    },
    {
      title: 'PQ Finder',
      category: 'EdTech Portal',
      hook: '“Fast search engine for academic past questions & study notes.”',
      description: 'An academic study resource and past questions search portal enabling students to quickly find, filter, and download university exam materials.',
      technologies: ['Svelte', 'JavaScript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://pq-finder.vercel.app',
      githubUrl: 'https://github.com/Jim9code/pq_finder',
      featured: false,
      cardStyle: 'cream',
      accentType: 'tape',
      rotationClass: 'rotate-3 md:rotate-2.5',
      translateClass: 'md:-translate-y-2',
      stampBadge: '📚 100% Free',
      stampColor: 'text-blue-800 bg-blue-50/80 border-blue-300/70'
    },
    {
      title: 'Forex Academy',
      category: 'Finance & Trading EdTech',
      hook: '“Structured finance & currency trading education curriculum.”',
      description: 'A comprehensive trading education platform featuring structured financial market curriculum, interactive chart breakdowns, and trading guides.',
      technologies: ['Svelte', 'JavaScript', 'CSS', 'Vercel'],
      liveUrl: 'https://forexacademy-blue.vercel.app',
      githubUrl: 'https://github.com/Jim9code/forexacademy',
      featured: false,
      cardStyle: 'white',
      accentType: 'pin',
      pinColor: 'bg-blue-600',
      rotationClass: '-rotate-2.5 md:-rotate-2',
      translateClass: 'md:translate-y-3',
      stampBadge: '📈 Trading Hub',
      stampColor: 'text-emerald-700 bg-emerald-50/80 border-emerald-300/70'
    },
    {
      title: 'Customer Acquisition Funnel',
      category: 'Lead Conversion System',
      hook: '“High-conversion marketing landing and customer acquisition funnel.”',
      description: 'High-conversion marketing landing page and customer onboarding funnel built for rapid lead capture, analytics, and product onboarding.',
      technologies: ['Svelte', 'JavaScript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://acquisition-eosin.vercel.app',
      githubUrl: 'https://github.com/Jim9code/Acquisition',
      featured: false,
      cardStyle: 'yellow',
      accentType: 'tape',
      rotationClass: 'rotate-1.5 md:rotate-2',
      translateClass: 'md:-translate-y-4',
      stampBadge: '🎯 Growth Engine',
      stampColor: 'text-amber-950 bg-amber-300/90 border-amber-400/80 font-bold'
    },
    {
      title: 'Hotel Partner Onboarding',
      category: 'Hospitality & Travel Tech',
      hook: '“Multi-step hospitality partner verification and onboarding portal.”',
      description: 'A multi-step property partner onboarding and verification portal for travel booking platforms and hotel management systems.',
      technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://travel-hotel-onboard.vercel.app',
      githubUrl: 'https://github.com/Jim9code/travel_hotelOnboard',
      featured: false,
      cardStyle: 'white',
      accentType: 'tape',
      rotationClass: '-rotate-2 md:-rotate-1.5',
      translateClass: 'md:translate-y-2',
      stampBadge: '🏨 Partner Portal',
      stampColor: 'text-purple-800 bg-purple-50/80 border-purple-300/70'
    },
    {
      title: 'JETHFEX Bot',
      category: 'Trading Automation',
      hook: '“Automated technical indicator calculations and market signal alerts.”',
      description: 'Automated Python trading signal analysis script designed for technical market indicators, risk calculations, and real-time alerts.',
      technologies: ['Python', 'Automation', 'Trading API'],
      githubUrl: 'https://github.com/Jim9code/JETHFEX_bot',
      featured: false,
      cardStyle: 'dark',
      accentType: 'pin',
      pinColor: 'bg-emerald-400',
      rotationClass: 'rotate-2 md:rotate-2',
      translateClass: 'md:-translate-y-3',
      stampBadge: '🤖 Automated Bot',
      stampColor: 'text-emerald-300 bg-stone-800 border-emerald-400/40'
    },
    {
      title: 'Blooming Chicken',
      category: 'Restaurant Ordering',
      hook: '“Responsive online food ordering & reservation menu system.”',
      description: 'A responsive food ordering and table reservation web application with dynamic menu browsing, dish filtering, and checkout.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
      liveUrl: 'https://blooming-chiken.vercel.app',
      githubUrl: 'https://github.com/Jim9code/bloomingChiken',
      featured: false,
      cardStyle: 'cream',
      accentType: 'tape',
      rotationClass: '-rotate-1.5 md:-rotate-2',
      translateClass: 'md:translate-y-3',
      stampBadge: '🍗 Food App',
      stampColor: 'text-orange-800 bg-orange-50/80 border-orange-300/70'
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 bg-[#FAF7F2] relative overflow-hidden">
      {/* Subtle paper dot background texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-stone-900">Featured Projects</h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            A curated showcase of live production web applications, SaaS platforms, 
            and scalable backend systems.
          </p>
        </div>

        {/* Featured Projects List */}
        <div className="space-y-12 mb-24">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="md:grid md:grid-cols-12 md:gap-0">
                <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    {project.category && (
                      <span className="text-xs uppercase tracking-widest font-semibold text-blue-600 mb-2 inline-block">
                        {project.category}
                      </span>
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl md:text-3xl font-medium text-stone-900 group-hover:text-blue-600 transition-colors duration-200">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50/50 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-blue-600 text-xs font-medium transition-all duration-200"
                            title="Visit Live Site"
                          >
                            <ExternalLink size={14} />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full border border-stone-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white text-stone-700 transition-all duration-200"
                            title="View Source Code"
                          >
                            <Github size={16} />
                          </a>
                        ) : (
                          <span
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-stone-200 text-stone-400 text-xs"
                            title="Private Repository"
                          >
                            <Lock size={12} />
                            <span>Private</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-stone-600 mb-6 leading-relaxed text-base md:text-lg">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs md:text-sm font-medium hover:bg-stone-200 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 bg-gradient-to-br from-stone-900 via-gray-900 to-zinc-900 p-6 md:p-8 flex items-center justify-center relative overflow-hidden min-h-[260px] md:min-h-full">
                  {/* Decorative background glow */}
                  <div className="absolute w-44 h-44 bg-blue-500/10 rounded-full blur-3xl -top-10 -right-10 pointer-events-none"></div>
                  
                  {project.image ? (
                    <div className="w-full relative z-10">
                      <div className="relative w-full rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-gray-950 group/preview">
                        {/* Browser mockup header bar */}
                        <div className="bg-gray-900/90 px-3 py-2 border-b border-gray-800 flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                          <span className="text-[11px] font-mono text-gray-400 ml-2 truncate">
                            {project.liveUrl ? project.liveUrl.replace('https://', '').replace(/\/$/, '') : project.title.toLowerCase()}
                          </span>
                        </div>
                        {/* Screenshot image container with WebP support */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                          <picture>
                            <source
                              srcSet={project.image.replace(/\.(png|jpe?g)$/i, '.webp')}
                              type="image/webp"
                            />
                            <img
                              src={project.image}
                              alt={`${project.title} Preview`}
                              className="w-full h-full object-cover object-top group-hover/preview:scale-105 transition-transform duration-500"
                              loading="lazy"
                              decoding="async"
                              width={800}
                              height={500}
                            />
                          </picture>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 bg-black/50 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center gap-2 text-white text-xs md:text-sm font-medium transition-opacity duration-300 backdrop-blur-[2px]"
                            >
                              <span>View Live Site</span>
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 text-center text-white px-4">
                      <div className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl">{project.emoji || '💻'}</span>
                      </div>
                      <h4 className="text-xl font-semibold tracking-wide text-white mb-1">{project.title}</h4>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white mt-2 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
                        >
                          <ExternalLink size={12} />
                          <span>Explore Live Platform</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Artistically Scattered Wall of Projects */}
        <div className="mt-20 pt-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/60 text-amber-900 text-xs font-semibold tracking-wider mb-3">
              <span>WALL OF CREATIONS</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-light text-stone-900 mb-3">Other Projects & Prototypes</h3>
            <p className="text-stone-600 text-base max-w-2xl mx-auto">
              A pinboard of live web applications, open-source repositories, and experimental builds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-12 items-start">
            {otherProjects.map((project, idx) => {
              // Card background style mappings
              const isDark = project.cardStyle === 'dark';
              const isYellow = project.cardStyle === 'yellow';
              const isCream = project.cardStyle === 'cream';

              const cardBg = isDark
                ? 'bg-[#18181B] text-stone-100 border-stone-800 shadow-xl'
                : isYellow
                ? 'bg-[#FEFCE8] text-stone-900 border-amber-300/70 shadow-md'
                : isCream
                ? 'bg-[#FAF6EE] text-stone-900 border-stone-200/90 shadow-md'
                : 'bg-white text-stone-900 border-stone-200/90 shadow-md';

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className={`relative p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${cardBg} ${project.rotationClass || ''} ${project.translateClass || ''} hover:rotate-0 hover:scale-[1.04] hover:z-30 hover:shadow-2xl group`}
                >
                  {/* Pin or Tape Accent on top */}
                  {project.accentType === 'pin' ? (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none">
                      <div className={`w-3.5 h-3.5 rounded-full border border-black/20 shadow-md ${project.pinColor || 'bg-red-500'}`}>
                        <div className="w-1 h-1 bg-white/60 rounded-full mt-0.5 ml-0.5"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-white/70 backdrop-blur-[1px] border border-black/10 shadow-xs rotate-[-1.5deg] rounded-xs z-20 pointer-events-none" />
                  )}

                  {/* Card Header: Category & Action Links */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-stone-500'}`}>
                      {project.category}
                    </span>

                    {/* Action Links */}
                    <div className="flex items-center gap-1.5 relative z-10">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 rounded-full border transition-colors ${
                            isDark
                              ? 'border-stone-700 bg-stone-800 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                              : 'border-stone-200 bg-white/80 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                          }`}
                          title="Visit Live Site"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 rounded-full border transition-colors ${
                            isDark
                              ? 'border-stone-700 bg-stone-800 text-stone-300 hover:bg-white hover:text-black hover:border-white'
                              : 'border-stone-200 bg-white/80 text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900'
                          }`}
                          title="View Source Code"
                        >
                          <Github size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Quote Hook / Headline */}
                  {project.hook && (
                    <p className={`font-semibold text-sm mb-2.5 leading-snug ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {project.hook}
                    </p>
                  )}

                  {/* Description */}
                  <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                    {project.description}
                  </p>

                  {/* Title & Stamp Badge Footer */}
                  <div className={`pt-3.5 border-t flex items-center justify-between gap-2 mt-auto ${isDark ? 'border-stone-800' : 'border-stone-200/70'}`}>
                    <h4 className={`text-xs font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {project.title}
                    </h4>

                    {project.stampBadge && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${project.stampColor || 'border-stone-300 text-stone-700 bg-stone-100'}`}>
                        {project.stampBadge}
                      </span>
                    )}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          isDark
                            ? 'bg-stone-800 text-stone-300'
                            : 'bg-stone-200/60 text-stone-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className={`px-1.5 py-0.5 text-[10px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;