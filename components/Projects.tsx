"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FiGithub } from "react-icons/fi"
import { HiOutlineExternalLink } from "react-icons/hi"
import { SectionHeading } from "./SectionHeading"
import { cn } from "@/lib/utils"

interface Project {
  title: string
  description: string
  liveLink: string
  githubLink: string
  techStack: string
}

const projects: Project[] = [
  {
    title: "DocsSphere",
    description:
      "A document collaboration tool with Clerk authentication, Liveblocks for real-time editing, and Sentry for monitoring.",
    liveLink: "https://docssphere.vercel.app/sign-in",
    githubLink: "https://github.com/sahyl/DocSphere",
    techStack: "Next.js, TypeScript, Clerk, Liveblocks, Sentry, Vercel, Shadcn",
  },
  {
    title: "CarePulse",
    description: "A healthcare management platform with appointment scheduling and Twilio notifications.",
    liveLink: "https://carepoint-carepulse.vercel.app/",
    githubLink: "https://github.com/sahyl/Carepoint",
    techStack: "Next.js, TypeScript, Appwrite, Zod, Twilio, Shadcn, Vercel",
  },
  {
    title: "OpenVoice",
    description: "An anonymous Q&A platform with AI-powered question suggestions using Google Gemini AI.",
    liveLink: "https://opevoice.vercel.app/",
    githubLink: "https://github.com/sahyl/OpenVoice",
    techStack: "TypeScript, Next.js, Vercel, NextAuth, Resend, Zod, Bcrypt, MongoDB, Google Gemini AI, Shadcn",
  },
  {
    title: "YCD",
    description:
      "YCD is a comprehensive directory designed for entrepreneurs to showcase their startups, facilitating collaboration with potential investors and providing global visibility for innovative ideas.",
    liveLink: "https://ycd.vercel.app/",
    githubLink: "https://github.com/sahyl/YCDirectory",
    techStack: "Next.js, TypeScript, NextAuth, Sanity, Vercel, Shadcn",
  },
  {
    title: "Sync",
    description: "SYNC is a Next.js-based video conferencing platform inspired by Zoom.",
    liveLink: "https://sync-videocall.vercel.app/sign-in",
    githubLink: "https://github.com/sahyl/sync",
    techStack: "Next.js, TypeScript, Clerk, Zod, StreamIO, Shadcn, Vercel",
  },
  {
    title: "StoreIt",
    description:
      "StoreIt is a modern file storage and management application built with Next.js and a variety of powerful React libraries.",
    liveLink: "https://storeit-storage-solutions.vercel.app/",
    githubLink: "https://github.com/sahyl/storeit",
    techStack: "TypeScript, Next.js, Vercel, NextAuth, Zod, Appwrite, ReCharts, Shadcn",
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className="project-card flex flex-col justify-between group relative p-6 rounded-2xl overflow-hidden border-2"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Dot Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Title with underline - Using DM Serif */}
        <div className="mb-4">
          <h3
            className="text-xl mb-2 group-hover:text-primary transition-colors duration-300 project-text"
            style={{
              fontFamily: "var(--font-dm-serif-text)",
              letterSpacing: "0.02em",
            }}
          >
            {project.title}
          </h3>
          <div
            className="h-px w-12 rounded-full group-hover:w-16 transition-all duration-300"
            style={{ backgroundColor: `var(--primary)` }}
          ></div>
        </div>

        <p className="mb-4 text-sm font-mono leading-relaxed tracking-wide project-description">
          {project.description}
        </p>
        <p className="mb-4 text-xs font-mono tracking-wide project-tech">{project.techStack}</p>
      </div>

      <div className="flex space-x-4 mt-2 relative z-10">
        <Link
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-sm font-mono transition-colors tracking-wide hover:opacity-80 text-bold"
          style={{ color: "var(--foreground)" }}
        >
          <HiOutlineExternalLink className="w-4 h-4" style={{ strokeWidth: "2.5" }} />
          <span>LIVE</span>
        </Link>
        <Link
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-sm font-mono transition-colors tracking-wide hover:opacity-80 text-bold"
          style={{ color: "var(--foreground)" }}
        >
          <FiGithub className="w-4 h-4" style={{ strokeWidth: "2.5" }} />
          <span>CODE</span>
        </Link>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="PROJECTS" color="#9333EA" />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
