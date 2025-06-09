
import type React from "react"
import { Metadata } from "next"
import { Roboto } from "next/font/google"
import { DM_Serif_Text } from "next/font/google"
import { Providers } from "@/components/Providers"
import "./globals.css"
import { Navbar } from "@/components/Navbar"

// Load fonts with CSS variables
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

const dmSerifText = DM_Serif_Text({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif-text",
})

// SEO Metadata
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
    <html lang="en" className={`${roboto.variable} ${dmSerifText.variable} dark`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans bg-white text-black">
        <Providers>
          <Navbar />
          <div className="pt-16">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
