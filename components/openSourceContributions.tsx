"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FiGithub } from "react-icons/fi"
import { HiOutlineExternalLink } from "react-icons/hi"
import { SectionHeading } from "./SectionHeading"
import { cn } from "@/lib/utils"

interface Contribution {
  title: string
  description: string
  repository: string
  pullRequestLink: string
  tags: string[]
}

const contributions: Contribution[] = [
  {
    title: "turborepo#10579",
    description: "Fixed broken Tailwind CSS styling in the 'with-tailwind' example",
    repository: "vercel/turborepo",
    pullRequestLink: "https://github.com/vercel/turborepo/pull/10579",
    tags: ["Tailwind CSS", "Bug Fix", "Example"],
  },
]

function ContributionCard({
  contribution,
  index,
}: {
  contribution: Contribution
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={cn(
        "contribution-card group relative p-6 rounded-2xl overflow-hidden border-2 transition-all duration-200 ease-out hover:shadow-xl",
        "hover:bg-white dark:hover:bg-black",
      )}
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Dot Background */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
          "transition-colors duration-200 ease-out",
        )}
      />

      {/* Radial gradient mask */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-50 transition-all duration-200 ease-out"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="mb-4">
          <h3
            className="text-xl mb-2 group-hover:text-primary transition-colors duration-200 ease-out contribution-text"
            style={{
              fontFamily: "var(--font-dm-serif-text)",
              letterSpacing: "0.02em",
            }}
          >
            {contribution.title}
          </h3>
          <div
            className="h-px w-12 rounded-full group-hover:w-16 transition-all duration-200 ease-out"
            style={{ backgroundColor: `var(--primary)` }}
          ></div>
        </div>

        <p className="mb-4 text-sm font-mono leading-relaxed tracking-wide contribution-description">
          {contribution.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {contribution.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full font-mono tracking-wide"
              style={{
                backgroundColor: "var(--muted)",
                color: "var(--muted-foreground)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mb-4 text-xs font-mono tracking-wide contribution-repo">
          Repository: <span className="font-bold">{contribution.repository}</span>
        </p>

        <div className="flex space-x-4 mt-2">
          <Link
            href={contribution.pullRequestLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm font-mono transition-colors tracking-wide hover:opacity-80 font-bold"
            style={{ color: "var(--foreground)" }}
          >
            <HiOutlineExternalLink className="w-4 h-4" style={{ strokeWidth: "2.5" }} />
            <span>PULL REQUEST</span>
          </Link>
          <Link
            href={`https://github.com/${contribution.repository}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm font-mono transition-colors tracking-wide hover:opacity-80 font-bold"
            style={{ color: "var(--foreground)" }}
          >
            <FiGithub className="w-4 h-4" style={{ strokeWidth: "2.5" }} />
            <span>REPO</span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}


export function OpenSourceContributions() {
  return (
    <section id="contributions" className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="OPEN-SOURCE CONTRIBUTIONS" color="#0EA5E9" />

        <div className={`grid gap-6 mt-8 ${contributions.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
          {contributions.map((contribution, index) => (
            <ContributionCard key={index} contribution={contribution} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
