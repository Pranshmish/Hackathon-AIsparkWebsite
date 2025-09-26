import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Float, Environment, Instances, Instance, AdaptiveDpr, PerformanceMonitor, Preload } from '@react-three/drei'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { PrimaryButton, SecondaryButton } from './Buttons.jsx'

/* =========================
  Loading + Transitions
  ========================= */
function BloodVeinLoading({ progress }) {
  const [veins] = useMemo(() => {
    const veinPaths = []
    for (let i = 0; i < 5; i++) {
      const path = []
      const startX = 20 + i * 12
      const startY = 50
      for (let j = 0; j <= 20; j++) {
        const t = j / 20
        const x = startX + Math.sin(t * Math.PI * 2) * 8
        const y = startY + t * 30 + Math.sin(t * Math.PI * 4) * 5
        path.push({ x, y })
      }
      veinPaths.push({ id: i, path, delay: i * 0.2 })
    }
    return [veinPaths]
  }, [])

  return (
    <div className="relative w-96 h-40 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="veinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A0000" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B0000" stopOpacity="1" />
            <stop offset="100%" stopColor="#DC143C" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#DC143C" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FF4500" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {veins.map(vein => (
          <g key={vein.id}>
            <path
              d={`M ${vein.path.map(p => `${p.x} ${p.y}`).join(' L ')}`}
              stroke="url(#veinGradient)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.6"
            />
            <motion.path
              key={vein.id}
              d={`M ${vein.path.map(p => `${p.x} ${p.y}`).join(' L ')}`}
              stroke="url(#flowGradient)"
              strokeWidth="1.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 2.5, delay: vein.delay, ease: "easeInOut" }}
            />
          </g>
        ))}

        {[25, 50, 75].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy="60"
            fill="#DC143C"
            initial={{ r: 1.5, opacity: 0.6 }}
            animate={{ r: [1.5, 3, 1.5], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        ))}
      </svg>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  )
}

function StartupAnimations({ onComplete }) {
  const [phase, setPhase] = useState('blood-loading')
  const [loadingProgress, setLoadingProgress] = useState(0)
  const animationRef = useRef()
  const startTimeRef = useRef()
  const duration = 2000 // 2 seconds total loading time

  useEffect(() => {
    startTimeRef.current = Date.now()
    let completed = false

    const animate = () => {
      if (completed) return

      const elapsed = Date.now() - startTimeRef.current
      const progress = Math.min(100, (elapsed / duration) * 100)
      setLoadingProgress(Math.floor(progress))

      if (progress >= 100) {
        setLoadingProgress(100)
        completed = true
        animationRef.current = null
        // Hold at 100% for 800ms before completing
        setTimeout(() => {
          setPhase('complete')
        }, 800)
        return
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    const fallbackTimer = setTimeout(() => {
      if (!completed) {
        setLoadingProgress(100)
        setPhase('complete')
      }
    }, duration + 1000)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    if (phase === 'complete') {
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 1200)
    }
  }, [phase, onComplete])

  return (
    <AnimatePresence mode="wait">
      {phase === 'blood-loading' && (
        <BloodVeinLoadingScreen
          key="blood-loading"
          progress={loadingProgress}
        />
      )}
    </AnimatePresence>
  )
}

function BloodVeinLoadingScreen({ progress }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <div className="absolute inset-0" />
      <div className="relative text-center z-10">
        <motion.div
          className="text-6xl font-black text-red-400 mb-12 relative"
          initial={{ scale: 0.9, opacity: 0, y: -30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="relative">AI GENESIS</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 1 }} className="mb-8">
          <BloodVeinLoading progress={progress} />
        </motion.div>
        <motion.p className="text-red-300/90 text-xl font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          Genesis Awakening... {Math.floor(progress)}%
        </motion.p>
      </div>
    </motion.div>
  )
}

/* =========================
  3D Scene Essentials
  ========================= */
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
      const best = []
      for (let j = 0; j < nodes.length; j++) if (i !== j) {
        const d = a.distanceTo(nodes[j])
        best.push([d, j])
      }
      best.sort((x, y) => x[0] - y[0])
      for (let k = 0; k < 3; k++) pairs.push([i, best[k][1]])
    }
    const arr = new Float32Array(pairs.length * 2 * 3)
    for (let idx = 0; idx < pairs.length; idx++) {
      const p = pairs[idx]
      const v1 = nodes[p[0]], v2 = nodes[p[1]]
      arr.set([v1.x, v1.y, v1.z, v2.x, v2.y, v2.z], idx * 6)
    }
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
    const g = group.current
    if (!g) return
    const mouseRotation = pointer.x * 0.24
    g.rotation.y = t * 0.045 + mouseRotation
    g.rotation.x = Math.sin(t * 0.26) * 0.08 + pointer.y * 0.08
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
    const g = group.current
    if (!g) return
    const mouseAttraction = new THREE.Vector3(pointer.x * 1.6, pointer.y * 1.2, 0)
    let i = 0
    for (const m of g.children) {
      const d = seeds[i]
      const baseA = d.a + t * d.s * 0.7
      const attraction = mouseAttraction
      const x = Math.cos(baseA) * d.r + attraction.x * 0.1
      const z = Math.sin(baseA) * d.r + attraction.z * 0.1
      const y = d.h + Math.sin(t * 1.375 + i) * 0.22 + attraction.y * 0.1
      m.position.set(x, y, z)
      m.rotation.y = baseA
      const colorIndex = Math.floor((d.t + t * 0.0875) * colors.length) % colors.length
      const nextIndex = (colorIndex + 1) % colors.length
      const localT = ((d.t + t * 0.0875) * colors.length) % 1
      const col = colors[colorIndex].clone().lerp(colors[nextIndex], localT)
      m.material.color.copy(col)
      const distToMouse = m.position.distanceTo(mouseAttraction)
      const heartbeat = Math.sin(t * 3.25 + i) * 0.18
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

function DataHalo() {
  const ring = useRef()
  const glowShell = useRef()
  const { pointer } = useThree()

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime()
    const r = ring.current
    if (!r) return
    const mouseSpeed = (Math.abs(pointer.x) + Math.abs(pointer.y)) * 0.5
    r.rotation.z += dt * (0.65 + mouseSpeed * 0.6)
    const scale = 3.8 + Math.sin(t * 2.125) * 0.18
    r.scale.setScalar(scale)
    r.rotation.x = pointer.y * 0.16
    r.rotation.y = pointer.x * 0.12

    const gs = glowShell.current
    if (gs) {
      const breathe = 1.0 + Math.sin(t * 2.5) * 0.04
      gs.scale.setScalar(scale * breathe)
      const aura = 0.12 + (Math.sin(t * 3.25) + 1) * 0.05
      gs.material.opacity = aura
    }
  })

  return (
    <group>
      <mesh ref={ring} scale={3.8}>
        <torusGeometry args={[0.95, 0.01, 24, 380]} />
        <meshStandardMaterial color={'#7E0000'} roughness={0.88} metalness={0.04} emissive={'#990E0E'} emissiveIntensity={0.42} />
      </mesh>
      <mesh ref={glowShell} scale={3.8}>
        <torusGeometry args={[0.95, 0.022, 24, 380]} />
        <meshBasicMaterial color={'#E51E1E'} transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

function MouseTrail() {
  const trail = useRef()
  const { pointer } = useThree()
  const positions = useRef(new Array(18).fill(0).map(() => new THREE.Vector3()))
  useFrame((state) => {
    const l = trail.current
    if (!l) return
    const t = state.clock.getElapsedTime()
    const mousePos = new THREE.Vector3(pointer.x * 2.6, pointer.y * 2.0, 2)
    positions.current.unshift(mousePos.clone())
    positions.current.pop()
    const points = positions.current.map((pos, i) => {
      const fade = 1 - (i / positions.current.length)
      return pos.clone().multiplyScalar(fade)
    })
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    if (l.geometry) l.geometry.dispose()
    l.geometry = geometry
    const opacity = 0.55 + Math.sin(t * 4.25) * 0.16
    l.material.opacity = opacity
  })
  return (
    <line ref={trail}>
      <bufferGeometry />
      <lineBasicMaterial color={'#CC0000'} transparent opacity={0.55} linewidth={2} />
    </line>
  )
}

function BloodDrips() {
  const group = useRef()
  const drips = useMemo(() => new Array(6).fill(0).map((_, i) => ({
    x: (Math.random() - 0.5) * 6.5,
    y: 3.6 + Math.random() * 1.6,
    z: (Math.random() - 0.5) * 5.2,
    speed: (0.45 + Math.random() * 0.26) * 1.25,
    size: 0.018 + Math.random() * 0.01
  })), [])
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const g = group.current
    if (!g) return
    let i = 0
    for (const drip of g.children) {
      const d = drips[i]
      if (!d) break
      drip.position.y = d.y - (t * d.speed) % 7
      drip.scale.setScalar(d.size * (1 + Math.sin(t * 2.375 + i) * 0.28))
      i++
    }
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

/* =========================
  Hero section
  ========================= */
export default function Hero({ content, onStartupComplete, startupDone }) {
  const reduceMotion = useReducedMotion()
  const [showStartup, setShowStartup] = useState(() => (reduceMotion ? false : !startupDone))

  useEffect(() => {
    if (reduceMotion) setShowStartup(false)
  }, [reduceMotion])

  useEffect(() => {
    if (startupDone) setShowStartup(false)
  }, [startupDone])

  if (showStartup && !reduceMotion) {
    return <StartupAnimations onComplete={() => {
      setShowStartup(false)
      if (onStartupComplete) onStartupComplete()
    }} />
  }

  return (
    <section id="hero" className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
      {/* Background */}
      <div aria-hidden={true} className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#2A0000,transparent_22%),radial-gradient(circle_at_70%_60%,#0E0000,transparent_36%),radial-gradient(circle_at_50%_50%,#140000,transparent_56%),#050000]" />
      <div aria-hidden={true} className="pointer-events-none absolute inset-0 grain-overlay opacity-15" />

      {/* Content */}
      <EnhancedContentAnimations content={content} />

      {/* 3D Scene */}
      {reduceMotion ? (
        <img src="/static_hero.svg" alt="Abstract AI themed background" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      ) : (
        <motion.div className="absolute inset-0" aria-hidden={true} initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <Canvas camera={{ position: [0, 0, 8.0], fov: 32 }} dpr={[1.25, 3]} gl={{ antialias: true, powerPreference: 'high-performance' }} onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.outputColorSpace = THREE.SRGBColorSpace; }}>
            <color attach="background" args={["#050000"]} />
            <ambientLight intensity={0.32} color="#1A0000" />
            <directionalLight intensity={1.05} position={[2.2, 3.1, 4.2]} color="#8A0000" />
            <directionalLight intensity={0.7} position={[-3.2, -2.1, 2.0]} color="#4F0000" />
            <spotLight intensity={0.15} position={[0, 6, 6]} angle={0.78} penumbra={0.5} color="#CC1212" />
            <PointerGlow />
            <Suspense fallback={<Html className="text-red-200/80"><div className="flex items-center justify-center">Loading…</div></Html>}>
              <Float rotationIntensity={0.03} floatIntensity={0.55} speed={0.8}>
                <group scale={1.1}>
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
            <AdaptiveDpr pixelated={false} />
            <PerformanceMonitor />
            <Preload all />
          </Canvas>
        </motion.div>
      )}
    </section>
  )
}

/* =========================
  Content animations
  ========================= */
function EnhancedContentAnimations({ content }) {
  const c = content || {}

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-900/10 px-3 py-1 text-3xl md:text-4xl font-black tracking-tight text-red-200 drop-shadow-sm relative"
          whileHover={{ scale: 1.03, color: "#ff6b6b" }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 1.0 }}
            className="absolute bottom-0 left-0 h-0.5 bg-red-400/50"
          />
          {c.eyebrow || 'AI GENESIS HACKATHON'}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.h1
          className="mt-4 font-black leading-tight text-[clamp(2.6rem,5.8vw,5rem)] tracking-tight bg-gradient-to-r from-red-200 via-red-400 to-red-200 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(239,68,68,0.25)] relative"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.25 }}
        >
          {c.headline || 'Innovate. Build. Win.'}
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
      >
        <motion.p
          className="mx-auto mt-5 max-w-2xl text-red-100/80 leading-relaxed drop-shadow-sm"
          whileHover={{ color: "#fecaca" }}
          transition={{ duration: 0.25 }}
        >
          {c.subhead || 'Join the ultimate AI hackathon where visionaries, builders, and dreamers come together to shape the future of artificial intelligence.'}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
      >
        <motion.p
          className="mt-6 text-xs text-red-200/60 drop-shadow-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {c.trust_badge || 'October 15-17, 2024 | Register Now'}
        </motion.p>
      </motion.div>
    </div>
  )
}
