"use client";

import { motion } from "framer-motion";
import {
  SiTypescript, SiPython, SiNodedotjs, SiExpress, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiZod, SiReact, SiNextdotjs, SiGit,
  SiDocker, SiGooglegemini, SiScikitlearn, SiPydantic,
} from "react-icons/si";
import { SectionHeading } from "./SectionHeading";

const skills = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: SiPython },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "GraphQL", icon: SiGraphql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redis", icon: SiRedis },
  { name: "Zod", icon: SiZod },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Git", icon: SiGit },
  { name: "Docker", icon: SiDocker },
  { name: "Gemini API", icon: SiGooglegemini },
  { name: "scikit-learn", icon: SiScikitlearn },
  { name: "Pydantic", icon: SiPydantic },
];

export function Skills() {
  return (
    <section id="skills" className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="TECHNICAL SKILLS" color="#00ffa0" />
        <ul className="flex flex-wrap justify-center gap-3 mt-8" aria-label="Technical skills">
          {skills.map(({ name, icon: Icon }) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-full px-4 py-2 font-mono text-sm flex items-center gap-2 skill-item"
              style={{ color: "var(--card-foreground)", letterSpacing: "0.05em", fontWeight: 600 }}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{name}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
