import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Group, LineBasicMaterial, Points as ThreePoints } from 'three'
import { useDocumentVisibility } from '../hooks/useDocumentVisibility'
import BlueprintFallback from './BlueprintFallback'

export type SceneMode =
  | 'hero' | 'identity' | 'priceuniverse' | 'unirag' | 'neural-network'
  | 'roam' | 'lael' | 'ask' | 'contact'

type ThemeMode = 'dark' | 'light'

const modeShift: Record<SceneMode, [number, number, number]> = {
  hero: [0, 0, 0], identity: [0, .1, 0], priceuniverse: [-.1, 0, .06],
  unirag: [.05, .12, .08], 'neural-network': [0, -.08, .1], roam: [.1, 0, .05],
  lael: [.08, -.08, .16], ask: [0, .02, .2], contact: [0, -.16, .28],
}

function useSceneTheme(): ThemeMode {
  const [theme, setTheme] = useState<ThemeMode>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return theme
}

function ParticleField({ reducedMotion, theme, sceneMode }: { reducedMotion: boolean; theme: ThemeMode; sceneMode: SceneMode }) {
  const points = useRef<ThreePoints>(null)
  const isCoarse = useThree((state) => state.size.width < 600)
  const count = isCoarse ? 1150 : 3200
  const shift = modeShift[sceneMode]
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3)
    let seed = 17
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let index = 0; index < count; index += 1) {
      const angle = random() * Math.PI * 2
      const radius = Math.pow(random(), .62) * 2.35
      const vertical = (random() - .5) * 2.6
      const i = index * 3
      values[i] = Math.cos(angle) * radius + shift[0]
      values[i + 1] = Math.sin(angle) * radius * .72 + vertical * .38 + shift[1]
      values[i + 2] = (random() - .5) * 1.8 + shift[2]
    }
    return values
  }, [count, shift])

  useFrame(({ clock, pointer }) => {
    if (!points.current || reducedMotion) return
    points.current.rotation.y += .0009
    points.current.rotation.x += (pointer.y * .04 - points.current.rotation.x) * .018
    points.current.position.x += (pointer.x * .08 - points.current.position.x) * .02
    const material = points.current.material as THREE.PointsMaterial
    material.opacity = .42 + Math.sin(clock.getElapsedTime() * .35) * .035
  })

  return (
    <points ref={points} position={[0, 0, -0.2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={theme === 'light' ? '#3b8cff' : '#a7c8d4'}
        size={isCoarse ? .018 : .022}
        transparent
        opacity={theme === 'light' ? .22 : .46}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function OrbitPaths({ theme }: { theme: ThemeMode }) {
  const material = useRef<LineBasicMaterial>(null)
  const geometry = useMemo(() => {
    const curves = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.6, -.8, -.5), new THREE.Vector3(-.8, .28, .4),
        new THREE.Vector3(.8, -.55, .25), new THREE.Vector3(2.7, .8, -.1),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.5, .8, .1), new THREE.Vector3(-.4, 1.05, -.2),
        new THREE.Vector3(1.1, .25, .6), new THREE.Vector3(2.55, -.75, .1),
      ]),
    ]
    return curves.map((curve) => curve.getPoints(70).flatMap((point) => [point.x, point.y, point.z]))
  }, [])

  return <>
    {geometry.map((positions, index) => (
      <line key={index}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(positions), 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={index === 0 ? material : undefined} color={index === 0 ? '#3b8cff' : theme === 'light' ? '#89979c' : '#677d88'} transparent opacity={index === 0 ? .55 : .22} />
      </line>
    ))}
  </>
}

function DataGlobe({ theme }: { theme: ThemeMode }) {
  const group = useRef<Group>(null)
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * .035 })
  return (
    <group ref={group} position={[1.98, .3, -.15]} scale={.6}>
      <mesh>
        <sphereGeometry args={[1, 20, 14]} />
        <meshBasicMaterial color={theme === 'light' ? '#b6c1c1' : '#41616c'} wireframe transparent opacity={theme === 'light' ? .22 : .28} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.18, .008, 4, 64]} />
        <meshBasicMaterial color="#3b8cff" transparent opacity={.5} />
      </mesh>
    </group>
  )
}

function SystemBlueprint({ reducedMotion, theme, sceneMode }: { reducedMotion: boolean; theme: ThemeMode; sceneMode: SceneMode }) {
  const group = useRef<Group>(null)
  const shift = modeShift[sceneMode]
  useFrame(({ pointer }, delta) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.x += (pointer.y * .06 - group.current.rotation.x) * delta
    group.current.rotation.y += (pointer.x * .08 - group.current.rotation.y) * delta
  })
  return (
    <group ref={group} position={[shift[0], shift[1], shift[2]]}>
      <ParticleField reducedMotion={reducedMotion} theme={theme} sceneMode={sceneMode} />
      <OrbitPaths theme={theme} />
      <DataGlobe theme={theme} />
    </group>
  )
}

export default function HeroScene({ sceneMode = 'hero', fullScreen = false }: { sceneMode?: SceneMode; fullScreen?: boolean }) {
  const visible = useDocumentVisibility()
  const theme = useSceneTheme()
  const [canRender] = useState(() => {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  })
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  if (!canRender) return <BlueprintFallback />
  return (
    <Canvas
      className={fullScreen ? 'experience-canvas' : 'hero-canvas'}
      camera={{ fov: 42, position: [0, 0, 5.2] }}
      dpr={window.matchMedia('(pointer: coarse)').matches ? 1 : [1, 1.35]}
      frameloop={visible ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <SystemBlueprint reducedMotion={reducedMotion} theme={theme} sceneMode={sceneMode} />
    </Canvas>
  )
}
