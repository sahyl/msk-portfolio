"use client"

import { Education } from "@/components/Education"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Projects } from "@/components/Projects"
import { Skills } from "@/components/Skills"
import { useTheme } from "@/components/Theme-provider"
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
      className="min-h-screen flex items-center justify-center p-4 print-p-0"
      style={{
        backgroundColor: "var(--card)", // This will be white in light, #191919 in dark
      }}
    >
      <main
        className={`w-full max-w-4xl print-shadow-none overflow-hidden rounded-2xl ${containerClass}`}
        style={{
          backgroundColor: "var(--background)", // This will be #ffffff in light, #0a0a0a in dark
          marginTop: "4rem", // Add margin to prevent navbar overlap
        }}
      >
        <div className="p-0">
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
