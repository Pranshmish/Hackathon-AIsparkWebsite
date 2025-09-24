import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

function formatINR(n) {
  const s = n.toLocaleString('en-IN')
  return `₹${s}`
}

// Subtle glitch text effect for tech theme
function GlitchText({ children, className = "" }) {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 100)
    }, 4000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative ${className}`}>
      {children}
      {glitch && (
        <>
          <span className="absolute inset-0 text-red-400 opacity-50 transform translate-x-0.5">
            {children}
          </span>
          <span className="absolute inset-0 text-red-300 opacity-30 transform -translate-x-0.5">
            {children}
          </span>
        </>
      )}
    </span>
  )
}

// Subtle glow effect for prize cards
function SubtleGlow() {
  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-red-600/8 to-red-900/5"
        style={{
          animation: 'subtleGlow 4s ease-in-out infinite'
        }}
      />
      <style jsx>{`
        @keyframes subtleGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}

// Floating particles for ambient effect
function FloatingParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.8,
        duration: 6 + Math.random() * 4
      }))
    }

    setParticles(generateParticles())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-red-400 rounded-full opacity-20"
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
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}

export default function Prizes({
  title = 'HACKATHON PRIZE POOL',
  items = [
    { name: 'GRAND CHAMPION', value: 500000 },
    { name: 'AI INNOVATION AWARD', value: 300000 },
    { name: 'TECH BREAKTHROUGH', value: 200000 },
    { name: 'SPECIAL MENTIONS', value: 150000 }
  ],
  total = 2000000,
  cta = { label: 'REGISTER NOW', href: '#register' }
}) {
  const reduce = useReducedMotion()
  const [animatedTotal, setAnimatedTotal] = useState(0)

  // Prize pool animation
  useEffect(() => {
    if (reduce) {
      setAnimatedTotal(total)
      return
    }

    let raf
    const duration = 2000
    const start = performance.now()
    const from = 0
    const to = total

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setAnimatedTotal(Math.floor(from + (to - from) * eased))
      if (t < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [reduce, total])

  return (
    <section id="prizes" className="relative bg-gradient-to-b from-gray-950 via-red-950/10 to-gray-950 overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Subtle tech grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Subtle corner glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-900/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-800/6 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        {/* Title */}
        <div className="text-center mb-6">
          <GlitchText className="text-4xl md:text-5xl font-bold text-gray-100 tracking-wide">
            {title}
          </GlitchText>
          <div className="mt-3 h-0.5 w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
        </div>

        {/* Animated prize pool */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-lg" />
            <GlitchText className="relative text-5xl md:text-7xl font-black text-red-400 tracking-tight">
              {formatINR(animatedTotal)}
            </GlitchText>
          </div>
          <p className="mt-4 text-gray-300 text-lg font-medium">
            <span className="text-red-400">TOTAL PRIZE POOL</span>
            <span className="mx-3 text-gray-500">•</span>
            <span className="text-gray-400">AI HACKATHON 2025</span>
          </p>
        </div>

        {/* Prize categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {items.map((item, index) => (
            <div
              key={item.name}
              className="group relative bg-gradient-to-b from-gray-900/80 to-gray-950/90 border border-gray-700/50 rounded-lg p-6 text-center backdrop-blur-sm hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SubtleGlow />

              {/* Minimal corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-red-500/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-red-500/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-red-500/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-red-500/40" />

              <div className="relative z-10">
                <div className="mb-4">
                  <div className="w-6 h-0.5 bg-red-500/60 mx-auto rounded-full" />
                </div>

                <h3 className="text-xs font-semibold text-gray-300 tracking-widest uppercase mb-4 leading-relaxed">
                  {item.name}
                </h3>

                <div className="relative">
                  <GlitchText className="text-2xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    {formatINR(item.value)}
                  </GlitchText>
                </div>

                {/* Tech decoration */}
                <div className="mt-4 flex justify-center space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-red-500/30 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-red-500/3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative inline-block">
            {/* Subtle button glow */}
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-lg" />

            <a
              href={cta.href}
              aria-label={cta.label}
              className="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg border border-red-500/50 hover:from-red-500 hover:to-red-600 hover:border-red-400/70 transform hover:scale-102 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
            >
              {cta.label}

              {/* Minimal tech decoration */}
              <div className="ml-3 flex space-x-0.5">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="w-1 h-1 bg-white/60 rounded-full" />
              </div>
            </a>
          </div>

          <p className="mt-6 text-gray-400 text-sm">
            <span className="text-red-400">48 HOURS</span>
            <span className="mx-3">•</span>
            <span className="text-gray-500">UNLIMITED POTENTIAL</span>
            <span className="mx-3">•</span>
            <span className="text-red-400">INTENSE COMPETITION</span>
          </p>
        </div>

        {/* Bottom minimal decoration */}
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-red-500/40 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes subtleGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  )
}
