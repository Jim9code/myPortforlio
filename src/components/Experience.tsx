import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Senior Backend Developer',
      company: 'Ocean',
      location: 'Remote',
      period: '2023 - Present',
      description: [
        'Led development of microservices architecture serving 100k+ daily users',
        'Implemented AI-powered features using OpenAI API and LangChain',
        'Optimized database queries resulting in 40% performance improvement',
        'Mentored junior developers and established coding best practices'
      ]
    },
    {
      title: 'Fullstack Developer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      period: '2022 - 2023',
      description: [
        'Built and maintained React-based web applications',
        'Developed RESTful APIs using Node.js and Express',
        'Integrated third-party services and payment gateways',
        'Collaborated with design team to implement pixel-perfect UIs'
      ]
    },
    {
      title: 'Junior Developer',
      company: 'TheTravelHunters',
      location: 'Abuja, NG',
      period: '2024 - 2025',
      description: [
        'Developed responsive websites using modern JavaScript frameworks',
        'Worked with MySQL and MongoDB databases',
        'Participated in code reviews and agile development processes',
        'Contributed to open-source projects and internal tools'
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
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="experience" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-light text-center mb-16"
          >
            Experience
          </motion.h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-black"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-1">{exp.title}</h3>
                    <p className="text-lg text-gray-700">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar size={16} className="mr-2" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {exp.description.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="text-gray-600 flex items-start"
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;