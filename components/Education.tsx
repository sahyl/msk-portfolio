"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "./SectionHeading"
import { cn } from "@/lib/utils"

const education = [
  {
    degree: "B.Tech, Computer Science Engineering",
    institution: "Allenhouse Institute of Technology, Rooma, Kanpur",
    period: "Jul 2019 - Jul 2023",
  },
  {
    degree: "High School",
    institution: "International Indian School, Dammam, Kingdom of Saudi Arabia",
    period: "Mar 2018 - Mar 2019",
  },
  {
    degree: "Secondary School",
    institution: "International Indian School, Dammam, Kingdom of Saudi Arabia",
    period: "Mar 2016 - Mar 2017",
  },
]

export function Education() {
  return (
    <section id="education" className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="EDUCATION" color="#EF4444" />

        <div className="mt-8 relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px ml-3 md:ml-4"
            style={{ backgroundColor: `var(--primary)`, opacity: 0.3 }}
          ></div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="pl-10 md:pl-12 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-2 w-6 h-6 rounded-full ml-0.5 md:ml-1.5 z-10 border-2"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: `var(--primary)`,
                  }}
                ></div>

                <div
                  className="p-5 rounded-2xl education-card-hover relative overflow-hidden border-2"
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
                    <h3
                      className="text-lg mb-1 education-text"
                      style={{
                        color: "var(--primary)",
                        fontFamily: "var(--font-dm-serif-text)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <p className="font-mono text-sm mb-1 tracking-wide education-institution">{edu.institution}</p>
                    <p
                      className="text-xs font-mono tracking-wider text-bold"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {edu.period}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
