const skills = [
  'Python', 'C++', 'SQL', 'JavaScript', 'MongoDB', 'TypeScript',
  'Numpy', 'Pandas', 'Streamlit', 'Seaborn', 'Scikit-learn', 'Tensorflow',
  'ReactJS', 'PowerBI', 'BeautifulSoup', 'Selenium', 'MySQL', 'NodeJS',
  'Git', 'Github', 'Postman API', 'Kaggle', 'Thunder Client',
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl mb-12 text-center font-roboto">SKILLS</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`skill-item bg-gray-100 rounded-full px-4 py-2 font-roboto text-sm`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
