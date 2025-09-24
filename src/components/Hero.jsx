import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { motion, useReducedMotion } from 'framer-motion'
import { MotionCanvas } from 'framer-motion-3d'
import * as THREE from 'three'

function ParallaxCameraTilt({ maxX = 0.12, maxY = 0.12 }) {
  const { camera, viewport } = useThree()
  const pointer = useThree((s) => s.pointer)
  useFrame(() => {
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, pointer.y * maxY, 0.05)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -pointer.x * maxX, 0.05)
    camera.updateProjectionMatrix()
  })
  return null
}

function PointerGlow() {
  const light = useRef()
  const { pointer } = useThree()
  useFrame(() => {
    if (!light.current) return
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, pointer.x * 3, 0.1)
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, pointer.y * 2, 0.1)
  })
  return <pointLight ref={light} color={'#00E5FF'} intensity={1.1} distance={6} />
}

function NeuralRibbons() {
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0F1116', emissive: '#00E5FF', emissiveIntensity: 1.1, roughness: 0.6, metalness: 0.1 }), [])
  const curves = useMemo(() => {
    const makeCurve = (seed) => {
      const rng = new THREE.MathUtils.seededRandom
      const pts = new Array(8).fill(0).map((_, i) => new THREE.Vector3(
        Math.sin(i * 0.6 + seed) * 1.5,
        Math.cos(i * 0.5 + seed) * 0.6,
        (i - 4) * 0.4
      ))
      return new THREE.CatmullRomCurve3(pts)
    }
    return [makeCurve(0.1), makeCurve(0.7), makeCurve(1.3)]
  }, [])
  const meshes = useRef([])
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshes.current.forEach((m, i) => {
      if (!m) return
      m.material.emissiveIntensity = 0.9 + Math.sin(t * 2 + i) * 0.25
    })
  })
  return (
    <group scale={4.6}>
      {curves.map((curve, i) => (
        <mesh key={i} ref={(el) => (meshes.current[i] = el)} material={material}>
          <tubeGeometry args={[curve, 200, 0.04, 8, false]} />
        </mesh>
      ))}
    </group>
  )
}

function CircuitOrbit() {
  const ring = useRef()
  useFrame((_, dt) => {
    if (ring.current) ring.current.rotation.z += dt * 0.03 * Math.PI * 2
  })
  return (
    <group scale={6.2}>
      <mesh ref={ring}>
        <torusGeometry args={[1.2, 0.02, 16, 256]} />
        <meshStandardMaterial color={'#1A2230'} metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.35, 1.37, 128]} />
        <meshBasicMaterial color={'#B6FF4D'} transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

function FloatingTiles() {
  const tiles = useMemo(() => new Array(8).fill(0).map((_, i) => ({ key: i, angle: (i / 8) * Math.PI * 2, radius: 3.5, y: (i % 4) * 0.6 - 1.2 })), [])
  const group = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return
    group.current.children.forEach((tile, i) => {
      const a = tiles[i].angle + t * 0.5 * 0.2
      tile.position.set(Math.cos(a) * tiles[i].radius, tiles[i].y + Math.sin(t * 0.8 + i) * 0.2, Math.sin(a) * tiles[i].radius)
      tile.rotation.y = a + Math.sin(t + i) * 0.2
    })
  })
  return (
    <group ref={group}>
      {tiles.map((t) => (
        <mesh key={t.key}>
          <boxGeometry args={[0.7, 0.45, 0.02]} />
          <meshPhysicalMaterial transmission={0.5} roughness={0.15} color={'#111317'} thickness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function HoloTrophy() {
  const meshRef = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!meshRef.current) return
    meshRef.current.position.y = -0.3 + Math.sin(t * 0.8) * 0.15
  })
  return (
    <group position={[0.9, -0.3, 0]} scale={0.9}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshBasicMaterial color={'#0F1116'} wireframe />
      </mesh>
      <pointLight color={'#FF6A3D'} intensity={1.2} distance={3} />
    </group>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="hero" className="relative overflow-hidden min-h-[92vh] flex items-center justify-center">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#1D0F0A,transparent_25%),radial-gradient(circle_at_50%_60%,#0F0C12,transparent_40%),#0A0B0E]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grain-overlay" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-sm tracking-wide text-[color:var(--text-secondary,#C9D2E1)]">
          Official 2025
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-3 font-extrabold leading-tight text-[clamp(2.6rem,6vw,5.2rem)] tracking-[-0.015em] text-[color:var(--text-primary,#F2F5F9)]">
          Build bold AI
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="mx-auto mt-4 max-w-2xl text-[color:var(--text-muted,#94A3B8)]">
          48 hours. Real problems. Future‑ready products.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#register" aria-label="Register for AI GENESIS" className="inline-flex items-center justify-center rounded-md bg-[color:var(--cta-bg,#FF6A3D)] px-5 py-3 font-medium text-[color:var(--cta-fg,#0B0F14)] shadow-[0_8px_30px_rgba(255,106,61,0.35)] hover:bg-[color:var(--cta-hover,#FF835C)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(182,255,77,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)]">
            Get started
          </a>
          <a href="#tracks" aria-label="See available tracks" className="inline-flex items-center justify-center rounded-md border border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)] px-5 py-3 font-medium text-[color:var(--text-primary,#F2F5F9)] hover:border-[color:var(--border-hard,#2A3242)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(182,255,77,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)]">
            See tracks
          </a>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-6 text-xs text-[color:var(--text-secondary,#C9D2E1)]">
          Trusted by builders worldwide
        </motion.p>
      </div>

      {reduceMotion ? (
        <img src="/static_hero.png" alt="Abstract AI themed background" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      ) : (
        <div className="absolute inset-0" aria-hidden>
          <Canvas camera={{ position: [0, 0, 8], fov: 38 }} dpr={[1, 2]}>
            <color attach="background" args={["#0A0B0E"]} />
            <ambientLight intensity={0.55} />
            <directionalLight intensity={1.2} position={[2, 3, 4]} color="#00E5FF" />
            <directionalLight intensity={0.85} position={[-3, -2, 2]} color="#FF6A3D" />
            <PointerGlow />
            <Suspense fallback={<Html center className="text-[color:var(--text-secondary,#C9D2E1)]">Loading…</Html>}>
              <Float rotationIntensity={0.02} floatIntensity={0.5}>
                <NeuralRibbons />
                <CircuitOrbit />
                <FloatingTiles />
                <HoloTrophy />
              </Float>
              <Environment preset="city" />
              <EffectComposer>
                <Bloom intensity={0.7} luminanceThreshold={0.86} luminanceSmoothing={0.7} />
                <Vignette eskil={false} offset={0.1} darkness={0.32} />
              </EffectComposer>
            </Suspense>
            <ParallaxCameraTilt />
          </Canvas>
        </div>
      )}

      <div className="absolute bottom-6 z-10 text-center">
        <span className="text-xs text-[color:var(--text-muted,#94A3B8)]">Scroll to explore</span>
      </div>
    </section>
  )
}
