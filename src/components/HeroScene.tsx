import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import {
  blueprintLinks,
  blueprintModules,
  type BlueprintModule,
  type BlueprintPoint,
} from '../data/blueprint'
import { useDocumentVisibility } from '../hooks/useDocumentVisibility'
import BlueprintFallback from './BlueprintFallback'

export type SceneMode =
  | 'hero'
  | 'identity'
  | 'priceuniverse'
  | 'unirag'
  | 'neural-network'
  | 'roam'
  | 'lael'
  | 'ask'
  | 'contact'

const modeOffsets: Record<SceneMode, [number, number, number]> = {
  hero: [0, 0, 0],
  identity: [0, 0.12, 0],
  priceuniverse: [-0.14, 0, 0.08],
  unirag: [0.04, 0.14, 0.1],
  'neural-network': [0, -0.12, 0.12],
  roam: [0.12, 0, 0.06],
  lael: [0.08, -0.08, 0.18],
  ask: [0, 0.04, 0.24],
  contact: [0, -0.18, 0.32],
}

function BlueprintLinks() {
  const positions = useMemo(() => new Float32Array(blueprintLinks.flatMap(([from, to]) => [
    ...blueprintModules[from].position,
    ...blueprintModules[to].position,
  ])), [])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#6fb5c0" transparent opacity={0.42} />
    </lineSegments>
  )
}

function BlueprintModule({ position, scale, accent }: BlueprintModule) {
  const color = accent ? '#d9797c' : '#85cbd4'

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={scale} />
        <meshBasicMaterial color="#10243a" transparent opacity={0.76} />
      </mesh>
      <mesh>
        <boxGeometry args={[scale[0] + 0.06, scale[1] + 0.06, scale[2] + 0.04]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.72} />
      </mesh>
      <mesh position={[0, 0, scale[2] + 0.06]}>
        <boxGeometry args={[0.07, 0.07, 0.04]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

function Signal({
  start,
  end,
  offset,
  reducedMotion,
}: {
  start: BlueprintPoint
  end: BlueprintPoint
  offset: number
  reducedMotion: boolean
}) {
  const signal = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!signal.current) return
    const progress = reducedMotion
      ? offset
      : (clock.getElapsedTime() * 0.18 + offset) % 1
    signal.current.position.set(
      start[0] + (end[0] - start[0]) * progress,
      start[1] + (end[1] - start[1]) * progress,
      0.16,
    )
  })

  return (
    <mesh ref={signal}>
      <sphereGeometry args={[0.045, 10, 10]} />
      <meshBasicMaterial color="#d9797c" />
    </mesh>
  )
}

function SystemBlueprint({ reducedMotion, sceneMode }: { reducedMotion: boolean; sceneMode: SceneMode }) {
  const group = useRef<Group>(null)
  const { size } = useThree()
  const isWideCanvas = size.width >= 720
  const offset = modeOffsets[sceneMode]

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return
    const targetX = state.pointer.y * 0.12
    const targetY = state.pointer.x * 0.16
    group.current.rotation.x += (targetX - group.current.rotation.x) * delta * 1.7
    group.current.rotation.y += (targetY - group.current.rotation.y) * delta * 1.7
  })

  return (
    <group
      ref={group}
      position={isWideCanvas ? [0.74 + offset[0], -0.06 + offset[1], offset[2]] : [0.88 + offset[0], -0.12 + offset[1], offset[2]]}
      scale={isWideCanvas ? 1.16 : 1}
    >
      <BlueprintLinks />
      {blueprintModules.map((module) => <BlueprintModule key={module.id} {...module} />)}
      {blueprintLinks.slice(0, 4).map(([from, to], index) => (
        <Signal
          key={`${from}-${to}`}
          start={blueprintModules[from].position}
          end={blueprintModules[to].position}
          offset={index * 0.19}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  )
}

export default function HeroScene({ sceneMode = 'hero' }: { sceneMode?: SceneMode }) {
  const isDocumentVisible = useDocumentVisibility()
  const [canRender] = useState(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return Boolean(context)
  })
  const [reducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  if (!canRender) return <BlueprintFallback />

  return (
    <Canvas
      className="hero-canvas"
      camera={{ fov: 42, position: [0, 0, 5.2]}}
      dpr={window.matchMedia('(pointer: coarse)').matches ? [1, 1] : [1, 1.35]}
      frameloop={isDocumentVisible ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <SystemBlueprint reducedMotion={reducedMotion} sceneMode={sceneMode} />
    </Canvas>
  )
}
