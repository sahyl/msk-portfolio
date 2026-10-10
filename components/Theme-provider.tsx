"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: "dark" | "light"
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
}: ThemeProviderProps) {
  const [preference, setPreference] = React.useState<Theme>(defaultTheme)

  const [systemTheme, setSystemTheme] = React.useState<"dark" | "light">("light")
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored === "dark" || stored === "light" || stored === "system") setPreference(stored)
    } catch { /* The in-memory theme works when storage is blocked. */ }
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => setSystemTheme(media.matches ? "dark" : "light")
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [storageKey])
  const theme = preference === "system" ? systemTheme : preference
  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])
  const setTheme = React.useCallback((newTheme: Theme) => {
    setPreference(newTheme)
    try { localStorage.setItem(storageKey, newTheme) } catch { /* Keep the selection in memory. */ }
  }, [storageKey])
  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
