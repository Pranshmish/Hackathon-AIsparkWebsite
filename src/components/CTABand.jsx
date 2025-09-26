import { PrimaryButton, SecondaryButton } from './Buttons.jsx'
import { useEffect, useState } from 'react'

// Floating particles for ambient effect
function FloatingParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 2,
        duration: 15 + Math.random() * 8
      }))
    }

    setParticles(generateParticles())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-0.5 h-0.5 bg-red-400 rounded-full opacity-25"
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
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.25; }
          50% { transform: translateY(-30px) scale(1.4); opacity: 0.4; }
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
      setTimeout(() => setGlitch(false), 200)
    }, 8000 + Math.random() * 6000)

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
            className={`absolute inset-0 text-red-400 transform transition-all duration-150 ${isHovered ? 'opacity-80 translate-x-2' : 'opacity-60 translate-x-0.5'
              }`}
          >
            {children}
          </span>
          <span
            className={`absolute inset-0 text-red-300 transform transition-all duration-150 ${isHovered ? 'opacity-60 -translate-x-2' : 'opacity-40 -translate-x-0.5'
              }`}
          >
            {children}
          </span>
        </>
      )}
    </span>
  )
}

// Enhanced stat pill with hover effects
function StatPill({ children, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className={`px-3 py-1.5 rounded-full ring-1 transition-all duration-300 cursor-pointer transform ${isHovered
          ? 'bg-red-800/30 ring-red-500/50 scale-110 shadow-lg shadow-red-500/20 text-red-100'
          : 'bg-red-900/20 ring-red-700/30 text-red-200/60 hover:bg-red-800/25'
        }`}
      style={{ animationDelay: `${index * 0.2}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {/* Pulse ring on hover */}
      {isHovered && (
        <span
          className="absolute inset-0 rounded-full border border-red-400/40"
          style={{
            animation: 'expandRing 1s ease-out infinite'
          }}
        />
      )}

      <style>{`
        @keyframes expandRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </span>
  )
}

// Enhanced button wrapper with extra effects
function EnhancedButton({ children, className = "", isSecondary = false, ...props }) {
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

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 800)
  }

  const ButtonComponent = isSecondary ? SecondaryButton : PrimaryButton

  return (
    <div className="relative">
      {/* Button glow background */}
      {isHovered && (
        <div
          className={`absolute inset-0 rounded-lg blur-xl transition-all duration-300 ${isSecondary ? 'bg-red-600/20' : 'bg-red-500/30'
            }`}
          style={{ transform: 'scale(1.1)' }}
        />
      )}

      <ButtonComponent
        {...props}
        className={`relative overflow-hidden transform transition-all duration-300 ${isHovered
            ? 'scale-105 -translate-y-1'
            : 'hover:scale-103'
          } ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {/* Mouse follower spotlight */}
        {isHovered && (
          <div
            className="absolute pointer-events-none rounded-full bg-white/5 blur-lg transition-all duration-200"
            style={{
              left: mousePosition.x - 40,
              top: mousePosition.y - 40,
              width: 80,
              height: 80,
            }}
          />
        )}

        {/* Click ripples */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute pointer-events-none rounded-full border border-white/20"
            style={{
              left: ripple.x - 2,
              top: ripple.y - 2,
              width: 4,
              height: 4,
              animation: 'ripple 0.8s ease-out forwards'
            }}
          />
        ))}

        <span className="relative z-10 flex items-center gap-2">
          {children}

          {/* Arrow for primary button */}
          {!isSecondary && (
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}

          {/* Discord icon for secondary button */}
          {isSecondary && (
            <div className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'scale-110' : ''
              }`}>
              💬
            </div>
          )}
        </span>

        <style>{`
          @keyframes ripple {
            to {
              transform: scale(15);
              opacity: 0;
            }
          }
        `}</style>
      </ButtonComponent>
    </div>
  )
}

export default function CTABand({
  headline = 'BE PART OF AI GENESIS',
  subhead = 'Hack the Future • December 15-17, 2024 (IST)',
  cta_primary = { label: 'Register Now', href: '#register' },
  cta_secondary = { label: 'Join Discord', href: '#community' },
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="final_cta"
      className="relative overflow-hidden border-y border-gray-800/50 bg-gradient-to-b from-gray-950 via-red-950/10 to-gray-950"
    >
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Enhanced tech grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Enhanced bloody-red ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/8 via-red-800/12 to-red-900/8 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-800/8 rounded-full blur-3xl" />

      {/* Enhanced diagonal red beams */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-10 h-72 w-[140%] rotate-6 bg-gradient-to-r from-red-900/0 via-red-700/15 to-red-900/0 blur-2xl animate-pulse" />
        <div className="absolute top-24 -right-10 h-72 w-[140%] -rotate-6 bg-gradient-to-r from-red-900/0 via-red-700/15 to-red-900/0 blur-2xl animate-pulse" />
      </div>

      {/* Subtle scanlines + noise */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[length:100%_4px] opacity-30 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 grain-overlay opacity-20" />

      <div className={`relative mx-auto max-w-6xl px-4 py-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
        {/* Enhanced neon edge frame */}
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
        <div className="absolute left-1/2 bottom-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

        {/* Enhanced headline with glitch effect */}
        <GlitchText className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wide text-red-50 drop-shadow-[0_0_20px_rgba(255,40,40,0.3)]">
          {headline}
        </GlitchText>

        {/* Tech decoration under headline */}
        <div className="mt-4 flex justify-center space-x-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-red-500/40 rounded-full animate-pulse hover:bg-red-400/70 hover:scale-150 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        <p className="mt-6 text-lg sm:text-xl text-red-100/80 max-w-3xl mx-auto leading-relaxed hover:text-red-50 transition-colors duration-300 cursor-default">
          {subhead}. Build with bleeding‑edge models, ship real demos, and compete with top teams for glory.
        </p>

        {/* Enhanced pill stats with hover effects */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs sm:text-sm flex-wrap">
          {['48H SPRINT', 'AI + AGENTS', 'PRIZES + SWAG', 'MENTORSHIP'].map((stat, index) => (
            <StatPill key={stat} index={index}>
              {stat}
            </StatPill>
          ))}
        </div>

        {/* Enhanced CTA buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <EnhancedButton
            href={cta_primary.href}
            aria-label={cta_primary.label}
            className="hover:shadow-[0_0_40px_rgba(255,40,40,0.3)]"
          >
            {cta_primary.label}
          </EnhancedButton>

          <EnhancedButton
            href={cta_secondary.href}
            aria-label={cta_secondary.label}
            className="hover:shadow-[0_0_30px_rgba(255,40,40,0.2)]"
            isSecondary
          >
            {cta_secondary.label}
          </EnhancedButton>
        </div>

        {/* Additional tech elements */}
        <div className="mt-12 flex justify-center space-x-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 bg-gradient-to-t from-red-500/20 to-red-500/60 rounded-full animate-pulse hover:scale-110 hover:bg-gradient-to-t hover:from-red-400/30 hover:to-red-400/80 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>

        {/* Enhanced bottom glow ridge */}
        <div className="mt-8 h-12 w-full bg-[radial-gradient(80%_150%_at_50%_130%,rgba(255,40,40,0.25),transparent_70%)] animate-pulse" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.25; }
          50% { transform: translateY(-30px) scale(1.4); opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
