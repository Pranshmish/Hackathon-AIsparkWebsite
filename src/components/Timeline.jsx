import { useEffect, useState } from 'react'

// Floating particles for ambient effect
function FloatingParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 1.2,
        duration: 8 + Math.random() * 4
      }))
    }

    setParticles(generateParticles())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-red-400 rounded-full opacity-15"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-15px) scale(1.1); opacity: 0.25; }
        }
      `}</style>
    </div>
  )
}

// Enhanced glitch text effect with hover
function GlitchText({ children, className = "" }) {
  const [glitch, setGlitch] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 120)
    }, 5000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`relative ${className} transition-all duration-300 cursor-default`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {(glitch || isHovered) && (
        <>
          <span
            className={`absolute inset-0 text-red-400 transform transition-all duration-150 ${isHovered ? 'opacity-60 translate-x-1' : 'opacity-40 translate-x-0.5'
              }`}
          >
            {children}
          </span>
          <span
            className={`absolute inset-0 text-red-300 transform transition-all duration-150 ${isHovered ? 'opacity-40 -translate-x-1' : 'opacity-25 -translate-x-0.5'
              }`}
          >
            {children}
          </span>
        </>
      )}
    </span>
  )
}

// Timeline connector with enhanced pulse effect
function TimelineConnector({ isLast, isHovered }) {
  if (isLast) return null

  return (
    <div className="absolute left-3 top-10 w-0.5 h-6 bg-gradient-to-b from-red-500/40 to-red-500/20">
      <div
        className={`w-full h-full bg-gradient-to-b from-red-400/60 to-transparent transition-all duration-300 ${isHovered ? 'opacity-100 scale-x-150' : ''
          }`}
        style={{
          animation: isHovered ? 'fastPulse 0.5s ease-in-out infinite' : 'pulse 2s ease-in-out infinite'
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes fastPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Enhanced step number with hover animations
function StepNumber({ number, isActive = false, onHover }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover(false)
  }

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced glow background */}
      <div className={`absolute inset-0 bg-red-500/20 rounded-full blur-sm transition-all duration-300 ${isHovered ? 'scale-150 bg-red-400/30' : 'scale-110'
        }`} />

      {/* Pulse ring on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-full border-2 border-red-400/50"
          style={{
            animation: 'expandRing 0.8s ease-out infinite'
          }}
        />
      )}

      <span
        className={`relative inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 transform ${isActive
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-110'
            : isHovered
              ? 'bg-red-400 text-white shadow-lg shadow-red-400/40 scale-125'
              : 'bg-red-600/80 text-red-100 hover:bg-red-500/90'
          }`}
      >
        {number}

        {/* Inner glow */}
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-t from-red-300/20 to-transparent pointer-events-none" />

        {/* Rotating border on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full border border-red-200/30"
            style={{
              animation: 'rotate 2s linear infinite'
            }}
          />
        )}
      </span>

      <style>{`
        @keyframes expandRing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// Enhanced timeline card with multiple hover effects
function TimelineCard({ item, index, isActive, onCardHover }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseEnter = () => {
    setIsHovered(true)
    onCardHover(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onCardHover(false)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      className={`group relative bg-gradient-to-r from-gray-900/60 to-gray-950/40 border rounded-lg p-4 backdrop-blur-sm transition-all duration-500 transform cursor-pointer ${isHovered
          ? 'border-red-500/40 shadow-lg shadow-red-500/20 scale-105 -translate-y-1'
          : 'border-gray-700/40 hover:border-red-500/20'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse follower spotlight */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full bg-red-500/10 blur-xl transition-all duration-300"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
          }}
        />
      )}

      {/* Enhanced card glow */}
      <div className={`absolute inset-0 bg-red-500/2 rounded-lg transition-all duration-500 pointer-events-none ${isHovered ? 'opacity-100 bg-red-500/8' : 'opacity-0'
        }`} />

      {/* Animated border gradient */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg opacity-50"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.3), transparent)',
            animation: 'borderSweep 2s ease-in-out infinite'
          }}
        />
      )}

      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`font-medium leading-relaxed transition-all duration-300 ${isHovered ? 'text-red-100 transform translate-x-2' : 'text-gray-100'
            }`}>
            {item.label}
          </h3>

          {/* Enhanced tech decoration */}
          <div className="mt-2 flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${isHovered
                    ? 'bg-red-400/60 scale-150 animate-pulse'
                    : 'bg-red-500/25'
                  }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        <div className="text-right ml-4">
          <time className={`text-sm font-medium transition-all duration-300 ${isHovered ? 'text-red-300 scale-110' : 'text-red-400'
            }`}>
            {item.date}
          </time>

          {/* Enhanced date decoration */}
          <div className={`mt-1 ml-auto rounded-full transition-all duration-300 ${isHovered
              ? 'w-12 h-0.5 bg-red-400/60'
              : 'w-8 h-0.5 bg-red-500/30'
            }`} />
        </div>
      </div>

      {/* Corner sparkles on hover */}
      {isHovered && (
        <>
          <div className="absolute top-2 left-2 w-2 h-2 bg-red-400 rounded-full opacity-60 animate-ping" />
          <div className="absolute top-2 right-2 w-1 h-1 bg-red-300 rounded-full opacity-80 animate-pulse" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-red-500 rounded-full opacity-50 animate-bounce" />
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-red-400 rounded-full opacity-70 animate-pulse" />
        </>
      )}

      <style>{`
        @keyframes borderSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}

export default function Timeline({
  title = 'HACKATHON TIMELINE',
  items = [
    { label: 'Registration Opens', date: 'Dec 1, 2024' },
    { label: 'Team Formation Deadline', date: 'Dec 15, 2024' },
    { label: 'Hackathon Begins', date: 'Jan 15, 2025' },
    { label: 'Submission Deadline', date: 'Jan 17, 2025' },
    { label: 'Winners Announced', date: 'Jan 20, 2025' }
  ]
}) {
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % items.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [items.length])

  return (
    <section id="schedule" className="relative border-t border-gray-800/50 bg-gradient-to-b from-gray-950 via-red-950/8 to-gray-950 overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Subtle tech grid background */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Subtle corner glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-900/6 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-800/4 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        {/* Title with enhanced hover */}
        <div className="text-center mb-12">
          <GlitchText className="text-4xl md:text-5xl font-bold text-gray-100 tracking-wide">
            {title}
          </GlitchText>
          <div className="mt-3 h-0.5 w-20 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
          <p className="mt-4 text-gray-400 text-sm tracking-wide hover:text-red-300 transition-colors duration-300 cursor-default">
            Important dates and milestones
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-0">
            {items.map((item, index) => (
              <li key={item.label} className="relative pb-8 last:pb-0">
                {/* Enhanced Timeline connector */}
                <TimelineConnector
                  isLast={index === items.length - 1}
                  isHovered={hoveredCard === index}
                />

                <div className="flex items-start gap-6">
                  {/* Enhanced Step number */}
                  <StepNumber
                    number={index + 1}
                    isActive={activeStep === index}
                    onHover={(hovered) => setHoveredCard(hovered ? index : null)}
                  />

                  {/* Enhanced Content */}
                  <div className="flex-1 min-w-0">
                    <TimelineCard
                      item={item}
                      index={index}
                      isActive={activeStep === index}
                      onCardHover={(hovered) => setHoveredCard(hovered ? index : null)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Enhanced bottom info */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm group cursor-default">
            <span className="text-red-400 group-hover:text-red-300 transition-colors duration-300">Stay updated</span>
            <span className="mx-2">•</span>
            <span className="group-hover:text-gray-400 transition-colors duration-300">All times in IST</span>
          </p>

          {/* Enhanced bottom decoration */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-red-500/30 rounded-full animate-pulse hover:bg-red-400/60 hover:scale-150 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-15px) scale(1.1); opacity: 0.25; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes fastPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes expandRing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes borderSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
