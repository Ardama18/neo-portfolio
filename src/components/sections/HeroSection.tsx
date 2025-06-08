'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/data/portfolio'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const glitchVariants = {
    hidden: { scaleX: 1 },
    visible: {
      scaleX: [1, 1.02, 0.98, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/70 z-10" />
      
      <motion.div
        className="relative z-20 text-center max-w-4xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glitch effect name */}
        <motion.div 
          className="relative mb-6"
          variants={glitchVariants}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            {personalInfo.name}
          </motion.h1>
          
          {/* Glitch layers */}
          <motion.h1 
            className="absolute inset-0 text-6xl md:text-8xl font-bold text-red-500 opacity-20 mix-blend-multiply"
            animate={{ 
              x: [0, -2, 2, 0],
              opacity: [0, 0.3, 0, 0.3, 0]
            }}
            transition={{ 
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 4
            }}
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.h1 
            className="absolute inset-0 text-6xl md:text-8xl font-bold text-blue-500 opacity-20 mix-blend-multiply"
            animate={{ 
              x: [0, 2, -2, 0],
              opacity: [0, 0.3, 0, 0.3, 0]
            }}
            transition={{ 
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 4,
              delay: 0.1
            }}
          >
            {personalInfo.name}
          </motion.h1>
        </motion.div>

        {/* Typing effect title */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h2 
            className="text-2xl md:text-4xl font-light text-gray-300"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 2, delay: 1 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 3
              }}
            >
              |
            </motion.span>
            {personalInfo.title}
          </motion.h2>
        </motion.div>

        {/* Bio with reveal animation */}
        <motion.p 
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          {personalInfo.bio}
        </motion.p>

        {/* Social links with hover effects */}
        <motion.div 
          className="flex justify-center space-x-8 mb-16"
          variants={itemVariants}
        >
          {[
            { icon: Github, href: personalInfo.github, label: 'GitHub' },
            { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' }
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              className="p-4 rounded-full border border-white/20 hover:border-cyan-400 transition-all duration-300 group"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={itemVariants}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/60"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
            <p className="text-sm mt-2">Scroll to explore</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Particle animation overlay */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0
            }}
            animate={{
              y: [null, -20],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </section>
  )
}