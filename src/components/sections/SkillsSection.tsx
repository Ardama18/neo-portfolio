'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/data/portfolio'
import SkillCard from '@/components/ui/SkillCard'

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Frontend', value: 'frontend' },
  { name: 'Backend', value: 'backend' },
  { name: 'DevOps', value: 'devops' },
  { name: 'ML/AI', value: 'ml' },
  { name: 'Design', value: 'design' },
  { name: 'Other', value: 'other' }
]

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

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

  // Calculate category statistics
  const categoryStats = categories.slice(1).map(category => {
    const categorySkills = skills.filter(skill => skill.category === category.value)
    const averageLevel = categorySkills.length > 0 
      ? categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length 
      : 0
    
    return {
      name: category.name,
      value: category.value,
      count: categorySkills.length,
      averageLevel: Math.round(averageLevel)
    }
  })

  return (
    <section className="relative py-20 px-6">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10" />
      
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
            Skills & Expertise
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A comprehensive overview of my technical skills and proficiency levels across various domains
          </motion.p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={cn(
                "px-6 py-3 rounded-full border transition-all duration-300",
                selectedCategory === category.value
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-400/50 shadow-lg shadow-cyan-400/25"
                  : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
              )}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              {category.value !== 'all' && (
                <span className="ml-2 text-sm opacity-60">
                  ({skills.filter(skill => skill.category === category.value).length})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
          layout
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isHovered={hoveredSkill === skill.name}
              onHover={() => setHoveredSkill(skill.name)}
              onLeave={() => setHoveredSkill(null)}
            />
          ))}
        </motion.div>

        {/* Category statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categoryStats.map((stat, index) => (
            <motion.div
              key={stat.value}
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
                {stat.count}
              </motion.div>
              
              <div className="text-sm text-gray-300 mb-1">{stat.name}</div>
              
              <motion.div
                className="text-xs text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.7 }}
              >
                Avg: {stat.averageLevel}%
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive skill radar */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Skill Proficiency Overview
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Frontend', 'Backend', 'DevOps', 'ML/AI'].map((category, index) => {
              const categorySkills = skills.filter(skill => 
                skill.category === category.toLowerCase().replace('/', '').replace('ml/ai', 'ml')
              )
              const averageLevel = categorySkills.length > 0 
                ? categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length 
                : 0

              return (
                <motion.div
                  key={category}
                  className="relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <svg width="120" height="120" className="transform -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                      whileInView={{ 
                        strokeDashoffset: 2 * Math.PI * 50 * (1 - averageLevel / 100)
                      }}
                      transition={{ duration: 2, delay: index * 0.2 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-white">
                      {Math.round(averageLevel)}%
                    </div>
                    <div className="text-xs text-gray-400 text-center px-2">
                      {category}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { cn } from '@/lib/utils'