const skills = [
   'JavaScript', 'TypeScript','NextJS','MongoDB','Express','ReactJS', 'NodeJS',
   'TailwindCss','Postgres','Git', 'Github','Python', 
];

export function Skills() {
  return (
    <section id="skills" className="dark py-8 px-4 sm:px-6 print:px-2 print:py-4">
      <h2 className="text-3xl mb-6 text-center font-dm-serif-text print:text-2xl">SKILLS</h2>
      <div className="flex flex-wrap justify-center gap-2 print:gap-1">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-item bg-gray-100 rounded-full px-3 py-1 font-roboto text-xs print:text-[10px] print:px-2 print:py-0.5 print:!opacity-100 print:!transform-none"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

