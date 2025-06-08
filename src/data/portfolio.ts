import { Project, Skill, Experience } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'NeuralChat AI Platform',
    description: 'Revolutionary AI-powered communication platform with neural network integration',
    longDescription: 'A cutting-edge platform that leverages advanced neural networks to create intelligent communication systems. Features real-time AI responses, sentiment analysis, and adaptive learning capabilities.',
    technologies: ['Next.js', 'Python', 'TensorFlow', 'WebGL', 'Socket.io', 'PostgreSQL'],
    imageUrl: '/projects/neural-chat.jpg',
    demoUrl: 'https://neuralchat-demo.com',
    githubUrl: 'https://github.com/user/neural-chat',
    featured: true,
    category: 'ml',
    year: 2024,
    status: 'completed'
  },
  {
    id: '2',
    title: 'Quantum Portfolio Engine',
    description: 'Next-generation portfolio management system with quantum computing algorithms',
    longDescription: 'An innovative portfolio management system that uses quantum computing principles for optimization and risk analysis. Features real-time market data integration and predictive analytics.',
    technologies: ['React', 'Node.js', 'Quantum.js', 'D3.js', 'Redis', 'MongoDB'],
    imageUrl: '/projects/quantum-portfolio.jpg',
    demoUrl: 'https://quantum-portfolio.com',
    githubUrl: 'https://github.com/user/quantum-portfolio',
    featured: true,
    category: 'web',
    year: 2024,
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'HoloMeet VR Platform',
    description: 'Immersive virtual reality meeting platform with holographic avatars',
    longDescription: 'A revolutionary VR platform that enables immersive business meetings with realistic holographic avatars, spatial audio, and collaborative 3D workspaces.',
    technologies: ['Unity', 'C#', 'WebXR', 'Three.js', 'WebRTC', 'Firebase'],
    imageUrl: '/projects/holomeet.jpg',
    demoUrl: 'https://holomeet-vr.com',
    githubUrl: 'https://github.com/user/holomeet',
    featured: true,
    category: 'web',
    year: 2023,
    status: 'completed'
  },
  {
    id: '4',
    title: 'CyberGuard Security Suite',
    description: 'Advanced cybersecurity framework with AI-powered threat detection',
    longDescription: 'A comprehensive security suite that uses machine learning algorithms to detect and prevent cyber threats in real-time. Features behavioral analysis and automated response systems.',
    technologies: ['Go', 'Python', 'Elasticsearch', 'Kafka', 'Docker', 'Kubernetes'],
    imageUrl: '/projects/cyberguard.jpg',
    githubUrl: 'https://github.com/user/cyberguard',
    featured: false,
    category: 'api',
    year: 2023,
    status: 'completed'
  }
]

export const skills: Skill[] = [
  { name: 'React', category: 'frontend', level: 95, years: 5, icon: '⚛️' },
  { name: 'Next.js', category: 'frontend', level: 90, years: 3, icon: '▲' },
  { name: 'TypeScript', category: 'frontend', level: 92, years: 4, icon: '📘' },
  { name: 'Node.js', category: 'backend', level: 88, years: 5, icon: '🟢' },
  { name: 'Python', category: 'backend', level: 85, years: 4, icon: '🐍' },
  { name: 'TensorFlow', category: 'ml', level: 75, years: 2, icon: '🧠' },
  { name: 'Three.js', category: 'frontend', level: 80, years: 2, icon: '🎮' },
  { name: 'WebGL', category: 'frontend', level: 70, years: 2, icon: '🎨' },
  { name: 'PostgreSQL', category: 'backend', level: 82, years: 4, icon: '🐘' },
  { name: 'Docker', category: 'devops', level: 78, years: 3, icon: '🐳' },
  { name: 'AWS', category: 'devops', level: 85, years: 4, icon: '☁️' },
  { name: 'Figma', category: 'design', level: 75, years: 3, icon: '🎨' }
]

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'QuantumTech Industries',
    position: 'Senior Full-Stack Engineer',
    duration: '2022 - Present',
    description: [
      'Lead development of quantum-inspired algorithms for web applications',
      'Architected scalable microservices handling 1M+ daily users',
      'Mentored junior developers and established coding standards',
      'Implemented AI-driven features increasing user engagement by 40%'
    ],
    technologies: ['React', 'Node.js', 'TensorFlow', 'Kubernetes', 'PostgreSQL'],
    current: true
  },
  {
    id: '2',
    company: 'NeuralSoft Solutions',
    position: 'Frontend Architect',
    duration: '2020 - 2022',
    description: [
      'Designed and implemented complex 3D visualizations using WebGL',
      'Built responsive web applications with advanced animations',
      'Optimized application performance achieving 95+ Lighthouse scores',
      'Collaborated with UX team to create intuitive user interfaces'
    ],
    technologies: ['React', 'Three.js', 'WebGL', 'TypeScript', 'Redux'],
    current: false
  }
]

export const personalInfo = {
  name: 'Alex Chen',
  title: 'Full-Stack Engineer & AI Enthusiast',
  location: 'San Francisco, CA',
  email: 'alex@example.com',
  github: 'https://github.com/alexchen',
  linkedin: 'https://linkedin.com/in/alexchen',
  bio: 'Passionate software engineer with expertise in building cutting-edge web applications and AI-powered solutions. I love exploring the intersection of technology and human experience.'
}