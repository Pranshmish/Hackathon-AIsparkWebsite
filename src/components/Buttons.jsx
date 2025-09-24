import { motion } from 'framer-motion'

export function PrimaryButton({ as = 'a', href, children, className = '', ...rest }) {
  const Comp = motion[as] || motion.a
  return (
    <Comp
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[color:var(--accent-cyan,#00E5FF)] to-[color:var(--accent-magenta,#FF4DD8)] px-5 py-3 font-medium text-[color:var(--cta-fg,#0B0F14)] shadow-[0_0_40px_rgba(0,229,255,0.22)] hover:brightness-[1.06] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(0,229,255,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)] ${className}`}
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`inline-flex items-center justify-center rounded-md border border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)]/60 px-5 py-3 font-medium text-[color:var(--text-primary,#F2F5F9)] shadow-inner hover:bg-[rgba(0,229,255,0.08)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(0,229,255,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)] ${className}`}
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(0,229,255,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)] ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  )
}
