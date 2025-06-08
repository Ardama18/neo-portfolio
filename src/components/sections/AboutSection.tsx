'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Coffee, Code, Heart, Star } from 'lucide-react'
import { personalInfo, experiences } from '@/data/portfolio'
import ChatBot from '@/components/ui/ChatBot'

export default function AboutSection() {
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

  return (
    <section className="relative py-20 px-6">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-cyan-900/10" />
      
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
            About Me
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Get to know me through an interactive AI-powered conversation
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Personal info card */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Profile card */}
            <motion.div
              className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(34, 211, 238, 0.1)"
              }}
            >
              <div className="flex items-center space-x-6 mb-6">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-gray-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {personalInfo.name}
                  </h3>
                  <p className="text-cyan-400 font-medium">
                    {personalInfo.title}
                  </p>
                  <div className="flex items-center space-x-1 text-gray-400 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {personalInfo.bio}
              </p>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {[
                { icon: Code, label: 'Years Coding', value: '5+', color: 'text-cyan-400' },
                { icon: Coffee, label: 'Projects Built', value: '50+', color: 'text-purple-400' },
                { icon: Heart, label: 'Happy Clients', value: '25+', color: 'text-pink-400' },
                { icon: Star, label: 'GitHub Stars', value: '1.2k+', color: 'text-yellow-400' }
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Experience timeline */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
            >
              <h3 className="text-xl font-bold text-white mb-4">Experience</h3>
              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  className="relative pl-8"
                  variants={itemVariants}
                >
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 to-purple-500" />
                  
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-0 top-6 w-3 h-3 rounded-full transform -translate-x-1/2 ${
                      exp.current 
                        ? 'bg-green-400 animate-pulse' 
                        : 'bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.5 }}
                  />
                  
                  <motion.div
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {exp.position}
                        </h4>
                        <p className="text-cyan-400">{exp.company}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 text-gray-300 text-sm">
                      {exp.description.slice(0, 2).map((desc, i) => (
                        <li key={i}>• {desc}</li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive AI Chat */}
          <motion.div
            className="lg:sticky lg:top-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <ChatBot />
          </motion.div>
        </div>

        {/* Fun facts */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Fun Facts About Me
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🚀",
                fact: "Built my first website at age 12",
                description: "Started with HTML and never looked back"
              },
              {
                emoji: "🌙",
                fact: "I'm a night owl developer",
                description: "My best code happens after 10 PM"
              },
              {
                emoji: "🎮",
                fact: "Gaming inspires my UI designs",
                description: "Good UX is like good game design"
              },
              {
                emoji: "📚",
                fact: "Always learning something new",
                description: "Currently exploring Web3 and blockchain"
              },
              {
                emoji: "🎵",
                fact: "Code better with music",
                description: "Lo-fi hip hop is my coding soundtrack"
              },
              {
                emoji: "🌱",
                fact: "Love mentoring junior devs",
                description: "Teaching helps me learn too"
              }
            ].map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.fact}
                </h4>
                <p className="text-gray-400 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}