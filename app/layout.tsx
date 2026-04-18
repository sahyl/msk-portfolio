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
  description: "Explore Mohammed Sahil Khan's portfolio featuring software development projects, technical skills, and insightful blog posts on web development, React, TypeScript, and performance optimization.",
  keywords: ["Mohammed Sahil Khan", "Software Developer", "Web Development", "React", "TypeScript", "Full Stack Developer"],
  authors: [{ name: "Mohammed Sahil Khan" }],
  creator: "Mohammed Sahil Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://msk-portfolio.vercel.app",
    siteName: "Mohammed Sahil Khan",
    title: "Mohammed Sahil Khan - Software Developer Portfolio",
    description: "Explore Mohammed Sahil Khan's portfolio featuring software development projects, technical skills, and insightful blog posts.",
    images: [
      {
        url: "https://msk-portfolio.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Sahil Khan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Sahil Khan - Software Developer Portfolio",
    description: "Explore Mohammed Sahil Khan's portfolio featuring software development projects and technical skills.",
    images: ["https://msk-portfolio.vercel.app/og-image.jpg"],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohammed Sahil Khan",
              url: "https://msk-portfolio.vercel.app",
              image: "https://msk-portfolio.vercel.app/og-image.jpg",
              description: "Software Developer specializing in web development, React, and TypeScript",
              sameAs: [
                "https://github.com/sahyl",
                "https://linkedin.com",
              ],
              jobTitle: "Software Developer",
            }),
          }}
        />
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
