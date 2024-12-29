export const education = [
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
];

export function Education() {
  return (
    <section id="education" className="py-8 px-4 sm:px-6 print:px-0">
      <h2 className="text-3xl mb-6 text-center font-dm-serif-text"><b>EDUCATION</b></h2>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className="border-l-2 border-black pl-4 edu-item print:!opacity-100 print:!transform-none"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <h3 className="text-lg font-dm-serif-text">{edu.degree}</h3>
            <p className="font-roboto text-sm">{edu.institution}</p>
            <p className="text-xs text-gray-600 font-roboto">{edu.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

