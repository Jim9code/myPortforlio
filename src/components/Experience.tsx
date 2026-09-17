import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Briefcase } from 'lucide-react';

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
      period: '2024 - Present',
      technologies: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis', 'Microservices', 'REST APIs'],
      description: [
        'Lead the core backend architecture, designing scalable RESTful APIs and distributed server systems using Node.js.',
        'Architect high-performance database schemas, query optimizations, and caching layers for enterprise clients.',
        'Build secure authentication pipelines, business logic workflows, and microservices for scalable platforms.',
        'Direct technical decision-making, API design standards, code reviews, and CI/CD deployment pipelines.'
      ]
    },
    {
      title: 'Fullstack Developer',
      company: 'Nexflo',
      companyUrl: 'https://www.nexfloapp.com/',
      type: 'Freelance & Maintenance',
      location: 'Remote',
      period: '2026 - Present',
      technologies: ['Svelte', 'Node.js', 'Express', 'Meta Graph API', 'Tailwind CSS', 'Webhooks'],
      description: [
        'Architected and built the entire Nexflo platform end-to-end from scratch as the sole fullstack developer.',
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
      period: '2024 - 2025',
      technologies: ['JavaScript', 'React', 'Node.js', 'MySQL', 'MongoDB', 'REST APIs'],
      description: [
        'Developed dynamic, responsive web interfaces and integrated backend REST endpoints.',
        'Implemented database schemas, query optimizations, and user authentication mechanisms.',
        'Collaborated with the engineering team in agile sprints, participating in code reviews and release planning.'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="experience" className="py-20 px-6 bg-[#F5EFEB]/70">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-stone-900">Work Experience</h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              My engineering journey leading backend systems, crafting fullstack platforms, and maintaining production applications.
            </p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/90 relative overflow-hidden"
              >
                {/* Accent top border */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                  index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-purple-600' : 'bg-stone-400'
                }`} />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-2xl font-semibold text-stone-900">{exp.title}</h3>
                      {exp.type && (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          exp.type.includes('Lead')
                            ? 'bg-blue-100 text-blue-800'
                            : exp.type.includes('Freelance')
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {exp.type}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-stone-700">{exp.company}</span>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-stone-400 hover:text-blue-600 transition-colors"
                          title={`Visit ${exp.company}`}
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end text-sm text-gray-500 gap-1 mt-1 md:mt-0">
                    <div className="flex items-center">
                      <Calendar size={15} className="mr-1.5 text-gray-400" />
                      <span className="font-medium text-gray-700">{exp.period}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={15} className="mr-1.5 text-gray-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2.5 my-5">
                  {exp.description.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-600 flex items-start text-base leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.technologies && (
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;