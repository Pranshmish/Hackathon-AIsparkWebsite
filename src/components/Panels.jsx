import { motion } from 'framer-motion'

export function Panel({ className = '', children, ...rest }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`rounded-lg border border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)] p-6 shadow-[var(--panel-shadow,0_24px_70px_rgba(0,0,0,0.45))] ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StatPanel({ label, value }) {
  return (
    <Panel className="text-center">
      <p className="text-sm text-[color:var(--text-secondary,#C9D2E1)]">{label}</p>
      <p className="mt-2 text-lg font-semibold text-[color:var(--text-primary,#F2F5F9)]">{value}</p>
    </Panel>
  )
}
