'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mail, MapPin, Github, Linkedin, Check, AlertCircle, Zap } from 'lucide-react'
import { personalInfo } from '@/data/portfolio'
import { ContactFormData } from '@/types'
import { cn } from '@/lib/utils'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@alexchen',
    href: personalInfo.github,
    color: 'from-gray-600 to-gray-800'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/alexchen',
    href: personalInfo.linkedin,
    color: 'from-blue-600 to-blue-800'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personalInfo.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
    color: 'from-red-500 to-pink-500'
  }
]

const projectTypes = [
  { value: 'freelance', label: 'Freelance Project', icon: '💼' },
  { value: 'fulltime', label: 'Full-time Position', icon: '🏢' },
  { value: 'collaboration', label: 'Collaboration', icon: '🤝' },
  { value: 'other', label: 'Other', icon: '💭' }
]

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    type: 'freelance'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate random success/error for demo
    const success = Math.random() > 0.2
    setSubmitStatus(success ? 'success' : 'error')
    setIsSubmitting(false)

    if (success) {
      setFormData({ name: '', email: '', message: '', type: 'freelance' })
    }

    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

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
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
      
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
            Let&apos;s Connect
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Ready to bring your ideas to life? Let&apos;s start a conversation about your next project
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact methods */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <p className="text-gray-300 mb-8">
                Choose your preferred way to reach out. I&apos;m always excited to discuss new opportunities and innovative projects.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group block"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 backdrop-blur-sm group-hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className={cn(
                          "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                          method.color
                        )}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <method.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          {method.label}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 mt-8"
              variants={containerVariants}
            >
              {[
                { label: 'Response Time', value: '< 24h', icon: '⚡' },
                { label: 'Projects Completed', value: '50+', icon: '✅' },
                { label: 'Client Satisfaction', value: '100%', icon: '⭐' }
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 backdrop-blur-sm">
              {/* Form header */}
              <div className="flex items-center space-x-3 mb-8">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project type selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    What type of project is this?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {projectTypes.map((type) => (
                      <motion.button
                        key={type.value}
                        type="button"
                        onClick={() => handleInputChange('type', type.value)}
                        className={cn(
                          "p-3 rounded-xl border transition-all text-left",
                          formData.type === type.value
                            ? "bg-cyan-500/20 text-cyan-400 border-cyan-400/50"
                            : "bg-white/5 border-white/20 text-white/70 hover:border-white/40"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{type.icon}</span>
                          <span className="text-sm">{type.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Name and email fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { field: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                    { field: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' }
                  ].map((fieldConfig) => (
                    <div key={fieldConfig.field} className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {fieldConfig.label}
                      </label>
                      <motion.input
                        type={fieldConfig.type}
                        value={formData[fieldConfig.field as keyof ContactFormData]}
                        onChange={(e) => handleInputChange(fieldConfig.field as keyof ContactFormData, e.target.value)}
                        onFocus={() => setFocusedField(fieldConfig.field)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={fieldConfig.placeholder}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition-all"
                        whileFocus={{ scale: 1.02 }}
                        required
                      />
                      <AnimatePresence>
                        {focusedField === fieldConfig.field && (
                          <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-cyan-400/30 pointer-events-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Message field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition-all resize-none"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                  <AnimatePresence>
                    {focusedField === 'message' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-cyan-400/30 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={cn(
                    "flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-medium transition-all",
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25"
                  )}>
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-white">Sending...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="send"
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Send className="w-5 h-5 text-white" />
                          <span className="text-white">Send Message</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                {/* Status messages */}
                <AnimatePresence>
                  {submitStatus !== 'idle' && (
                    <motion.div
                      className={cn(
                        "flex items-center space-x-3 p-4 rounded-xl",
                        submitStatus === 'success'
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {submitStatus === 'success' ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <span className="text-sm">
                        {submitStatus === 'success'
                          ? "Message sent successfully! I&apos;ll get back to you soon."
                          : "Failed to send message. Please try again or contact me directly."
                        }
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}