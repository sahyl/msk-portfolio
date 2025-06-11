"use client"

import { Education } from "@/components/Education"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Projects } from "@/components/Projects"
import { Skills } from "@/components/Skills"
import { useTheme } from "@/components/Theme-provider"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function ClientPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply shadow class conditionally based on theme
  const containerClass = mounted && theme === "light" ? "light-mode-shadow" : ""

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 print-p-0 relative"
      style={{
        backgroundColor: "var(--card)", // This will be white in light, #191919 in dark
      }}
    >
      {/* Outer Grid Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#404040_1px,transparent_1px),linear-gradient(to_bottom,#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <main
        className={`w-full max-w-4xl print-shadow-none overflow-hidden rounded-2xl ${containerClass} relative z-10`}
        style={{
          backgroundColor: "var(--background)", // This will be #ffffff in light, #0a0a0a in dark
          marginTop: "4rem", // Add margin to prevent navbar overlap
        }}
      >
        {/* Inner Grid Background - Subtle and Faded */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-40",
            "[background-size:20px_20px]",
            "[background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)]",
          )}
        />
        {/* Strong radial gradient for edge blur/fade effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] opacity-60"></div>

        <div className="p-0 relative z-10">
          <Hero />
          <Skills />
          <Projects />
          <Education />
          <Footer />
        </div>
      </main>
    </div>
  )
}
