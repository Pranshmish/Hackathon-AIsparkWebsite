import { useEffect, useState } from 'react'

// Floating particles for ambient effect
function FloatingParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 1.5,
        duration: 10 + Math.random() * 5
      }))
    }

    setParticles(generateParticles())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-red-400 rounded-full opacity-12"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.12; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}

// Enhanced glitch text effect
function GlitchText({ children, className = "" }) {
  const [glitch, setGlitch] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 6000 + Math.random() * 4000)

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
            className={`absolute inset-0 text-red-400 transform transition-all duration-100 ${isHovered ? 'opacity-70 translate-x-1' : 'opacity-50 translate-x-0.5'
              }`}
          >
            {children}
          </span>
          <span
            className={`absolute inset-0 text-red-300 transform transition-all duration-100 ${isHovered ? 'opacity-50 -translate-x-1' : 'opacity-30 -translate-x-0.5'
              }`}
          >
            {children}
          </span>
        </>
      )}
    </span>
  )
}

// Enhanced track card with multiple hover effects
function TrackCard({ track, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState([])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRipples([])
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
  }

  return (
    <a
      href="#register"
      className={`group relative block rounded-lg border backdrop-blur-sm transition-all duration-500 transform cursor-pointer overflow-hidden ${isHovered
          ? 'border-red-500/40 shadow-2xl shadow-red-500/20 scale-105 -translate-y-2'
          : 'border-gray-700/50 shadow-lg hover:border-red-500/20'
        }`}
      style={{
        background: isHovered
          ? 'linear-gradient(135deg, rgba(17, 19, 23, 0.95) 0%, rgba(30, 0, 0, 0.7) 100%)'
          : 'linear-gradient(135deg, rgba(17, 19, 23, 0.8) 0%, rgba(30, 36, 48, 0.6) 100%)',
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Mouse follower spotlight */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full bg-red-500/8 blur-2xl transition-all duration-300"
          style={{
            left: mousePosition.x - 60,
            top: mousePosition.y - 60,
            width: 120,
            height: 120,
          }}
        />
      )}

      {/* Click ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none rounded-full border-2 border-red-400/30"
          style={{
            left: ripple.x - 2,
            top: ripple.y - 2,
            width: 4,
            height: 4,
            animation: 'ripple 0.6s ease-out forwards'
          }}
        />
      ))}

      {/* Animated border gradient */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg opacity-60"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.2), transparent, rgba(239, 68, 68, 0.3), transparent)',
            animation: 'borderFlow 3s ease-in-out infinite'
          }}
        />
      )}

      {/* Main content */}
      <div className="relative p-6">
        {/* Corner tech accents */}
        <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-110' : 'border-red-500/40'
          }`} />
        <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-110' : 'border-red-500/40'
          }`} />
        <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-110' : 'border-red-500/40'
          }`} />
        <div className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-110' : 'border-red-500/40'
          }`} />

        {/* Header section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-red-400 scale-150 animate-pulse' : 'bg-red-500/60'
                }`} />
              <div className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${isHovered ? 'bg-red-400/60' : 'bg-red-500/30'
                }`} />
            </div>

            <h3 className={`font-bold text-xl tracking-wide transition-all duration-300 ${isHovered ? 'text-red-100 transform translate-x-1' : 'text-gray-100'
              }`}>
              {track.title}
            </h3>
          </div>

          {/* Track number */}
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold transition-all duration-300 ${isHovered
              ? 'border-red-400/80 bg-red-500/20 text-red-200 scale-110'
              : 'border-red-500/50 bg-red-500/10 text-red-300'
            }`}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm leading-relaxed transition-all duration-300 ${isHovered ? 'text-gray-200 transform translate-x-1' : 'text-gray-300'
          }`}>
          {track.body}
        </p>

        {/* Tech decorations */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${isHovered
                    ? 'bg-red-400/70 scale-150 animate-pulse'
                    : 'bg-red-500/30'
                  }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>

          {/* Arrow indicator */}
          <div className={`flex items-center text-xs font-medium transition-all duration-300 ${isHovered ? 'text-red-300 translate-x-1' : 'text-red-400/60'
            }`}>
            <span className="mr-1">EXPLORE</span>
            <svg
              className={`w-3 h-3 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Hover sparkles */}
        {isHovered && (
          <>
            <div className="absolute top-4 left-1/4 w-1 h-1 bg-red-400 rounded-full opacity-70 animate-ping" />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-red-300 rounded-full opacity-60 animate-pulse" />
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-red-500 rounded-full opacity-50 animate-bounce" />
            <div className="absolute bottom-4 right-1/3 w-1 h-1 bg-red-400 rounded-full opacity-80 animate-pulse" />
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes borderFlow {
          0% { transform: translateX(-100%) translateY(-100%); }
          50% { transform: translateX(100%) translateY(0%); }
          100% { transform: translateX(200%) translateY(100%); }
        }
        @keyframes ripple {
          to {
            transform: scale(20);
            opacity: 0;
          }
        }
      `}</style>
    </a>
  )
}

const defaults = [
  { title: 'AI AGENTS', body: 'Autonomous workflows that deliver measurable outcomes and scale intelligently.' },
  { title: 'COMPUTER VISION', body: 'Advanced perception systems for industry automation and accessibility.' },
  { title: 'INFRASTRUCTURE', body: 'Next-gen tooling for evaluations, safety protocols, and ML operations.' },
  { title: 'CONSUMER TECH', body: 'Delightful AI-powered products that people love and trust.' },
]

export default function Tracks({
  title = 'HACKATHON TRACKS',
  subhead = 'Choose your battlefield and build the future',
  cards = defaults
}) {
  return (
    <section id="tracks" className="relative border-t border-gray-800/50 bg-gradient-to-b from-gray-950 via-red-950/6 to-gray-950 overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Subtle tech grid background */}
      <div className="absolute inset-0 opacity-4">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Corner ambient glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-900/4 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-800/3 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <GlitchText className="text-4xl md:text-5xl font-bold text-gray-100 tracking-wide">
            {title}
          </GlitchText>
          <div className="mt-3 h-0.5 w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
          <p className="mt-6 text-gray-300 text-lg font-medium hover:text-red-200 transition-colors duration-300 cursor-default">
            {subhead}
          </p>

          {/* Subtitle decoration */}
          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-red-500/30 rounded-full animate-pulse hover:bg-red-400/60 hover:scale-150 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Tracks grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cards.map((track, index) => (
            <TrackCard key={track.title} track={track} index={index} />
          ))}
        </div>

        {/* Bottom info */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm group cursor-default">
            <span className="text-red-400 group-hover:text-red-300 transition-colors duration-300">Build something amazing</span>
            <span className="mx-3">•</span>
            <span className="group-hover:text-gray-400 transition-colors duration-300">Make it count</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.12; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.2; }
        }
      `}</style>
    </section>
  )
}
