import * as Accordion from '@radix-ui/react-accordion'
import { useEffect, useState } from 'react'

// Floating particles for ambient effect
function FloatingParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 1.8,
        duration: 12 + Math.random() * 6
      }))
    }

    setParticles(generateParticles())
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-0.5 h-0.5 bg-red-400 rounded-full opacity-20"
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
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-25px) scale(1.3); opacity: 0.35; }
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
      setTimeout(() => setGlitch(false), 180)
    }, 7000 + Math.random() * 5000)

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
            className={`absolute inset-0 text-red-400 transform transition-all duration-150 ${isHovered ? 'opacity-70 translate-x-1.5' : 'opacity-50 translate-x-0.5'
              }`}
          >
            {children}
          </span>
          <span
            className={`absolute inset-0 text-red-300 transform transition-all duration-150 ${isHovered ? 'opacity-50 -translate-x-1.5' : 'opacity-30 -translate-x-0.5'
              }`}
          >
            {children}
          </span>
        </>
      )}
    </span>
  )
}

// Enhanced FAQ item with hover effects
function FAQItem({ item, index, value, isOpen, onOpenChange }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <Accordion.Item
      value={value}
      className={`overflow-hidden rounded-lg border backdrop-blur-sm transition-all duration-500 transform ${isHovered || isOpen
          ? 'border-red-500/50 shadow-2xl shadow-red-500/25 scale-102 -translate-y-0.5'
          : 'border-red-900/40 shadow-lg shadow-red-900/20'
        }`}
      style={{
        background: isHovered || isOpen
          ? 'linear-gradient(135deg, rgba(20, 20, 25, 0.95) 0%, rgba(40, 0, 0, 0.8) 100%)'
          : 'linear-gradient(135deg, rgba(20, 20, 25, 0.85) 0%, rgba(17, 19, 23, 0.9) 100%)',
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse follower spotlight */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full bg-red-500/6 blur-xl transition-all duration-300"
          style={{
            left: mousePosition.x - 80,
            top: mousePosition.y - 80,
            width: 160,
            height: 160,
          }}
        />
      )}

      {/* Animated border gradient */}
      {(isHovered || isOpen) && (
        <div
          className="absolute inset-0 rounded-lg opacity-40"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.3), transparent)',
            animation: 'borderSweep 2s ease-in-out infinite'
          }}
        />
      )}

      {/* Corner tech accents */}
      <div className={`absolute top-2 left-2 w-3 h-3 border-t border-l rounded-tl-lg transition-all duration-300 ${isHovered || isOpen ? 'border-red-400/80 scale-125' : 'border-red-500/40'
        }`} />
      <div className={`absolute top-2 right-2 w-3 h-3 border-t border-r rounded-tr-lg transition-all duration-300 ${isHovered || isOpen ? 'border-red-400/80 scale-125' : 'border-red-500/40'
        }`} />
      <div className={`absolute bottom-2 left-2 w-3 h-3 border-b border-l rounded-bl-lg transition-all duration-300 ${isHovered || isOpen ? 'border-red-400/80 scale-125' : 'border-red-500/40'
        }`} />
      <div className={`absolute bottom-2 right-2 w-3 h-3 border-b border-r rounded-br-lg transition-all duration-300 ${isHovered || isOpen ? 'border-red-400/80 scale-125' : 'border-red-500/40'
        }`} />

      <Accordion.Header>
        <Accordion.Trigger
          className="relative flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 group"
          onClick={() => onOpenChange(isOpen ? null : value)}
        >
          {/* Question number */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-6 h-6 rounded-full border text-xs font-bold transition-all duration-300 ${isOpen
                ? 'border-red-400/80 bg-red-500/20 text-red-200 scale-110'
                : isHovered
                  ? 'border-red-400/60 bg-red-500/15 text-red-300 scale-105'
                  : 'border-red-500/50 bg-red-500/10 text-red-400'
              }`}>
              {String(index + 1).padStart(2, '0')}
            </div>

            <span className={`transition-all duration-300 ${isHovered ? 'transform translate-x-1 text-red-100' : ''
              }`}>
              {item.q}
            </span>
          </div>

          {/* Enhanced expand icon */}
          <div className="relative">
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-lg font-bold transition-all duration-300 ${isOpen
                  ? 'border-red-400/80 bg-red-500/20 text-red-200 rotate-45 scale-110'
                  : isHovered
                    ? 'border-red-400/60 bg-red-500/15 text-red-300 scale-105'
                    : 'border-red-500/50 bg-red-500/10 text-red-400'
                }`}
            >
              +
            </span>

            {/* Rotating ring on hover/open */}
            {(isHovered || isOpen) && (
              <div
                className="absolute inset-0 rounded-full border border-red-400/30"
                style={{
                  animation: 'rotate 3s linear infinite'
                }}
              />
            )}
          </div>

          {/* Hover sparkles */}
          {isHovered && (
            <>
              <div className="absolute top-2 left-1/4 w-1 h-1 bg-red-400 rounded-full opacity-70 animate-ping" />
              <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-red-300 rounded-full opacity-80 animate-pulse" />
              <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-red-500 rounded-full opacity-60 animate-bounce" />
            </>
          )}
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'animate-slideDown' : 'animate-slideUp'
          }`}
      >
        <div className="px-6 pb-6 pt-2">
          {/* Answer decoration */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-1 bg-red-500/60 rounded-full" />
            <div className="h-0.5 flex-1 bg-gradient-to-r from-red-500/40 to-transparent" />
          </div>

          <p className={`text-sm leading-relaxed transition-all duration-300 ${isHovered ? 'text-gray-200 transform translate-x-1' : 'text-gray-300'
            }`}>
            {item.a}
          </p>

          {/* Bottom tech decoration */}
          <div className="mt-4 flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-0.5 h-0.5 rounded-full transition-all duration-300 ${isHovered
                    ? 'bg-red-400/60 scale-150 animate-pulse'
                    : 'bg-red-500/30'
                  }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </Accordion.Content>

      <style jsx>{`
        @keyframes borderSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideDown {
          from { height: 0; }
          to { height: var(--radix-accordion-content-height); }
        }
        @keyframes slideUp {
          from { height: var(--radix-accordion-content-height); }
          to { height: 0; }
        }
      `}</style>
    </Accordion.Item>
  )
}

const defaultItems = [
  {
    q: "What is AI Genesis Hackathon?",
    a: "AI Genesis is a 48-hour intensive hackathon focused on building cutting-edge AI applications. Teams compete across multiple tracks including AI Agents, Computer Vision, Infrastructure, and Consumer Tech to create innovative solutions that push the boundaries of artificial intelligence."
  },
  {
    q: "Who can participate in this hackathon?",
    a: "The hackathon is open to developers, designers, data scientists, students, and AI enthusiasts of all skill levels. Whether you're a seasoned professional or just starting your AI journey, you'll find challenges suited to your expertise level."
  },
  {
    q: "What are the prize categories and amounts?",
    a: "We have a total prize pool of ₹20,00,000 distributed across multiple categories: Grand Champion (₹5,00,000), AI Innovation Award (₹3,00,000), Tech Breakthrough (₹2,00,000), and Special Mentions (₹1,50,000), plus various sponsor prizes and mentorship opportunities."
  },
  {
    q: "Do I need a team to participate?",
    a: "While you can register individually, we recommend forming teams of 2-4 members for the best experience. We'll provide team formation opportunities during the registration period, and you can find teammates through our Discord community."
  },
  {
    q: "What resources and tools will be provided?",
    a: "Participants get access to cloud computing credits, premium AI APIs, development tools, datasets, mentorship from industry experts, and 24/7 technical support. We'll also provide meals, beverages, and a comfortable workspace for the entire duration."
  }
]

export default function FAQ({
  title = 'AI GENESIS FAQs',
  items = defaultItems,
}) {
  const [openItem, setOpenItem] = useState(null)

  return (
    <section
      id="faq"
      className="relative border-t border-gray-800/50 bg-gradient-to-b from-gray-950 via-red-950/8 to-gray-950 overflow-hidden"
    >
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Subtle tech grid background */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />
      </div>

      {/* Enhanced glowing aura */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/8 via-transparent to-red-900/8 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-800/6 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-20">
        {/* Enhanced title */}
        <div className="text-center mb-16">
          <GlitchText className="text-4xl md:text-5xl font-bold text-gray-100 tracking-wide">
            {title}
          </GlitchText>
          <div className="mt-3 h-0.5 w-20 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
          <p className="mt-6 text-gray-400 text-lg hover:text-red-300 transition-colors duration-300 cursor-default">
            Everything you need to know about the hackathon
          </p>

          {/* Title decoration */}
          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-red-500/30 rounded-full animate-pulse hover:bg-red-400/60 hover:scale-150 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Accordion */}
        <Accordion.Root
          type="single"
          collapsible
          className="space-y-6"
          value={openItem}
          onValueChange={setOpenItem}
        >
          {items.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              value={`item-${index}`}
              isOpen={openItem === `item-${index}`}
              onOpenChange={setOpenItem}
            />
          ))}
        </Accordion.Root>

        {/* Bottom info */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm group cursor-default">
            <span className="text-red-400 group-hover:text-red-300 transition-colors duration-300">Still have questions?</span>
            <span className="mx-3">•</span>
            <span className="group-hover:text-gray-400 transition-colors duration-300">Join our Discord community</span>
          </p>

          {/* Bottom decoration */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-red-500/40 rounded-full animate-pulse hover:bg-red-400/70 hover:scale-125 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-25px) scale(1.3); opacity: 0.35; }
        }
      `}</style>
    </section>
  )
}
