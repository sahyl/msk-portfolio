export const education = [
  {
    degree: "B.Tech, Computer Science Engineering",
    institution: "Allenhouse Institute of Technology, Rooma, Kanpur",
    period: "Jul 2019 - Jul 2023",
  },
  {
    degree: "High School",
    institution:
      "International Indian School, Dammam, Kingdom of Saudi Arabia",
    period: "Mar 2018 - Mar 2019",
  },
  {
    degree: "Secondary School",
    institution:
      "International Indian School, Dammam, Kingdom of Saudi Arabia",
    period: "Mar 2016 - Mar 2017",
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl mb-12 text-center font-roboto"><b>EDUCATION</b></h2>
      <div className="space-y-8">
        {education.map((edu, index) => (
          <div
            key={index}
            className="border-l-2 border-black pl-4 edu-item"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <h3 className="text-xl font-roboto">{edu.degree}</h3>
            <p className="font-roboto">{edu.institution}</p>
            <p className="text-sm text-gray-600 font-roboto">{edu.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
