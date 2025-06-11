import type React from "react"
import type { Metadata } from "next"
import { Roboto, DM_Serif_Text } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import "./globals.css"
import { ThemeProvider } from "@/components/Theme-provider"

// Register fonts with CSS variable names
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

const dmSerifText = DM_Serif_Text({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif-text",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mohammed Sahil Khan - Software Developer Portfolio",
  description: "A showcase of projects and skills by Mohammed Sahil Khan",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${dmSerifText.variable}`} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-mono">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <Navbar />
          <div style={{ backgroundColor: "var(--card)" }}>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
