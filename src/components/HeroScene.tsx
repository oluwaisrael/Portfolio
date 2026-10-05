import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import type { Group, Mesh } from 'three'

function SystemCore() {
  const group = useRef<Group>(null)
  const shell = useRef<Mesh>(null)
  const ring = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!group.current || !shell.current || !ring.current) return

    const targetX = state.pointer.y * 0.18
    const targetY = state.pointer.x * 0.3

    group.current.rotation.x += (targetX - group.current.rotation.x) * delta * 1.8
    group.current.rotation.y += (targetY - group.current.rotation.y) * delta * 1.8
    shell.current.rotation.y += delta * 0.15
    ring.current.rotation.z -= delta * 0.22
  })

  return (
    <group ref={group} position={[0.7, -0.15, 0]}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.24, 2]} />
        <meshBasicMaterial color="#78c7d4" wireframe transparent opacity={0.22} />
      </mesh>

      <mesh ref={ring} rotation={[1.1, 0.2, 0]}>
        <torusGeometry args={[1.53, 0.014, 8, 64]} />
        <meshBasicMaterial color="#d97a7e" transparent opacity={0.75} />
      </mesh>

      <mesh rotation={[0.1, 0.8, 0.4]}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshBasicMaterial color="#8ccbd4" wireframe transparent opacity={0.56} />
      </mesh>

      <pointLight color="#8ccbd4" intensity={2} distance={4} />
    </group>
  )
}

export default function HeroScene() {
  const [canRender] = useState(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return Boolean(context)
  })

  if (!canRender) return null

  return (
    <Canvas
      className="hero-canvas"
      camera={{ fov: 42, position: [0, 0, 5.2] }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <SystemCore />
    </Canvas>
  )
}
