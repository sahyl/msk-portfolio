"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-8 px-4 text-center mt-8"
      style={{ opacity: 0.5 }} // border removed
    >
      <div className="max-w-4xl mx-auto">
        <div className="h-px w-16 mx-auto mb-6" style={{ backgroundColor: `var(--primary)` }}></div>
        <p className="font-mono text-xl font-bold tracking-wider" style={{ color: "var(--muted-foreground)" }}>
          © {new Date().getFullYear()} MOHAMMED SAHIL KHAN
        </p>
      </div>
    </motion.footer>
  )
}
