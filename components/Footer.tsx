"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-8 px-4 text-center border-t mt-8"
      style={{ borderColor: `var(--border)`, opacity: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="h-px w-16 mx-auto mb-6" style={{ backgroundColor: `var(--primary)` }}></div>
        <p className="font-mono text-xs tracking-wider" style={{ color: "var(--muted-foreground)" }}>
          © {new Date().getFullYear()} MOHAMMED SAHIL KHAN
        </p>
        <p className="mt-2 font-mono text-xs tracking-wider" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>
          BUILT WITH NEXT.JS & TAILWIND CSS
        </p>
      </div>
    </motion.footer>
  )
}
