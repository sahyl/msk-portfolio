"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { PiReadCvLogoBold } from "react-icons/pi"
import FlipImage from "./FlipImage"
import { motion } from "framer-motion"
import { useTheme } from "./Theme-provider"
import { ThemeToggle } from "./Theme-toggle"

export function Hero() {
  const { theme } = useTheme()

  // Button styling based on theme
  const buttonStyle = {
    backgroundColor: theme === "dark" ? "var(--primary)" : "#000000",
    color: theme === "dark" ? "var(--primary-foreground)" : "#ffffff",
    border: `1px solid ${theme === "dark" ? "var(--border)" : "#000000"}`,
    fontWeight: "600",
  }

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Theme toggle positioned in top right */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          {/* Profile Image */}
          <FlipImage />

          {/* Name - Using DM Serif with increased weight */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl mt-8 mb-4 text-center hero-name"
            style={{ color: "var(--foreground)" }}
          >
            MOHAMMED SAHIL KHAN
          </motion.h1>

          {/* Subtitle with increased weight */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg mb-8 max-w-xl text-center font-mono tracking-wide text-bold"
            style={{ color: "var(--muted-foreground)" }}
          >
            SOFTWARE DEVELOPER • AI ENTHUSIAST • PROBLEM SOLVER
          </motion.p>

          {/* Button with animated gradient border - no hover effect, intensified colors */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative"
          >
            {/* Animated gradient border - intensified colors */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8AFFC1] via-[#67D1FB] to-[#FF87D7] rounded-full opacity-100 blur-[2px] animate-gradient-x"></div>

            <Button
              asChild
              className="font-mono px-6 py-3 rounded-full transition-all duration-300 tracking-wide text-bold hover:opacity-90 relative"
              style={buttonStyle}
            >
              <Link href="/Sahil_Khan_resume24.pdf" download>
                <PiReadCvLogoBold className="w-4 h-4 mr-2" />
                DOWNLOAD RESUME
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
