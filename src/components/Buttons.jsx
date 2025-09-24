import { motion } from 'framer-motion'

export function PrimaryButton({ as = 'a', href, children, className = '', ...rest }) {
  const Comp = motion[as] || motion.a
  return (
    <Comp
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`inline-flex items-center justify-center rounded-md 
        bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] 
        px-6 py-3 font-semibold 
        text-white tracking-wide
        shadow-[0_0_25px_rgba(0,255,255,0.35),0_0_45px_rgba(179,0,0,0.4)] 
        hover:brightness-[1.25] hover:shadow-[0_0_35px_rgba(0,255,255,0.6),0_0_55px_rgba(179,0,0,0.7)]
        active:brightness-90
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-cyan-500/50 
        ring-offset-[color:var(--bg-base,#0A0B0E)] 
        transition-all duration-300
        ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function SecondaryButton({ as = 'a', href, children, className = '', ...rest }) {
  const Comp = motion[as] || motion.a
  return (
    <Comp
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`inline-flex items-center justify-center rounded-md 
        border border-cyan-400/60 
        bg-[#141414]/80 
        px-6 py-3 font-medium 
        text-white 
        shadow-inner shadow-cyan-900/50
        hover:bg-[#1f1f1f] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]
        active:brightness-90
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-cyan-500/50 
        ring-offset-[color:var(--bg-base,#0A0B0E)] 
        transition-all duration-300
        ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function GhostButton({ as = 'a', href, children, className = '', ...rest }) {
  const Comp = motion[as] || motion.a
  return (
    <Comp
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`inline-flex items-center justify-center rounded-md 
        px-5 py-2 text-sm font-medium 
        text-cyan-300 
        hover:text-cyan-400 
        hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-cyan-500/50 
        ring-offset-[color:var(--bg-base,#0A0B0E)] 
        transition-all duration-300
        ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  )
}
