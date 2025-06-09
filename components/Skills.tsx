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
  return (
    <section id="skills" className="dark py-8 px-4 sm:px-6 print:px-2 print:py-4">
      <h2 className="text-3xl mb-6 text-center font-dm-serif-text print:text-2xl">SKILLS</h2>
      <div className="flex flex-wrap justify-center gap-3 print:gap-1">
        {skillsWithIcons.map((skill, index) => {
          const IconComponent = skill.icon
          return (
            <div
              key={index}
              className="skill-item bg-gray-100 rounded-full px-4 py-2 font-roboto text-sm print:text-[10px] print:px-2 print:py-0.5 print:!opacity-100 print:!transform-none flex items-center gap-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <IconComponent className="w-4 h-4 print:w-2 print:h-2" />
              <span>{skill.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
