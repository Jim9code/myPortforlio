import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Terminal, Code2 } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'console.log("Hello, World!");';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Code Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 text-xs font-mono">
          {`function buildAmazingThings() {`}<br/>
          {`  return passion + code + coffee;`}<br/>
          {`}`}
        </div>
        <div className="absolute top-40 right-20 text-xs font-mono">
          {`const skills = ['React', 'Node.js', 'AI'];`}
        </div>
        <div className="absolute bottom-40 left-20 text-xs font-mono">
          {`// Always learning, always coding`}
        </div>
        <div className="absolute bottom-20 right-10 text-xs font-mono">
          {`git commit -m "Another day, another feature"`}
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Terminal-style greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-left mb-8 max-w-md mx-auto border border-gray-700"
          >
            <div className="flex items-center mb-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400 text-sm">terminal</span>
            </div>
            <div className="text-sm">
              <span className="text-blue-400">jethro@dev</span>
              <span className="text-white">:</span>
              <span className="text-purple-400">~</span>
              <span className="text-white">$ </span>
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-green-400"
              >
                |
              </motion.span>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-light mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hi, I'm{' '}
            <motion.span
              className="font-bold relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Jethro
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Fullstack Developer focused on{' '}
            <span className="text-black font-medium relative">
              Backend Engineering
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
            </span> and{' '}
            <span className="text-black font-medium relative">
              AI Integration
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              />
            </span>
          </motion.p>

          <motion.p
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            I build scalable systems and intelligent applications that solve real-world problems
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
            >
              <Code2 size={18} />
              View My Work
            </motion.button>

            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/Jim9code/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-3 rounded-full border border-gray-200 hover:border-gray-400 transition-colors duration-200 hover:bg-gray-50"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/jethro-daspan-b95b772b9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-3 rounded-full border border-gray-200 hover:border-gray-400 transition-colors duration-200 hover:bg-gray-50"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:rinfwang4@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-3 rounded-full border border-gray-200 hover:border-gray-400 transition-colors duration-200 hover:bg-gray-50"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={scrollToProjects}
            >
              <ArrowDown size={24} className="text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;