import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";


const projects = [
  {
    title: "DocsSphere",
    description:
      "A document collaboration tool with Clerk authentication, Liveblocks for real-time editing, and Sentry for monitoring.",
    liveLink: "https://docssphere.vercel.app/sign-in",
    githubLink: "https://github.com/sahyl/DocSphere",
    techStack:
      "Next.js, TypeScript, Clerk, Liveblocks, Sentry, Vercel, Shadcn",
  },
  {
    title: "CarePulse",
    description:
      "A healthcare management platform with appointment scheduling and Twilio notifications.",
    liveLink: "https://carepoint-carepulse.vercel.app/",
    githubLink: "https://github.com/sahyl/Carepoint",
    techStack: "Next.js, TypeScript, Appwrite, Zod, Twilio, Shadcn, Vercel",
  },
  {
    title: "OpenVoice",
    description:
      "An anonymous Q&A platform with AI-powered question suggestions using Google Gemini AI.",
    liveLink: "https://opevoice.vercel.app/",
    githubLink: "https://github.com/sahyl/OpenVoice",
    techStack:
      "TypeScript, Next.js, Vercel, NextAuth, Resend, Zod, Bcrypt, MongoDB, Google Gemini AI, Shadcn",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-4xl font-bold mb-12 text-center">PROJECTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}


interface Project {
  title: string;
  description: string;
  liveLink: string;
  githubLink: string;
  techStack: string;
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md project-card"
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="mb-4 text-sm">{project.description}</p>
      <p className="mb-4 text-xs text-gray-600">{project.techStack}</p>
      <div className="flex space-x-4">
        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
          <HiOutlineExternalLink className="w-6 h-6 hover:text-gray-600 transition-colors" />
        </Link>
        <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
          <FiGithub className="w-6 h-6 hover:text-gray-600 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
