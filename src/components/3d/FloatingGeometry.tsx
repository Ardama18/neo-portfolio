'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { getRandomFloat } from '@/lib/utils'

interface FloatingGeometryProps {
  count?: number
}

export default function FloatingGeometry({ count = 50 }: FloatingGeometryProps) {
  const meshRef = useRef<Mesh>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          getRandomFloat(-10, 10),
          getRandomFloat(-10, 10),
          getRandomFloat(-10, 10)
        ],
        rotation: [
          getRandomFloat(0, Math.PI * 2),
          getRandomFloat(0, Math.PI * 2),
          getRandomFloat(0, Math.PI * 2)
        ],
        scale: getRandomFloat(0.1, 0.3),
        speed: getRandomFloat(0.01, 0.03)
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={meshRef}>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position as [number, number, number]}
          rotation={particle.rotation as [number, number, number]}
          scale={particle.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={`hsl(${200 + (i * 5) % 60}, 70%, 60%)`}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
      ))}
      
      {/* Central glowing sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Rotating rings */}
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.1} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[2.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.1} />
        </mesh>
      </group>
    </group>
  )
}