'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { ChatMessage } from '@/types'
import { cn } from '@/lib/utils'

const predefinedQuestions = [
  "Tell me about yourself",
  "What's your background?",
  "What are your main skills?",
  "What projects are you most proud of?",
  "What's your experience with React?",
  "How did you get into programming?",
  "What's your work philosophy?",
  "What are your career goals?"
]

const responses: Record<string, string> = {
  "tell me about yourself": "Hi! I'm Ardama, a passionate full-stack engineer with 5+ years of experience building innovative web applications and AI-powered solutions. I love exploring the intersection of technology and human experience, constantly pushing the boundaries of what's possible with modern web technologies.",
  
  "what's your background": "I have a strong background in computer science and have been professionally developing software for over 5 years. I've worked at both startups and larger tech companies, giving me experience with different scales and types of projects. I'm passionate about both frontend and backend development, with a particular interest in AI and machine learning applications.",
  
  "what are your main skills": "My core expertise includes React, Next.js, TypeScript, Node.js, and Python. I'm also experienced with cloud platforms like AWS, containerization with Docker, and modern development practices. Recently, I've been diving deep into AI/ML technologies, particularly TensorFlow and building AI-powered web applications.",
  
  "what projects are you most proud of": "I'm particularly proud of NeuralChat AI Platform - a revolutionary communication system that leverages neural networks for intelligent interactions. I also developed Quantum Portfolio Engine, which uses quantum computing principles for financial optimization. These projects showcase my ability to work with cutting-edge technologies.",
  
  "what's your experience with react": "I've been working with React for over 5 years, from the class component days to modern hooks and beyond. I'm experienced with the entire React ecosystem including Redux, Context API, React Router, and testing with Jest and React Testing Library. I also have extensive experience with Next.js for production applications.",
  
  "how did you get into programming": "I started programming in college, initially drawn to the logical problem-solving aspect. My first 'aha!' moment was building a simple web app that helped students find study groups. Seeing how code could solve real problems and create meaningful experiences hooked me. I've been passionate about it ever since!",
  
  "what's your work philosophy": "I believe in writing clean, maintainable code that not only works but is a joy to work with. I'm a strong advocate for user-centered design and think the best technology is invisible to the end user. Collaboration and continuous learning are core to how I approach every project.",
  
  "what are your career goals": "I'm focused on becoming a technical leader who can bridge the gap between complex technology and real-world solutions. I'm particularly interested in the ethical development of AI systems and want to contribute to making technology more accessible and beneficial for everyone."
}

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm Ardama's AI assistant. I can tell you about his background, skills, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findBestResponse = (question: string): string => {
    const normalizedQuestion = question.toLowerCase().trim()
    
    // Direct match
    if (responses[normalizedQuestion]) {
      return responses[normalizedQuestion]
    }
    
    // Find best partial match
    let bestMatch = ''
    let bestScore = 0
    
    Object.keys(responses).forEach(key => {
      const words = key.split(' ')
      const questionWords = normalizedQuestion.split(' ')
      
      let score = 0
      words.forEach(word => {
        if (questionWords.some(qWord => qWord.includes(word) || word.includes(qWord))) {
          score++
        }
      })
      
      if (score > bestScore) {
        bestScore = score
        bestMatch = responses[key]
      }
    })
    
    return bestMatch || "That's an interesting question! I'd love to discuss that further with you. Feel free to ask about Ardama's background, skills, projects, or experience - I have lots of insights to share!"
  }

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim()
    if (!messageText) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Add AI response
    const response = findBestResponse(messageText)
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: response,
      isUser: false,
      timestamp: new Date()
    }

    setIsTyping(false)
    setMessages(prev => [...prev, aiMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat header */}
      <motion.div
        className="flex items-center space-x-4 p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-t-2xl border border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="relative"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
        
        <div>
          <h3 className="text-lg font-semibold text-white">Ardama AI Assistant</h3>
          <p className="text-sm text-gray-400">Ask me anything about Ardama&apos;s background and experience</p>
        </div>
        
        <motion.div
          className="ml-auto"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </motion.div>

      {/* Chat messages */}
      <div className="h-96 overflow-y-auto p-6 bg-black/20 border-x border-white/20 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={cn(
                "flex items-start space-x-3",
                message.isUser ? "justify-end" : "justify-start"
              )}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {!message.isUser && (
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </motion.div>
              )}
              
              <motion.div
                className={cn(
                  "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl",
                  message.isUser
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white ml-auto"
                    : "bg-white/10 border border-white/20 text-gray-100"
                )}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </motion.div>
              
              {message.isUser && (
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <User className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex items-start space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      <div className="p-4 bg-white/5 border-x border-white/20">
        <p className="text-sm text-gray-400 mb-3">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {predefinedQuestions.slice(0, 4).map((question) => (
            <motion.button
              key={question}
              onClick={() => handleSendMessage(question)}
              className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-full text-gray-300 hover:text-white transition-all border border-white/10 hover:border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-b-2xl border border-white/20 border-t-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about Ardama..."
          className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition-all"
          disabled={isTyping}
        />
        
        <motion.button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isTyping}
          className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}