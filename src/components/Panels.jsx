import { motion } from 'framer-motion'

export function Panel({ className = '', children, ...rest }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`rounded-xl border border-[color:var(--border-soft,#5A0A0A)] 
        bg-[color:var(--bg-panel,#150000)] 
        p-6 
        shadow-[0_0_25px_rgba(255,0,0,0.4),0_0_60px_rgba(200,0,0,0.3)] 
        hover:shadow-[0_0_35px_rgba(255,50,50,0.8),0_0_80px_rgba(255,0,0,0.5)] 
        relative overflow-hidden ${className}`}
      {...rest}
    >
      {/* Shiny AI pulse effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-900/30 via-transparent to-red-600/20 opacity-40 animate-pulse pointer-events-none" />
      {children}
    </motion.div>
  )
}

export function StatPanel({ label, value }) {
  return (
    <Panel className="text-center">
      <p className="text-sm font-medium text-[color:var(--text-secondary,#ffbaba)] tracking-wide uppercase">
        {label}
      </p>
      <p className="mt-3 text-2xl font-extrabold text-[color:var(--text-primary,#FF2D2D)] drop-shadow-[0_0_8px_rgba(255,50,50,0.9)]">
        {value}
      </p>
    </Panel>
  )
}
