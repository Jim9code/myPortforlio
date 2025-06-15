import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Terminal, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:rinfwang4@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

  return (
    <section id="contact" className="py-20 px-6 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 font-mono text-sm">
          // Let's connect!<br/>
          const collaboration = &#123;<br/>
          &nbsp;&nbsp;status: 'open',<br/>
          &nbsp;&nbsp;response_time: 'fast',<br/>
          &nbsp;&nbsp;coffee_meetings: true<br/>
          &#125;;
        </div>
        <div className="absolute bottom-20 right-10 font-mono text-sm">
          git checkout -b new-project<br/>
          // Ready to build something amazing?
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
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
            <h2 className="text-4xl md:text-5xl font-light mb-8">Let's Build Something Cool</h2>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              I'm always interested in new opportunities and collaborations. 
              Whether you have a project in mind or just want to chat about tech, feel free to reach out.
            </p>
            
            {/* Terminal-style CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm"
            >
              <div className="flex items-center mb-2">
                <Terminal className="w-4 h-4 mr-2" />
                <span className="text-gray-400">contact@jethro:~$</span>
              </div>
              <div>
                <span className="text-blue-400">echo</span>
                <span className="text-white"> "Ready to collaborate!"</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-medium mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <motion.a
                  href="mailto:rinfwang4@gmail.com"
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="p-3 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors duration-200">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">rinfwang4@gmail.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/Jim9code/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="p-3 bg-gray-100 rounded-lg mr-4 group-hover:bg-gray-200 transition-colors duration-200">
                    <Github className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-gray-600">@Jim9code</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/jethro-daspan-b95b772b9"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="p-3 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors duration-200">
                    <Linkedin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-gray-600">Jethro Daspan</p>
                  </div>
                </motion.a>
              </div>

              {/* Quick Response Promise */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6"
              >
                <div className="flex items-center text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="font-medium">Usually responds within 24 hours</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                {/* Logo at top of form */}
                <div className="flex justify-center mb-6">
                  <img 
                    src="/logo.jpeg" 
                    alt="Jethro Daspan Logo" 
                    className="h-12 w-12 object-contain"
                  />
                </div>
                
                <h3 className="text-xl font-medium mb-6 text-center">Send a Message</h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none hover:border-gray-300"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center font-medium"
                >
                  <Send className="mr-2" size={18} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;