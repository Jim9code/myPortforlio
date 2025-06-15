import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Brain, Server, Zap, Globe } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Globe className="w-6 h-6" />,
      skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Svelte', 'Tailwind CSS'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Backend',
      icon: <Server className="w-6 h-6" />,
      skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Microservices', 'Authentication'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Database',
      icon: <Database className="w-6 h-6" />,
      skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Database Design', 'Query Optimization'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'AI/ML',
      icon: <Brain className="w-6 h-6" />,
      skills: ['OpenAI API', 'LangChain', 'Python', 'Machine Learning', 'Natural Language Processing'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Tools & DevOps',
      icon: <Zap className="w-6 h-6" />,
      skills: ['Git', 'Docker', 'Postman', 'Vercel', 'AWS', 'CI/CD', 'Linux'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 px-6 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">{'{ }'}</div>
        <div className="absolute top-20 right-20 text-4xl">{'</>'}</div>
        <div className="absolute bottom-20 left-20 text-5xl">{'[]'}</div>
        <div className="absolute bottom-10 right-10 text-3xl">{'()'}</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">Skills & Technologies</h2>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Code className="w-5 h-5" />
              <span className="font-mono text-sm">const mySkills = [</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${category.color} text-white`}>
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-4 text-center">{category.title}</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-all duration-200 cursor-default font-medium"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Code snippet at bottom */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-500">// Always learning new technologies</div>
              <div className="text-blue-400">while</div>
              <span className="text-white">(</span>
              <span className="text-yellow-400">coding</span>
              <span className="text-white">{')'} {'{'}</span>
              <div className="ml-4 text-purple-400">learn();</div>
              <div className="ml-4 text-purple-400">build();</div>
              <div className="ml-4 text-purple-400">improve();</div>
              <span className="text-white">{'}'}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;