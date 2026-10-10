import type React from "react"
import type { Metadata } from "next"
import { Roboto, Doto } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import "./globals.css"
import { ThemeProvider } from "@/components/Theme-provider"
import { Analytics } from "@vercel/analytics/next"

// Register fonts with CSS variable names
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

const doto = Doto({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-doto",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sahil Khan | Backend & Applied AI",
  description: "Sahil Khan: software developer focused on backend workflows, data migration, retrieval-grounded AI, and codebase analysis. Seeking a first software engineering role.",
  keywords: ["Mohammed Sahil Khan", "Software Developer", "Web Development", "React", "TypeScript", "Backend Developer", "Applied AI", "Python", "PostgreSQL"],
  authors: [{ name: "Mohammed Sahil Khan" }],
  creator: "Mohammed Sahil Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sahilkhan.dev",
    siteName: "Mohammed Sahil Khan",
    title: "Sahil Khan | Backend & Applied AI",
    description: "Backend and applied AI projects, merged Turborepo contributions, and contact information for Sahil Khan.",
    images: [
      {
        url: "https://sahilkhan.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Sahil Khan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Khan | Backend & Applied AI",
    description: "Backend and applied AI projects by Sahil Khan.",
    images: ["https://sahilkhan.dev/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${doto.variable}`} suppressHydrationWarning>
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
              url: "https://sahilkhan.dev",
              image: "https://sahilkhan.dev/og-image.jpg",
              description: "Software developer focused on backend development and applied AI",
              sameAs: [
                "https://github.com/sahyl",
                "https://linkedin.com/in/saaahil",
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
        <Analytics />
      </body>
    </html>
  )
}
