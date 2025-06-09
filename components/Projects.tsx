'use server'
import Link from "next/link"
import { FiGithub } from "react-icons/fi"
import { HiOutlineExternalLink } from "react-icons/hi"

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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md project-card flex flex-col justify-between border border-gray-200 print:border-0 print:shadow-none">
      <div>
        {/* Title with icons closely aligned */}
        <div className="flex items-center space-x-3 mb-2">
          <h3 className="text-xl font-dm-serif-text">{project.title}</h3> {/* ⬅️ Increased from text-lg to text-xl */}
          <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <HiOutlineExternalLink className="w-5 h-5 hover:text-gray-600 transition-colors" /> {/* ⬅️ was w-4 h-4 */}
          </Link>
          <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
            <FiGithub className="w-5 h-5 hover:text-gray-600 transition-colors" />
          </Link>
        </div>

        <p className="mb-2 text-sm">{project.description}</p> {/* ⬅️ was text-xs */}
        <p className="mb-2 text-sm text-gray-600">{project.techStack}</p> {/* ⬅️ was text-xs */}
      </div>
    </div>
  )
}


export async function Projects() {
  return (
    <section id="projects" className="dark py-8 px-4 sm:px-6 bg-white-50 print:bg-white print:py-4">
      <h2 className="text-3xl font-dm-serif-text mb-6 text-center print:text-2xl">PROJECTS</h2>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  )
}
