export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  imageUrl: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  category: 'web' | 'mobile' | 'api' | 'ml' | 'other'
  year: number
  status: 'completed' | 'in-progress' | 'concept'
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'ml' | 'design' | 'other'
  level: number // 0-100
  years: number
  icon?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  description: string[]
  technologies: string[]
  current: boolean
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  type: 'freelance' | 'fulltime' | 'collaboration' | 'other'
}

export interface ThemeConfig {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface AnimationConfig {
  duration: number
  easing: string
  delay?: number
}

export interface ChatMessage {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  typing?: boolean
}