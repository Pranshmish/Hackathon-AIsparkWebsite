// components/AboutUs.jsx
import { useEffect, useState } from 'react'

/* ===================== Motion Graphics Layers ===================== */

// Faint animated tech grid shimmer
function TechGrid() {
    return (
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
            <div
                className="w-full h-full"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.14) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                    animation: 'gridPulse 9s ease-in-out infinite'
                }}
            />
            <style jsx>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.02); }
        }
      `}</style>
        </div>
    )
}

// Corner ambient glows
function CornerGlows() {
    return (
        <>
            <div className="pointer-events-none absolute -top-16 -left-16 w-[28rem] h-[28rem] bg-red-900/8 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-12 w-[26rem] h-[26rem] bg-red-800/6 rounded-full blur-3xl" />
        </>
    )
}

// Soft center vignette glow
function CenterVignette() {
    return (
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(1000px_420px_at_50%_20%,rgba(255,0,0,0.10),transparent_70%)]" />
        </div>
    )
}

// Floating particles for ambient effect
function FloatingParticles() {
    const [particles, setParticles] = useState([])
    useEffect(() => {
        setParticles(Array.from({ length: 10 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: i * 1.2,
            duration: 9 + Math.random() * 5
        })))
    }, [])
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute w-1 h-1 bg-red-400 rounded-full opacity-10"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        filter: 'blur(0.6px)',
                        animation: `float ${p.duration}s ease-in-out infinite`,
                        animationDelay: `${p.delay}s`
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.10; }
          50% { transform: translateY(-16px) scale(1.15); opacity: 0.18; }
        }
      `}</style>
        </div>
    )
}

// Flowing blood rivers (horizontal)
function FlowingBlood() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Top river */}
            <div
                className="absolute left-0 right-0 top-[20%] h-24 opacity-25 blur-[2px]"
                style={{
                    background:
                        'linear-gradient(90deg, rgba(180,0,0,0.0) 0%, rgba(180,0,0,0.25) 20%, rgba(255,40,40,0.28) 50%, rgba(180,0,0,0.25) 80%, rgba(180,0,0,0.0) 100%)',
                    maskImage:
                        'radial-gradient(120% 60% at 50% 50%, black 60%, transparent 100%)',
                    WebkitMaskImage:
                        'radial-gradient(120% 60% at 50% 50%, black 60%, transparent 100%)',
                    animation: 'bloodFlow 18s linear infinite'
                }}
            />
            {/* Bottom river */}
            <div
                className="absolute left-0 right-0 bottom-[18%] h-20 opacity-20 blur-[2px]"
                style={{
                    background:
                        'linear-gradient(90deg, rgba(180,0,0,0.0) 0%, rgba(180,0,0,0.22) 25%, rgba(255,40,40,0.26) 55%, rgba(180,0,0,0.22) 85%, rgba(180,0,0,0.0) 100%)',
                    maskImage:
                        'radial-gradient(120% 60% at 50% 50%, black 60%, transparent 100%)',
                    WebkitMaskImage:
                        'radial-gradient(120% 60% at 50% 50%, black 60%, transparent 100%)',
                    animation: 'bloodFlowReverse 22s linear infinite'
                }}
            />
            {/* Gentle sheen pass */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                    animation: 'sheen 14s ease-in-out infinite'
                }}
            />
            <style jsx>{`
        @keyframes bloodFlow {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bloodFlowReverse {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes sheen {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.16; }
        }
      `}</style>
        </div>
    )
}

// Blood drips from top
function BloodDrips() {
    const [drips, setDrips] = useState([])
    useEffect(() => {
        setDrips(Array.from({ length: 14 }, (_, i) => ({
            id: i,
            x: 5 + (i * 7) % 90,
            delay: i * 0.35,
            speed: 6 + (i % 5), // seconds
            width: 2,
            height: 10 + (i % 4) * 8
        })))
    }, [])
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {drips.map(d => (
                <div
                    key={d.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${d.x}%`,
                        top: '-5%',
                        width: `${d.width}px`,
                        height: `${d.height}px`,
                        background: 'linear-gradient(to bottom, rgba(220,20,20,0.9), rgba(180,0,0,0.0))',
                        filter: 'blur(0.3px)',
                        animation: `drip ${d.speed}s linear ${d.delay}s infinite`
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes drip {
          0%   { transform: translateY(-10%); opacity: 0; }
          10%  { opacity: 0.85; }
          90%  { opacity: 0.85; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
      `}</style>
        </div>
    )
}

/* ===================== Cards + Layout (unchanged) ===================== */

function GlitchText({ children, className = "" }) {
    const [glitch, setGlitch] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true); setTimeout(() => setGlitch(false), 150)
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
                    <span className={`absolute inset-0 text-red-400 transform transition-all duration-100 ${isHovered ? 'opacity-70 translate-x-1' : 'opacity-50 translate-x-0.5'}`}>{children}</span>
                    <span className={`absolute inset-0 text-red-300 transform transition-all duration-100 ${isHovered ? 'opacity-50 -translate-x-1' : 'opacity-30 -translate-x-0.5'}`}>{children}</span>
                </>
            )}
        </span>
    )
}

function AboutCard({ card, index }) {
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [ripples, setRipples] = useState([])
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => { setIsHovered(false); setRipples([]) }
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const newRipple = { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top }
        setRipples(prev => [...prev, newRipple])
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 600)
    }

    return (
        <a
            href={card.href || '#about-detail'}
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
            {isHovered && (
                <div
                    className="absolute pointer-events-none rounded-full bg-red-500/8 blur-2xl transition-all duration-300"
                    style={{ left: mousePosition.x - 60, top: mousePosition.y - 60, width: 120, height: 120 }}
                />
            )}
            {ripples.map(r => (
                <div
                    key={r.id}
                    className="absolute pointer-events-none rounded-full border-2 border-red-400/30"
                    style={{
                        left: r.x - 2, top: r.y - 2, width: 4, height: 4,
                        animation: 'ripple 0.6s ease-out forwards'
                    }}
                />
            ))}
            {isHovered && (
                <div
                    className="absolute inset-0 rounded-lg opacity-60"
                    style={{
                        background: 'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.2), transparent, rgba(239, 68, 68, 0.3), transparent)',
                        animation: 'borderFlow 3s ease-in-out infinite'
                    }}
                />
            )}

            <div className="relative p-6">
                <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-110' : 'border-red-500/40'}`} />
                <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-110' : 'border-red-500/40'}`} />
                <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-110' : 'border-red-500/40'}`} />
                <div className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br-lg transition-all duration-300 ${isHovered ? 'border-red-400/80 scale-110' : 'border-red-500/40'}`} />

                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-red-400 scale-150 animate-pulse' : 'bg-red-500/60'}`} />
                            <div className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${isHovered ? 'bg-red-400/60' : 'bg-red-500/30'}`} />
                        </div>
                        <h3 className={`font-bold text-xl tracking-wide transition-all duration-300 ${isHovered ? 'text-red-100 transform translate-x-1' : 'text-gray-100'}`}>
                            {card.title}
                        </h3>
                    </div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold transition-all duration-300 ${isHovered
                        ? 'border-red-400/80 bg-red-500/20 text-red-200 scale-110'
                        : 'border-red-500/50 bg-red-500/10 text-red-300'}`}>
                        {String(index + 1).padStart(2, '0')}
                    </div>
                </div>

                <p className={`text-sm leading-relaxed transition-all duration-300 ${isHovered ? 'text-gray-200 transform translate-x-1' : 'text-gray-300'}`}>
                    {card.body}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1 h-1 rounded-full transition-all duration-300 ${isHovered ? 'bg-red-400/70 scale-150 animate-pulse' : 'bg-red-500/30'}`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                    <div className={`flex items-center text-xs font-medium transition-all duration-300 ${isHovered ? 'text-red-300 translate-x-1' : 'text-red-400/60'}`}>
                        <span className="mr-1">EXPLORE</span>
                        <svg className={`w-3 h-3 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

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
          to { transform: scale(20); opacity: 0; }
        }
      `}</style>
        </a>
    )
}

const defaults = [
    { title: 'WHO WE ARE', body: 'A team crafting reliable AI: agents, vision, and infrastructure with governance and delight.' },
    { title: 'WHAT WE BUILD', body: 'Agentic workflows, perception, and ops/eval primitives to ship safe, robust AI.' },
    { title: 'FOR BUILDERS', body: 'Modern DX, reproducibility, tool orchestration, and built-in observability.' },
    { title: 'FOR TEAMS', body: 'Policy, audit, identity, and controls — production-grade from day one.' },
]

export default function About({
    title = 'ABOUT AI GENESIS',
    subhead = 'Who we are and what is being built',
    cards = defaults
}) {
    return (
        <section id="about" className="relative overflow-hidden bg-black">
            {/* Motion graphics layers */}
            <CornerGlows />
            <CenterVignette />
            <TechGrid />
            <FlowingBlood />
            <BloodDrips />
            <FloatingParticles />

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

                {/* Cards grid (unchanged) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {cards.map((card, index) => (
                        <AboutCard key={card.title} card={card} index={index} />
                    ))}
                </div>

                {/* Bottom info */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 text-sm group cursor-default">
                        <span className="text-red-400 group-hover:text-red-300 transition-colors duration-300">Build with purpose</span>
                        <span className="mx-3">•</span>
                        <span className="group-hover:text-gray-400 transition-colors duration-300">Make it real</span>
                    </p>
                </div>
            </div>
        </section>
    )
}
