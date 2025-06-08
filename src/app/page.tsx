'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/ui/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/3d/Scene3D'), {
  ssr: false
})

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* 3D Background Scene */}
      <Scene3D />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <HeroSection />
        </section>
        
        {/* Placeholder sections for other parts */}
        <section id="about" className="min-h-screen bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm">
          <AboutSection />
        </section>
        
        <section id="skills" className="min-h-screen bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm">
          <SkillsSection />
        </section>
        
        <section id="projects" className="min-h-screen bg-gradient-to-br from-cyan-900/20 to-green-900/20 backdrop-blur-sm">
          <ProjectsSection />
        </section>
        
        <section id="contact" className="min-h-screen bg-gradient-to-br from-green-900/20 to-purple-900/20 backdrop-blur-sm">
          <ContactSection />
        </section>
      </main>
    </div>
  )
}
