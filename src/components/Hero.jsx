import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Float, Environment, Instances, Instance } from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

function ParallaxCameraTilt({ maxX = 0.12, maxY = 0.12 }) {
  const { camera } = useThree()
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
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, pointer.x * 3, 0.12)
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, pointer.y * 2, 0.12)
  })
  return <pointLight ref={light} color={'#00E5FF'} intensity={1.1} distance={6} />
}

function NeonCore() {
  const mesh = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!mesh.current) return
    mesh.current.rotation.y = t * 0.15
    const mat = mesh.current.material
    mat.emissiveIntensity = 0.7 + Math.sin(t * 1.6) * 0.25
  })
  return (
    <mesh ref={mesh} scale={0.9}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0.2} metalness={0.4} roughness={0.35} color={'#111317'} emissive={'#FF4DD8'} emissiveIntensity={0.9} />
    </mesh>
  )
}

function useFibonacciSphere(count = 280, radius = 2.2) {
  return useMemo(() => {
    const pts = []
    const offset = 2 / count
    const inc = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * inc
      pts.push(new THREE.Vector3(Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius))
    }
    return pts
  }, [count, radius])
}

function NeuralWeb({ count = 220 }) {
  const group = useRef()
  const nodes = useFibonacciSphere(count, 2.6)
  const positions = useMemo(() => nodes.map((v) => v.toArray()), [nodes])

  const edges = useMemo(() => {
    const pairs = []
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]
      let best = []
      for (let j = 0; j < nodes.length; j++) if (i !== j) {
        const d = a.distanceTo(nodes[j])
        best.push([d, j])
      }
      best.sort((x, y) => x[0] - y[0])
      for (let k = 0; k < 2; k++) pairs.push([i, best[k][1]])
    }
    const arr = new Float32Array(pairs.length * 2 * 3)
    pairs.forEach((p, idx) => {
      const v1 = nodes[p[0]], v2 = nodes[p[1]]
      arr.set([v1.x, v1.y, v1.z, v2.x, v2.y, v2.z], idx * 6)
    })
    return arr
  }, [nodes])

  const lineGeom = useMemo(() => new THREE.BufferGeometry(), [])
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#00E5FF', transparent: true, opacity: 0.28 }), [])
  useMemo(() => {
    lineGeom.setAttribute('position', new THREE.BufferAttribute(edges, 3))
    return () => lineGeom.dispose()
  }, [edges, lineGeom])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) group.current.rotation.y = t * 0.05
    lineMat.opacity = 0.22 + (Math.sin(t * 1.2) + 1) * 0.12
  })

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeom} material={lineMat} />
      <Instances limit={positions.length} range={positions.length}>
        <icosahedronGeometry args={[0.028, 0]} />
        <meshBasicMaterial color={'#B6FF4D'} />
        {positions.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>
    </group>
  )
}

function ParticleSwarm({ count = 480, radius = 3.6 }) {
  const group = useRef()
  const seeds = useMemo(() => new Array(count).fill(0).map((_, i) => ({
    a: (i / count) * Math.PI * 2,
    r: radius * (0.6 + Math.random() * 0.4),
    h: (Math.random() - 0.5) * 1.4,
    s: 0.2 + Math.random() * 0.6
  })), [count, radius])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return
    let i = 0
    for (const m of group.current.children) {
      const d = seeds[i]
      const a = d.a + t * d.s * 0.6
      m.position.set(Math.cos(a) * d.r, d.h + Math.sin(t * 0.7 + i) * 0.15, Math.sin(a) * d.r)
      m.rotation.y = a
      i++
    }
  })

  return (
    <group ref={group}>
      {seeds.map((d, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={'#00E5FF'} opacity={0.6} transparent />
        </mesh>
      ))}
    </group>
  )
}

function DataHalo() {
  const ring = useRef()
  useFrame((_, dt) => {
    if (ring.current) ring.current.rotation.z += dt * 0.2
  })
  return (
    <mesh ref={ring} scale={4.6}>
      <torusGeometry args={[1.2, 0.02, 16, 256]} />
      <meshBasicMaterial color={'#00E5FF'} transparent opacity={0.45} />
    </mesh>
  )
}

export default function Hero({ content }) {
  const reduceMotion = useReducedMotion()
  const c = content || {}
  return (
    <section id="hero" className="relative overflow-hidden min-h-[92vh] flex items-center justify-center">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#1D0F0A,transparent_25%),radial-gradient(circle_at_50%_60%,#0F0C12,transparent_40%),#0A0B0E]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grain-overlay" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-sm tracking-wide text-[color:var(--text-secondary,#C9D2E1)]">
          {c.eyebrow || 'Official 2025'}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-3 font-extrabold leading-tight text-[clamp(2.6rem,6vw,5.4rem)] tracking-[-0.015em] text-[color:var(--text-primary,#F2F5F9)]">
          {c.headline || 'Build bold AI'}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="mx-auto mt-4 max-w-2xl text-[color:var(--text-muted,#94A3B8)]">
          {c.subhead || '48 hours. Real problems. Future‑ready products.'}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={(c.primary_cta && c.primary_cta.href) || '#register'} aria-label={(c.primary_cta && c.primary_cta.label) || 'Register for AI GENESIS'} className="inline-flex items-center justify-center rounded-md bg-[color:var(--cta-bg,#FF6A3D)] px-5 py-3 font-medium text-[color:var(--cta-fg,#0B0F14)] shadow-[0_8px_30px_rgba(0,229,255,0.35)] hover:brightness-[1.05] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(0,229,255,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)]">
            {(c.primary_cta && c.primary_cta.label) || 'Get started'}
          </a>
          <a href={(c.secondary_cta && c.secondary_cta.href) || '#tracks'} aria-label={(c.secondary_cta && c.secondary_cta.label) || 'See available tracks'} className="inline-flex items-center justify-center rounded-md border border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)] px-5 py-3 font-medium text-[color:var(--text-primary,#F2F5F9)] hover:bg-[rgba(0,229,255,0.08)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(0,229,255,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)]">
            {(c.secondary_cta && c.secondary_cta.label) || 'See tracks'}
          </a>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-6 text-xs text-[color:var(--text-secondary,#C9D2E1)]">
          {c.trust_badge || 'Trusted by builders worldwide'}
        </motion.p>
      </div>

      {reduceMotion ? (
        <img src="/static_hero.svg" alt="Abstract AI themed background" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      ) : (
        <div className="absolute inset-0" aria-hidden>
          <Canvas camera={{ position: [0, 0, 8], fov: 36 }} dpr={[1, 2]}>
            <color attach="background" args={["#0A0B0E"]} />
            <ambientLight intensity={0.55} />
            <directionalLight intensity={1.15} position={[2.2, 3.1, 4.2]} color="#00E5FF" />
            <directionalLight intensity={0.9} position={[-3.2, -2.1, 2.0]} color="#FF4DD8" />
            <spotLight intensity={0.6} position={[0, 6, 6]} angle={0.7} penumbra={0.4} color="#B6FF4D" />
            <PointerGlow />
            <Suspense fallback={<Html center className="text-[color:var(--text-secondary,#C9D2E1)]">Loading…</Html>}>
              <Float rotationIntensity={0.02} floatIntensity={0.5}>
                <NeonCore />
                <NeuralWeb />
                <ParticleSwarm />
                <DataHalo />
              </Float>
              <Environment preset="city" />
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
