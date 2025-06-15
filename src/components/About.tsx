import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Brain, Coffee, Lightbulb, Rocket } from 'lucide-react';

const About: React.FC = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stats = [
    { number: '3+', label: 'Years Coding', icon: <Code className="w-5 h-5" /> },
    { number: '50+', label: 'Projects Built', icon: <Rocket className="w-5 h-5" /> },
    { number: '∞', label: 'Cups of Coffee', icon: <Coffee className="w-5 h-5" /> },
    { number: '24/7', label: 'Learning Mode', icon: <Lightbulb className="w-5 h-5" /> }
  ];

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 font-mono text-sm">
          {`function aboutMe() {`}<br/>
          {`  return {`}<br/>
          {`    passion: 'high',`}<br/>
          {`    coffee: 'required',`}<br/>
          {`    bugs: 'features'`}<br/>
          {`  };`}<br/>
          {`}`}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            About Me
          </motion.h2>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-center mb-3 text-gray-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-black mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a passionate fullstack developer with a deep focus on backend systems and AI engineering. 
                My journey into tech began with curiosity about how complex systems work behind the scenes, 
                and that curiosity has driven me to specialize in building robust, scalable applications.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                I thrive on solving complex problems through clean, efficient code and love integrating 
                cutting-edge AI technologies to create intelligent solutions. Whether it's designing 
                RESTful APIs, optimizing database performance, or implementing machine learning workflows, 
                I approach each challenge with precision and creativity.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                projects, or sharing knowledge with the developer community.
              </p>

              {/* Code Philosophy */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mt-6"
              >
                <div className="text-gray-500">// My coding philosophy</div>
                <div className="text-blue-400">const</div>
                <span className="text-white"> philosophy = &lbrace;</span>
                <div className="ml-4 text-yellow-400">cleanCode: true,</div>
                <div className="ml-4 text-yellow-400">userFirst: true,</div>
                <div className="ml-4 text-yellow-400">neverStopLearning: true</div>
                <span className="text-white">&rbrace;;</span>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <div className="grid gap-6">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-50 to-transparent"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <Code className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-xl font-medium">Frontend Development</h3>
                  </div>
                  <p className="text-gray-600">
                    Creating intuitive user interfaces with React, Svelte, and modern JavaScript
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-green-50 to-transparent"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <Database className="text-green-600" size={24} />
                    </div>
                    <h3 className="text-xl font-medium">Backend Engineering</h3>
                  </div>
                  <p className="text-gray-600">
                    Building scalable APIs and database architectures with Node.js and Express
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-50 to-transparent"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <Brain className="text-purple-600" size={24} />
                    </div>
                    <h3 className="text-xl font-medium">AI Integration</h3>
                  </div>
                  <p className="text-gray-600">
                    Implementing intelligent features using OpenAI APIs and machine learning
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;