"use client"

import { Education } from "@/components/Education"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { OpenSourceContributions } from "@/components/openSourceContributions"
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

  const containerClass = mounted && theme === "light" ? "light-mode-shadow" : ""

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 print-p-0 relative"
      style={{
        backgroundColor: "var(--card)",
      }}
    >
      {/* Outer Grid Background - More pronounced lines */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#7e7e7e_1.5px,transparent_1px),linear-gradient(to_bottom,#7e7e7e_1.5px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#5f5f5f_1.5px,transparent_1px),linear-gradient(to_bottom,#5f5f5f_1.5px,transparent_1px)]"
        )}
      />

      {/* Radial gradient mask with soft blur */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black)] blur-sm"></div>

      <main
        className={`w-full max-w-4xl print-shadow-none overflow-hidden rounded-2xl ${containerClass} relative z-10`}
        style={{
          backgroundColor: "var(--background)",
          marginTop: "4rem",
        }}
      >
        {/* Inner Grid Background - Slightly stronger */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-50",
            "[background-size:20px_20px]",
            "[background-image:linear-gradient(to_right,#d4d4d4_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#4b5563_1px,transparent_1px),linear-gradient(to_bottom,#4b5563_1px,transparent_1px)]"
          )}
        />

        {/* Inner radial blur mask with stronger spread */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_55%,black)] opacity-70 blur-sm"></div>

        <div className="p-0 relative z-10">
          <Hero />
          <Skills />
          <Projects />
          <OpenSourceContributions />
          <Education />
          <Footer />
        </div>
      </main>
    </div>
  )
}
