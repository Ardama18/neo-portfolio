'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, Tag, ArrowRight, Star } from 'lucide-react'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index: number
  onExpand: () => void
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

export default function ProjectCard({ project, index, onExpand }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const gradientClass = categoryColors[project.category] || categoryColors.other

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        damping: 20,
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      onClick={onExpand}
    >
      <div className={cn(
        "relative h-full p-6 rounded-2xl border border-white/10 transition-all duration-500",
        "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm",
        "hover:border-white/30 hover:shadow-2xl hover:shadow-cyan-500/20",
        project.featured && "ring-2 ring-cyan-400/30"
      )}>
        {/* Featured badge */}
        {project.featured && (
          <motion.div
            className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* Status badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            statusColors[project.status]
          )}>
            {project.status.replace('-', ' ')}
          </span>
          
          <div className="flex space-x-2">
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </motion.a>
            )}
            
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4 text-white" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Project image placeholder */}
        <div className="relative mb-6 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-20",
            gradientClass
          )} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-white/20">
              {project.title.charAt(0)}
            </div>
          </div>
          
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-white text-lg font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
            >
              View Details
            </motion.div>
          </motion.div>
        </div>

        {/* Project info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/60">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{project.year}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Tag className="w-4 h-4" />
              <span className="capitalize">{project.category}</span>
            </div>
          </div>

          {/* Expand button */}
          <motion.div
            className="flex items-center justify-between pt-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm text-gray-400">
              Click to explore
            </span>
            
            <motion.div
              className="flex items-center space-x-1 text-cyan-400"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm">Learn more</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 -z-10",
            gradientClass
          )}
          animate={{ opacity: isHovered ? 0.05 : 0 }}
        />
      </div>
    </motion.div>
  )
}