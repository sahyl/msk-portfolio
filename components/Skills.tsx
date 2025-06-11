"use client"

import { motion } from "framer-motion"
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPython,
} from "react-icons/si"
import { useTheme } from "./Theme-provider"

const skillsWithIcons = [
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "NextJS", icon: SiNextdotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Express", icon: SiExpress },
  { name: "ReactJS", icon: SiReact },
  { name: "NodeJS", icon: SiNodedotjs },
  { name: "TailwindCSS", icon: SiTailwindcss },
  { name: "Postgres", icon: SiPostgresql },
  { name: "Git", icon: SiGit },
  { name: "Github", icon: SiGithub },
  { name: "Python", icon: SiPython },
]

export function Skills() {
  const { theme } = useTheme()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  }

  // Determine icon color based on theme
  const iconColor = theme === "dark" ? "#ffffff" : "#000000"

  return (
    <section id="skills" className="py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading">Skills</h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {skillsWithIcons.map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <motion.div
                key={index}
                variants={item}
                className="glass-effect rounded-full px-4 py-2 font-mono text-sm flex items-center gap-2 skill-item transition-all duration-300"
                style={{
                  color: "var(--card-foreground)",
                  letterSpacing: "0.05em",
                  fontWeight: "600",
                }}
              >
                <IconComponent className="w-4 h-4" style={{ color: iconColor }} />
                <span className="">{skill.name}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
