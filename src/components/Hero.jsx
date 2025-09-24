import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Float, Environment, Instances, Instance } from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { PrimaryButton, SecondaryButton } from './Buttons.jsx'

// Camera tilt
function ParallaxCameraTilt({ maxX = 0.12, maxY = 0.12 }) {
  const { camera } = useThree()
  const pointer = useThree((s) => s.pointer)
  const targetRotation = useRef({ x: 0, y: 0 })
  useFrame(() => {
    targetRotation.current.x = pointer.y * maxY
    targetRotation.current.y = -pointer.x * maxX
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.current.x, 0.07)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.current.y, 0.07)
    camera.updateProjectionMatrix()
  })
  return null
}

// Pointer glow lights (subtle)
function PointerGlow() {
  const light = useRef()
  const { pointer } = useThree()
  const intensity = useRef(0.85)
  useFrame((state) => {
    if (!light.current) return
    const t = state.clock.getElapsedTime()
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, pointer.x * 3.2, 0.14)
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, pointer.y * 2.4, 0.14)
    intensity.current = 0.75 + Math.sin(t * 2.8) * 0.25
    light.current.intensity = intensity.current
  })
  return (
    <>
      <pointLight ref={light} color={'#AA0000'} intensity={0.85} distance={7} />
      <pointLight position={[0, 0, -2]} color={'#520000'} intensity={0.55} distance={5.5} />
      <pointLight position={[2, 1, 3]} color={'#3A0000'} intensity={0.45} distance={4.5} />
    </>
  )
}

// Core meshes (smaller, darker, less shiny)
function NeonCore() {
  const mesh = useRef()
  const innerMesh = useRef()
  const { pointer } = useThree()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!mesh.current || !innerMesh.current) return
    const mouseInfluence = pointer.x * 0.4 + pointer.y * 0.24
    mesh.current.rotation.y = t * 0.14 + mouseInfluence
    mesh.current.rotation.x = Math.sin(t * 0.7) * 0.09
    innerMesh.current.rotation.y = -t * 0.32
    innerMesh.current.rotation.z = t * 0.18
    const scale = 0.85 + Math.sin(t * 2.2) * 0.06
    mesh.current.scale.setScalar(scale)
  })
  return (
    <group>
      <mesh ref={mesh} scale={0.82}>
        <icosahedronGeometry args={[0.54, 2]} />
        <meshStandardMaterial
          color={'#0E0000'}
          metalness={0.08}
          roughness={0.82}
          emissive={'#1A0000'}
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh ref={innerMesh} scale={0.5}>
        <octahedronGeometry args={[0.34, 1]} />
        <meshBasicMaterial color={'#990000'} transparent opacity={0.3} wireframe />
      </mesh>
    </group>
  )
}

// Fibonacci sphere utility
function useFibonacciSphere(count = 220, radius = 2.2) {
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

// Neural web (darker, thinner)
function NeuralWeb({ count = 200 }) {
  const group = useRef()
  const { pointer } = useThree()
  const nodes = useFibonacciSphere(count, 2.2)
  const positions = useMemo(() => nodes.map((v) => v.toArray()), [nodes])
  const colors = useMemo(() => {
    const bloodColors = [
      new THREE.Color('#4A0000'),
      new THREE.Color('#7A0000'),
      new THREE.Color('#A80000'),
      new THREE.Color('#D12A2A'),
    ]
    return positions.map((_, i) => {
      const t = i / Math.max(1, positions.length - 1)
      const colorIndex = Math.floor(t * (bloodColors.length - 1))
      const localT = (t * (bloodColors.length - 1)) % 1
      const c = bloodColors[colorIndex].clone().lerp(bloodColors[colorIndex + 1] || bloodColors[colorIndex], localT)
      return `#${c.getHexString()}`
    })
  }, [positions])
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
      for (let k = 0; k < 3; k++) pairs.push([i, best[k][1]])
    }
    const arr = new Float32Array(pairs.length * 2 * 3)
    pairs.forEach((p, idx) => {
      const v1 = nodes[p[0]], v2 = nodes[p[1]]
      arr.set([v1.x, v1.y, v1.z, v2.x, v2.y, v2.z], idx * 6)
    })
    return arr
  }, [nodes])
  const lineGeom = useMemo(() => new THREE.BufferGeometry(), [])
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#7A0000',
    transparent: true,
    opacity: 0.28
  }), [])
  useMemo(() => {
    lineGeom.setAttribute('position', new THREE.BufferAttribute(edges, 3))
    return () => lineGeom.dispose()
  }, [edges, lineGeom])
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return
    const mouseRotation = pointer.x * 0.24
    group.current.rotation.y = t * 0.045 + mouseRotation
    group.current.rotation.x = Math.sin(t * 0.26) * 0.08 + pointer.y * 0.08
    lineMat.opacity = 0.26 + (Math.sin(t * 1.8) + 1) * 0.12
    const intensity = 0.38 + (Math.sin(t * 1.3) + 1) * 0.18
    lineMat.color.setRGB(intensity * 0.6, 0, 0)
  })
  return (
    <group ref={group} scale={0.88}>
      <lineSegments geometry={lineGeom} material={lineMat} />
      <Instances limit={positions.length} range={positions.length}>
        <icosahedronGeometry args={[0.026, 0]} />
        <meshBasicMaterial vertexColors />
        {positions.map((p, i) => (
          <Instance key={i} position={p} color={colors[i]} />
        ))}
      </Instances>
    </group>
  )
}

// Particle swarm (smaller radius, darker)
function ParticleSwarm({ count = 420, radius = 3.2 }) {
  const group = useRef()
  const { pointer } = useThree()
  const seeds = useMemo(() => new Array(count).fill(0).map((_, i) => ({
    a: (i / count) * Math.PI * 2,
    r: radius * (0.55 + Math.random() * 0.45),
    h: (Math.random() - 0.5) * 1.4,
    s: 0.1 + Math.random() * 0.7,
    t: i / Math.max(1, count - 1),
    size: 0.012 + Math.random() * 0.02
  })), [count, radius])
  const colors = useMemo(() => [
    new THREE.Color('#370000'),
    new THREE.Color('#5E0000'),
    new THREE.Color('#880000'),
    new THREE.Color('#BF1111')
  ], [])
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return
    const mouseAttraction = new THREE.Vector3(pointer.x * 1.6, pointer.y * 1.2, 0)
    let i = 0
    for (const m of group.current.children) {
      const d = seeds[i]
      const baseA = d.a + t * d.s * 0.7
      const attraction = mouseAttraction.clone().multiplyScalar(0.1)
      const x = Math.cos(baseA) * d.r + attraction.x
      const z = Math.sin(baseA) * d.r + attraction.z
      const y = d.h + Math.sin(t * 1.1 + i) * 0.22 + attraction.y
      m.position.set(x, y, z)
      m.rotation.y = baseA
      const colorIndex = Math.floor((d.t + t * 0.07) * colors.length) % colors.length
      const nextIndex = (colorIndex + 1) % colors.length
      const localT = ((d.t + t * 0.07) * colors.length) % 1
      const col = colors[colorIndex].clone().lerp(colors[nextIndex], localT)
      m.material.color.copy(col)
      const distToMouse = m.position.distanceTo(mouseAttraction)
      const heartbeat = Math.sin(t * 2.6 + i) * 0.18
      const scale = d.size * (1 + heartbeat) * Math.max(0.6, 2.1 - distToMouse)
      m.scale.setScalar(scale)
      i++
    }
  })
  return (
    <group ref={group} scale={0.92}>
      {seeds.map((d, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial opacity={0.74} transparent />
        </mesh>
      ))}
    </group>
  )
}

// Single, less shiny ring with subtle glow (smaller)
function DataHalo() {
  const ring = useRef()
  const glowShell = useRef()
  const { pointer } = useThree()

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime()
    if (!ring.current) return
    const mouseSpeed = (Math.abs(pointer.x) + Math.abs(pointer.y)) * 0.5
    ring.current.rotation.z += dt * (0.52 + mouseSpeed * 0.48)

    // Smaller breathing scale
    const scale = 3.8 + Math.sin(t * 1.7) * 0.18
    ring.current.scale.setScalar(scale)

    // Subtle tilt parallax
    const tiltX = pointer.y * 0.16
    const tiltY = pointer.x * 0.12
    ring.current.rotation.x = tiltX
    ring.current.rotation.y = tiltY

    if (glowShell.current) {
      const breathe = 1.0 + Math.sin(t * 2.0) * 0.04
      glowShell.current.scale.setScalar(scale * breathe)
      const aura = 0.12 + (Math.sin(t * 2.6) + 1) * 0.05
      glowShell.current.material.opacity = aura
    }
  })

  return (
    <group>
      <mesh ref={ring} scale={3.8}>
        <torusGeometry args={[0.95, 0.01, 24, 380]} />
        <meshStandardMaterial
          color={'#7E0000'}
          roughness={0.88}
          metalness={0.04}
          emissive={'#990E0E'}
          emissiveIntensity={0.42}
        />
      </mesh>
      <mesh ref={glowShell} scale={3.8}>
        <torusGeometry args={[0.95, 0.022, 24, 380]} />
        <meshBasicMaterial
          color={'#E51E1E'}
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

// Mouse trail (darker)
function MouseTrail() {
  const trail = useRef()
  const { pointer } = useThree()
  const positions = useRef(new Array(18).fill(0).map(() => new THREE.Vector3()))
  useFrame((state) => {
    if (!trail.current) return
    const t = state.clock.getElapsedTime()
    const mousePos = new THREE.Vector3(pointer.x * 2.6, pointer.y * 2.0, 2)
    positions.current.unshift(mousePos.clone())
    positions.current.pop()
    const points = positions.current.map((pos, i) => {
      const fade = 1 - (i / positions.current.length)
      return pos.clone().multiplyScalar(fade)
    })
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    if (trail.current.geometry) trail.current.geometry.dispose()
    trail.current.geometry = geometry
    const opacity = 0.55 + Math.sin(t * 3.4) * 0.16
    trail.current.material.opacity = opacity
  })
  return (
    <line ref={trail}>
      <bufferGeometry />
      <lineBasicMaterial color={'#CC0000'} transparent opacity={0.55} linewidth={2} />
    </line>
  )
}

// Blood drips (slightly dimmer)
function BloodDrips() {
  const group = useRef()
  const drips = useMemo(() => new Array(6).fill(0).map((_, i) => ({
    x: (Math.random() - 0.5) * 6.5,
    y: 3.6 + Math.random() * 1.6,
    z: (Math.random() - 0.5) * 5.2,
    speed: 0.45 + Math.random() * 0.26,
    size: 0.018 + Math.random() * 0.01
  })), [])
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return
    group.current.children.forEach((drip, i) => {
      const d = drips[i]
      drip.position.y = d.y - (t * d.speed) % 7
      drip.scale.setScalar(d.size * (1 + Math.sin(t * 1.9 + i) * 0.28))
    })
  })
  return (
    <group ref={group} scale={0.95}>
      {drips.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <sphereGeometry args={[1, 6, 8]} />
          <meshBasicMaterial color={'#7B0000'} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

export default function Hero({ content }) {
  const reduceMotion = useReducedMotion()
  const c = content || {}
  return (
    <section id="hero" className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
      {/* Background (darker) */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#2A0000,transparent_22%),radial-gradient(circle_at_70%_60%,#0E0000,transparent_36%),radial-gradient(circle_at_50%_50%,#140000,transparent_56%),#050000]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grain-overlay opacity-35" />

      {/* Soft shapes (dimmer) */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-3/4 w-56 h-56 bg-red-700/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, type: "spring", stiffness: 100 }}
          className="text-sm tracking-wide text-red-200/70 drop-shadow-sm"
        >
          {c.eyebrow || 'Official 2025'}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 80 }}
          className="mt-3 font-extrabold leading-tight text-[clamp(2.4rem,5.4vw,4.8rem)] tracking-[-0.02em] text-red-50 drop-shadow-lg"
        >
          {c.headline || 'Build bold AI'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 100 }}
          className="mx-auto mt-4 max-w-2xl text-red-100/70 drop-shadow-sm"
        >
          {c.subhead || '48 hours. Real problems. Future‑ready products.'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, type: "spring", stiffness: 80 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <PrimaryButton
            href={(c.primary_cta && c.primary_cta.href) || '#register'}
            aria-label={(c.primary_cta && c.primary_cta.label) || 'Register for AI GENESIS'}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
          >
            {(c.primary_cta && c.primary_cta.label) || 'Get started'}
          </PrimaryButton>
          <SecondaryButton
            href={(c.secondary_cta && c.secondary_cta.href) || '#tracks'}
            aria-label={(c.secondary_cta && c.secondary_cta.label) || 'See available tracks'}
            className="transform transition-all duration-300 hover:scale-105"
          >
            {(c.secondary_cta && c.secondary_cta.label) || 'See tracks'}
          </SecondaryButton>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-6 text-xs text-red-200/60 drop-shadow-sm"
        >
          {c.trust_badge || 'Trusted by builders worldwide'}
        </motion.p>
      </div>

      {/* Scene (30% larger via group scale; camera brought slightly closer for balance) */}
      {reduceMotion ? (
        <img src="/static_hero.svg" alt="Abstract AI themed background" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      ) : (
        <div className="absolute inset-0" aria-hidden>
          <Canvas camera={{ position: [0, 0, 8.0], fov: 32 }} dpr={[1, 2]}>
            <color attach="background" args={["#050000"]} />
            {/* Darker lighting, reduced shine */}
            <ambientLight intensity={0.28} color="#1A0000" />
            <directionalLight intensity={1.0} position={[2.2, 3.1, 4.2]} color="#8A0000" />
            <directionalLight intensity={0.65} position={[-3.2, -2.1, 2.0]} color="#4F0000" />
            <spotLight intensity={0.75} position={[0, 6, 6]} angle={0.78} penumbra={0.5} color="#CC1212" />
            <PointerGlow />
            <Suspense fallback={<Html center className="text-red-200/80">Loading…</Html>}>
              <Float rotationIntensity={0.025} floatIntensity={0.5} speed={0.75}>
                <group scale={1.105}>
                  <NeonCore />
                  <NeuralWeb />
                  <ParticleSwarm />
                  <DataHalo />
                </group>
              </Float>
              <MouseTrail />
              <BloodDrips />
              <Environment preset="night" />
            </Suspense>
            <ParallaxCameraTilt />
          </Canvas>
        </div>
      )}

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-6 z-10 text-center"
      >
        <span className="text-xs text-red-200/60 drop-shadow-sm">Scroll to explore</span>
        <div className="mt-2 w-1 h-8 bg-gradient-to-b from-red-500 to-transparent mx-auto rounded-full opacity-70" />
      </motion.div>
    </section>
  )
}
