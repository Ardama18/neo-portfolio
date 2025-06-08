'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/portfolio'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectModal from '@/components/ui/ProjectModal'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'All Projects', value: 'all' },
  { name: 'Web Apps', value: 'web' },
  { name: 'Mobile', value: 'mobile' },
  { name: 'APIs', value: 'api' },
  { name: 'ML/AI', value: 'ml' },
  { name: 'Other', value: 'other' }
]

const sortOptions = [
  { name: 'Featured First', value: 'featured' },
  { name: 'Newest First', value: 'newest' },
  { name: 'Oldest First', value: 'oldest' },
  { name: 'A-Z', value: 'alphabetical' }
]

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter projects
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.year - a.year
      case 'newest':
        return b.year - a.year
      case 'oldest':
        return a.year - b.year
      case 'alphabetical':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const handleProjectExpand = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  return (
    <section className="relative py-20 px-6">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-green-900/10" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Featured Projects
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A showcase of my most innovative and impactful projects, featuring cutting-edge technologies and creative solutions
          </motion.p>
        </motion.div>

        {/* Filters and sorting */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Category filters */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "px-4 py-2 rounded-full border transition-all duration-300 text-sm",
                  selectedCategory === category.value
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-400/50 shadow-lg shadow-cyan-400/25"
                    : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                )}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Sort dropdown */}
          <motion.div variants={itemVariants}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition-all"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-900">
                  {option.name}
                </option>
              ))}
            </select>
          </motion.div>
        </motion.div>

        {/* Project stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: 'Total Projects', value: projects.length },
            { label: 'Featured', value: projects.filter(p => p.featured).length },
            { label: 'Completed', value: projects.filter(p => p.status === 'completed').length },
            { label: 'Technologies', value: new Set(projects.flatMap(p => p.technologies)).size }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(34, 211, 238, 0.2)"
              }}
            >
              <motion.div
                className="text-3xl font-bold text-cyan-400 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {sortedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onExpand={() => handleProjectExpand(project)}
            />
          ))}
        </motion.div>

        {/* Empty state */}
        {sortedProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-gray-400">Try adjusting your filters to see more projects.</p>
          </motion.div>
        )}

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Interested in collaborating?
          </h3>
          <p className="text-gray-300 mb-6">
            Let&apos;s build something amazing together
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Project modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}