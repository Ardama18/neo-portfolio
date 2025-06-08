'use client'

import { motion } from 'framer-motion'
import { Skill } from '@/types'
import { cn } from '@/lib/utils'

interface SkillCardProps {
  skill: Skill
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  mobile: 'from-purple-500 to-pink-500',
  devops: 'from-orange-500 to-red-500',
  ml: 'from-violet-500 to-purple-500',
  design: 'from-pink-500 to-rose-500',
  other: 'from-gray-500 to-slate-500'
}

export default function SkillCard({ skill, index, isHovered, onHover, onLeave }: SkillCardProps) {
  const gradientClass = categoryColors[skill.category]
  
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        damping: 20,
        stiffness: 100
      }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      whileHover={{ 
        scale: 1.05,
        rotateY: 10,
        z: 50
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Card container */}
      <div className={cn(
        "relative p-6 rounded-2xl border border-white/10 transition-all duration-500",
        "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm",
        isHovered && "border-white/30 shadow-2xl"
      )}>
        {/* Animated background gradient */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500",
            gradientClass
          )}
          animate={{ 
            opacity: isHovered ? 0.1 : 0 
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon and name */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {skill.icon && (
                <motion.span 
                  className="text-2xl"
                  animate={{ 
                    scale: isHovered ? 1.2 : 1,
                    rotate: isHovered ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {skill.icon}
                </motion.span>
              )}
              <h3 className="text-xl font-semibold text-white">
                {skill.name}
              </h3>
            </div>
            
            {/* Category badge */}
            <motion.span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium text-white",
                `bg-gradient-to-r ${gradientClass}`
              )}
              whileHover={{ scale: 1.1 }}
            >
              {skill.category}
            </motion.span>
          </div>
          
          {/* Skill level bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Proficiency</span>
              <span className="text-sm font-semibold text-white">{skill.level}%</span>
            </div>
            
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full",
                  `bg-gradient-to-r ${gradientClass}`
                )}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ 
                  delay: index * 0.1 + 0.5,
                  duration: 1,
                  ease: "easeOut"
                }}
              />
              
              {/* Animated glow effect */}
              <motion.div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full opacity-50 blur-sm",
                  `bg-gradient-to-r ${gradientClass}`
                )}
                animate={{ 
                  width: isHovered ? `${skill.level}%` : '0%',
                  opacity: isHovered ? 0.8 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          {/* Experience years */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Experience</span>
            <motion.span 
              className="text-white font-medium"
              animate={{ 
                scale: isHovered ? 1.1 : 1 
              }}
            >
              {skill.years} year{skill.years !== 1 ? 's' : ''}
            </motion.span>
          </div>
        </div>
        
        {/* Hover effect particles */}
        <AnimatePresence>
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                    x: Math.random() * 200,
                    y: Math.random() * 200,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    y: [null, -20],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

import { AnimatePresence } from 'framer-motion'