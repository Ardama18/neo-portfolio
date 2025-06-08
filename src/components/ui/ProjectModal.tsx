'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, Tag, Code, Star } from 'lucide-react'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const categoryColors = {
  web: 'from-blue-500 to-cyan-500',
  mobile: 'from-purple-500 to-pink-500',
  api: 'from-green-500 to-emerald-500',
  ml: 'from-violet-500 to-purple-500',
  other: 'from-gray-500 to-slate-500'
}

const statusColors = {
  completed: 'text-green-400 bg-green-400/20',
  'in-progress': 'text-yellow-400 bg-yellow-400/20',
  concept: 'text-purple-400 bg-purple-400/20'
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  const gradientClass = categoryColors[project.category] || categoryColors.other

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900/95 rounded-3xl border border-white/20 backdrop-blur-xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Header with image */}
            <div className="relative h-64 md:h-80">
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-30",
                gradientClass
              )} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl md:text-9xl font-bold text-white/10">
                  {project.title.charAt(0)}
                </div>
              </div>
              
              {/* Featured badge */}
              {project.featured && (
                <motion.div
                  className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Title and status */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-xl text-gray-300">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <span className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium",
                    statusColors[project.status]
                  )}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                )}
                
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 border border-white/20 rounded-full text-white font-medium hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>Source Code</span>
                  </motion.a>
                )}
              </div>

              {/* Project details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Calendar className="w-6 h-6 text-cyan-400" />
                  <div>
                    <div className="text-sm text-gray-400">Year</div>
                    <div className="text-white font-medium">{project.year}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Tag className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-400">Category</div>
                    <div className="text-white font-medium capitalize">{project.category}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Code className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-sm text-gray-400">Technologies</div>
                    <div className="text-white font-medium">{project.technologies.length} tools</div>
                  </div>
                </div>
              </div>

              {/* Long description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">About This Project</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.longDescription}
                </p>
              </div>

              {/* Technologies grid */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Technologies Used</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-white font-medium text-sm">{tech}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional features or highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Key Features</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Advanced AI-powered functionality</li>
                    <li>• Real-time data processing</li>
                    <li>• Responsive design</li>
                    <li>• Scalable architecture</li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Technical Highlights</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Performance optimization</li>
                    <li>• Security best practices</li>
                    <li>• Clean code architecture</li>
                    <li>• Comprehensive testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}