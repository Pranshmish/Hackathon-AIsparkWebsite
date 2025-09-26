import { useEffect, useState, useRef, useMemo } from 'react'

// Floating code snippets for motion graphics
function FloatingCodeSnippets() {
  const [snippets, setSnippets] = useState([])

  const codeSnippets = [
    'import AI from "future"',
    'const genius = await hackathon()',
    'if (innovation) { build() }',
    'neural.network.train()',
    'const result = AI.generate()',
    'function createMagic() {}',
    'let dreams = reality',
    'async function transform()',
    'class Innovation extends AI',
    'export default Hackathon'
  ]

  useEffect(() => {
    const generateSnippets = () => {
      return Array.from({ length: 15 }, (_, i) => ({
        id: i,
        text: codeSnippets[i % codeSnippets.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 2.5,
        duration: 25 + Math.random() * 15,
        size: 0.6 + Math.random() * 0.5
      }))
    }

    setSnippets(generateSnippets())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snippets.map(snippet => (
        <div
          key={snippet.id}
          className="absolute font-mono text-red-400/15 select-none whitespace-nowrap"
          style={{
            left: `${snippet.x}%`,
            top: `${snippet.y}%`,
            fontSize: `${snippet.size}rem`,
            animation: `float ${snippet.duration}s ease-in-out infinite`,
            animationDelay: `${snippet.delay}s`
          }}
        >
          {snippet.text}
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.15; 
          }
          50% { 
            transform: translateY(-50px) translateX(30px) rotate(3deg); 
            opacity: 0.3; 
          }
        }
      `}</style>
    </div>
  )
}

// Binary rain effect
function BinaryRain() {
  const [drops, setDrops] = useState([])

  useEffect(() => {
    const columns = Math.floor(window.innerWidth / 25)
    const newDrops = Array.from({ length: columns }, (_, i) => ({
      id: i,
      x: i * 25,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 6,
      binary: Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0')
    }))
    setDrops(newDrops)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute font-mono text-red-500/30 text-xs leading-tight"
          style={{
            left: drop.x,
            animation: `binaryDrop ${drop.duration}s linear infinite`,
            animationDelay: `${drop.delay}s`
          }}
        >
          {drop.binary.map((bit, idx) => (
            <div
              key={idx}
              className="animate-pulse"
              style={{
                opacity: Math.max(0.1, 1 - idx * 0.08),
                animationDelay: `${idx * 0.1}s`
              }}
            >
              {bit}
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`
        @keyframes binaryDrop {
          0% { transform: translateY(-120vh); opacity: 0; }
          5% { opacity: 0.3; }
          95% { opacity: 0.3; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// Animated Circuit Lines
function CircuitLines() {
  const [lines, setLines] = useState([])

  useEffect(() => {
    const generateLines = () => {
      return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        endX: Math.random() * 100,
        endY: Math.random() * 100,
        delay: i * 3,
        duration: 8 + Math.random() * 4
      }))
    }

    setLines(generateLines())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full opacity-20">
        {lines.map(line => (
          <g key={line.id}>
            <line
              x1={`${line.startX}%`}
              y1={`${line.startY}%`}
              x2={`${line.endX}%`}
              y2={`${line.endY}%`}
              stroke="url(#circuitGradient)"
              strokeWidth="1"
              className="animate-pulse"
              style={{
                animation: `circuitPulse ${line.duration}s ease-in-out infinite`,
                animationDelay: `${line.delay}s`
              }}
            />
            <circle
              cx={`${line.startX}%`}
              cy={`${line.startY}%`}
              r="2"
              fill="#dc2626"
              className="opacity-60 animate-pulse"
              style={{ animationDelay: `${line.delay}s` }}
            />
            <circle
              cx={`${line.endX}%`}
              cy={`${line.endY}%`}
              r="2"
              fill="#dc2626"
              className="opacity-60 animate-pulse"
              style={{ animationDelay: `${line.delay + 1}s` }}
            />
          </g>
        ))}
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0" />
            <stop offset="50%" stopColor="#dc2626" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <style jsx>{`
        @keyframes circuitPulse {
          0%, 100% { stroke-opacity: 0.2; }
          50% { stroke-opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}

// Scanning Lines Effect
function ScanningLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
          style={{
            animation: `scanLine ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 2.5}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes scanLine {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// Glowing Orbs
function GlowingOrbs() {
  const [orbs, setOrbs] = useState([])

  useEffect(() => {
    const generateOrbs = () => {
      return Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 4,
        duration: 12 + Math.random() * 8,
        size: 40 + Math.random() * 60
      }))
    }

    setOrbs(generateOrbs())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map(orb => (
        <div
          key={orb.id}
          className="absolute rounded-full bg-red-500/10 blur-2xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            animation: `orbFloat ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes orbFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.1; 
          }
          50% { 
            transform: translateY(-60px) translateX(40px) scale(1.2); 
            opacity: 0.3; 
          }
        }
      `}</style>
    </div>
  )
}

// Digital Hexagon Grid
function HexagonGrid() {
  const [hexagons, setHexagons] = useState([])

  useEffect(() => {
    const generateHexagons = () => {
      return Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: (i % 4) * 25 + Math.random() * 10,
        y: Math.floor(i / 4) * 30 + Math.random() * 10,
        delay: i * 1.5,
        duration: 6 + Math.random() * 4
      }))
    }

    setHexagons(generateHexagons())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
      <svg className="w-full h-full">
        {hexagons.map(hex => (
          <polygon
            key={hex.id}
            points="15,5 25,10 25,20 15,25 5,20 5,10"
            fill="none"
            stroke="#dc2626"
            strokeWidth="0.5"
            transform={`translate(${hex.x}%, ${hex.y}%)`}
            className="animate-pulse"
            style={{
              animation: `hexPulse ${hex.duration}s ease-in-out infinite`,
              animationDelay: `${hex.delay}s`
            }}
          />
        ))}
      </svg>
      <style jsx>{`
        @keyframes hexPulse {
          0%, 100% { stroke-opacity: 0.2; transform: scale(1); }
          50% { stroke-opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}

// Data Stream Lines
function DataStreams() {
  const [streams, setStreams] = useState([])

  useEffect(() => {
    const generateStreams = () => {
      return Array.from({ length: 5 }, (_, i) => ({
        id: i,
        side: i % 2 === 0 ? 'left' : 'right',
        delay: i * 2,
        duration: 8 + Math.random() * 4
      }))
    }

    setStreams(generateStreams())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {streams.map(stream => (
        <div
          key={stream.id}
          className={`absolute w-0.5 h-16 bg-gradient-to-b from-red-500/60 to-transparent ${stream.side === 'left' ? 'left-0' : 'right-0'
            }`}
          style={{
            animation: `dataStream ${stream.duration}s ease-in-out infinite`,
            animationDelay: `${stream.delay}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes dataStream {
          0% { top: -64px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// Optimized Particle System
function ParticleSystem() {
  const canvasRef = useRef(null)
  const animationRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let particles = []

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    const createParticles = () => {
      particles = []
      for (let i = 0; i < 45; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.3,
          pulseSpeed: Math.random() * 0.03 + 0.01
        })
      }
    }

    setupCanvas()
    createParticles()

    let time = 0
    const animate = () => {
      time += 0.016
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1

        const pulse = Math.sin(time * particle.pulseSpeed * 100) * 0.4 + 0.6

        ctx.globalAlpha = particle.opacity * pulse * 0.7
        ctx.fillStyle = '#dc2626'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.globalAlpha = (1 - distance / 100) * 0.2 * pulse
            ctx.strokeStyle = '#dc2626'
            ctx.lineWidth = 0.4
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setupCanvas()
      createParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  )
}

// Mouse glow effect
function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const glowRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        const rect = glowRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    const section = glowRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
      section.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        section.removeEventListener('mousemove', handleMouseMove)
        section.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={glowRef} className="absolute inset-0 pointer-events-none">
      {isHovering && (
        <div
          className="absolute pointer-events-none rounded-full transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, rgba(220, 38, 38, 0.1) 40%, transparent 70%)',
            filter: 'blur(20px)',
            opacity: 0.8
          }}
        />
      )}
    </div>
  )
}

// Enhanced Glitch Text
function GlitchText({ children, className = "" }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 120)
    }, 4000 + Math.random() * 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <span className="absolute inset-0 text-red-400 opacity-70 transform translate-x-1">
            {children}
          </span>
          <span className="absolute inset-0 text-red-300 opacity-50 transform -translate-x-1">
            {children}
          </span>
        </>
      )}
    </span>
  )
}

// Interactive Logo Card
function InteractiveLogo({ logo, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), index * 100)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`group cursor-pointer transition-all duration-700 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
        } ${isHovered
          ? 'scale-105 -translate-y-2'
          : 'scale-100 translate-y-0'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: isLoaded ? '0ms' : `${index * 80}ms`
      }}
    >
      <div className={`relative px-6 py-4 rounded-xl border backdrop-blur-sm transition-all duration-500 ${isHovered
          ? 'bg-red-950/20 border-red-500/40 shadow-2xl shadow-red-500/25'
          : 'bg-black/60 border-gray-700/20 shadow-xl shadow-black/50'
        }`}>

        {isHovered && (
          <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 via-red-500/30 to-red-600/20 rounded-2xl blur-xl" />
        )}

        <div className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-125' : 'border-red-500/40'
          }`} />
        <div className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 rounded-tr-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-125' : 'border-red-500/40'
          }`} />
        <div className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 rounded-bl-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-125' : 'border-red-500/40'
          }`} />
        <div className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 rounded-br-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-125' : 'border-red-500/40'
          }`} />

        <div className="relative z-10 flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${isHovered
              ? 'bg-red-600/30 scale-110 shadow-lg shadow-red-500/20'
              : 'bg-gray-800/50'
            }`}>
            <div className={`w-6 h-6 rounded transition-all duration-500 ${isHovered ? 'bg-red-400 shadow-lg shadow-red-400/50' : 'bg-gray-600'
              }`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className={`text-sm font-semibold transition-all duration-300 ${isHovered ? 'text-red-200 scale-105' : 'text-gray-300'
              }`}>
              {logo.name || 'Partner'}
            </div>
            <div className={`text-xs transition-all duration-300 ${isHovered ? 'text-red-400/80' : 'text-gray-500'
              }`}>
              {logo.category || 'Technology'}
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${isHovered
                    ? 'bg-red-400 scale-150 animate-pulse'
                    : 'bg-red-600/50'
                  }`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-3 left-1/4 w-1 h-1 bg-red-400 rounded-full animate-ping" />
            <div className="absolute bottom-3 right-1/4 w-0.5 h-0.5 bg-red-300 rounded-full animate-pulse" />
            <div className="absolute top-1/2 right-4 w-0.5 h-0.5 bg-red-500 rounded-full animate-bounce" />
          </div>
        )}
      </div>
    </div>
  )
}

// Stats Counter
function AnimatedStat({ number, label, delay = 0 }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      const target = parseInt(number.replace(/[^0-9]/g, ''))
      const duration = 2500
      const steps = 80
      const increment = target / steps
      let current = 0

      const counter = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(counter)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(counter)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, number, delay])

  return (
    <div ref={ref} className="text-center group cursor-default">
      <div className="text-4xl font-bold text-red-400 group-hover:text-red-300 transition-colors duration-500 mb-2">
        {count > 0 ? `${count}${number.replace(/[0-9]/g, '')}` : number}
      </div>
      <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {label}
      </div>
      <div className="h-0.5 w-0 bg-red-400 group-hover:w-full transition-all duration-700 mx-auto mt-3" />
    </div>
  )
}

// Main Component
export default function LogoStrip({
  title = 'POWERED BY INNOVATION LEADERS',
  logos = [
    { name: 'Google AI', category: 'AI Platform' },
    { name: 'OpenAI', category: 'AI Research' },
    { name: 'Microsoft', category: 'Cloud Services' },
    { name: 'AWS', category: 'Infrastructure' },
    { name: 'NVIDIA', category: 'GPU Computing' },
    { name: 'Anthropic', category: 'AI Safety' }
  ]
}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { number: '50K+', label: 'Developers' },
    { number: '100+', label: 'Countries' },
    { number: '$2M+', label: 'Prize Pool' }
  ]

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative bg-black overflow-hidden transition-all duration-1000 ease-out"
      style={{
        borderRadius: isVisible ? '0' : '50px',
        margin: isVisible ? '0' : '20px',
        transform: isVisible ? 'scale(1)' : 'scale(0.98)'
      }}
    >
      {/* ALL BACKGROUND ANIMATIONS - LAYERED */}
      <FloatingCodeSnippets />
      <BinaryRain />
      <CircuitLines />
      <ScanningLines />
      <GlowingOrbs />
      <HexagonGrid />
      <DataStreams />
      <ParticleSystem />
      <MouseGlow />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-4">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Soft Edge Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/4 via-transparent to-red-900/4" />
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/4 via-transparent to-red-900/4" />

      {/* Content Container */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 py-24 transition-all duration-1200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}>

        {/* Title Section - Centered */}
        <div className="text-center mb-20">
          <GlitchText className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </GlitchText>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Backed by industry giants and innovation leaders who are shaping the future of artificial intelligence
          </p>
        </div>

        {/* Logos Grid - Properly centered with increased gaps */}
        <div className="flex justify-center mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl w-full">
            {logos.map((logo, index) => (
              <InteractiveLogo key={index} logo={logo} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Section - Centered */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-20 mb-20">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              number={stat.number}
              label={stat.label}
              delay={index * 300}
            />
          ))}
        </div>

        {/* Bottom Decoration - Centered */}
        <div className="flex justify-center space-x-3">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-red-500/30 rounded-full animate-pulse hover:bg-red-400/60 hover:scale-125 transition-all duration-500 cursor-pointer"
              style={{
                width: '4px',
                height: `${20 + Math.sin(i) * 8}px`,
                animationDelay: `${i * 200}ms`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.15; 
          }
          50% { 
            transform: translateY(-50px) translateX(30px) rotate(3deg); 
            opacity: 0.3; 
          }
        }
        @keyframes binaryDrop {
          0% { transform: translateY(-120vh); opacity: 0; }
          5% { opacity: 0.3; }
          95% { opacity: 0.3; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
        @keyframes circuitPulse {
          0%, 100% { stroke-opacity: 0.2; }
          50% { stroke-opacity: 0.8; }
        }
        @keyframes scanLine {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes orbFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.1; 
          }
          50% { 
            transform: translateY(-60px) translateX(40px) scale(1.2); 
            opacity: 0.3; 
          }
        }
        @keyframes hexPulse {
          0%, 100% { stroke-opacity: 0.2; transform: scale(1); }
          50% { stroke-opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes dataStream {
          0% { top: -64px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  )
}
