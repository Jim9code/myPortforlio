import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitBranch, Eye } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Formulary App',
      description: 'A comprehensive medication management system with real-time drug interaction checking and prescription tracking.',
      technologies: ['React', 'Node.js', 'MySQL', 'Express', 'REST API'],
      liveUrl: 'https://formulary-demo.vercel.app',
      githubUrl: 'https://github.com/Jim9code/formulary-app',
      featured: true,
      stats: { stars: 24, forks: 8, views: 156 }
    },
    {
      title: 'Crush Mark Social App',
      description: 'A social networking platform with real-time messaging, user profiles, and content sharing capabilities.',
      technologies: ['Svelte', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
      liveUrl: 'https://crushmark-social.vercel.app',
      githubUrl: 'https://github.com/Jim9code/crushmark-social',
      featured: true,
      stats: { stars: 31, forks: 12, views: 203 }
    },
    {
      title: 'What To Cook AI App',
      description: 'An intelligent recipe recommendation system using OpenAI API to suggest meals based on available ingredients.',
      technologies: ['React', 'OpenAI API', 'Node.js', 'Express', 'LangChain'],
      liveUrl: 'https://whattocook-ai.vercel.app',
      githubUrl: 'https://github.com/Jim9code/whattocook-ai',
      featured: true,
      stats: { stars: 45, forks: 15, views: 287 }
    },
    {
      title: 'Task Management API',
      description: 'A robust RESTful API for task management with user authentication, role-based permissions, and real-time updates.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'WebSockets'],
      githubUrl: 'https://github.com/Jim9code/task-api',
      featured: false,
      stats: { stars: 18, forks: 6, views: 94 }
    },
    {
      title: 'E-commerce Backend',
      description: 'Scalable e-commerce backend with payment integration, inventory management, and order processing.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redis'],
      githubUrl: 'https://github.com/Jim9code/ecommerce-backend',
      featured: false,
      stats: { stars: 22, forks: 9, views: 128 }
    },
    {
      title: 'AI Chat Assistant',
      description: 'Intelligent chatbot with context awareness and natural language processing capabilities.',
      technologies: ['Python', 'OpenAI API', 'FastAPI', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/Jim9code/ai-chat-assistant',
      featured: false,
      stats: { stars: 33, forks: 11, views: 176 }
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of projects showcasing my expertise in backend development, 
            AI integration, and full-stack applications.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-medium">{project.title}</h3>
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                        >
                          <ExternalLink size={18} className="text-blue-600" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star size={14} />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch size={14} />
                      <span>{project.stats.forks}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{project.stats.views}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-8 flex items-center justify-center">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">💻</span>
                      </div>
                      <p className="text-gray-700 text-lg font-medium">{project.title}</p>
                      <p className="text-gray-400 text-sm mt-2">Live Demo Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-light text-center mb-8">Other Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.title}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-medium">{project.title}</h4>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-gray-200 hover:border-gray-400 transition-colors duration-200"
                  >
                    <Github size={16} />
                  </a>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star size={12} />
                    <span>{project.stats.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch size={12} />
                    <span>{project.stats.forks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    <span>{project.stats.views}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;