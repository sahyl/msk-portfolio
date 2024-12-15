import React, { useState } from 'react';
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  liveLink: string;
  githubLink: string;
  techStack: string;
}

const projects: Project[] = [
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
  {
    title: "YCD", 
    description:
      "YCD is a comprehensive directory designed for entrepreneurs to showcase their startups, facilitating collaboration with potential investors and providing global visibility for innovative ideas.",
    liveLink: "https://ycd.vercel.app/",
    githubLink: "https://github.com/sahyl/YCDirectory",
    techStack:
      "Next.js, TypeScript, NextAuth, Sanity, Vercel, Shadcn", 
  },
  {
    title: "Sync", 
    description:
      "SYNC is a Next.js-based video conferencing platform inspired by Zoom.",
    liveLink: "https://sync-videocall.vercel.app/sign-in",
    githubLink: "https://github.com/sahyl/sync",
    techStack: "Next.js, TypeScript, Clerk, Zod, StreamIO, Shadcn, Vercel", 
  },
  {
    title: "StoreIt", 
    description:
      "StoreIt is a modern file storage and management application built with Next.js and a variety of powerful React libraries.",
    liveLink: "https://storeit-storage-solutions.vercel.app/",
    githubLink: "https://github.com/sahyl/storeit", 
    techStack:
      "TypeScript, Next.js, Vercel, NextAuth, Zod, Appwrite, ReCharts, Shadcn", 
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md project-card h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="mb-4 text-sm">{project.description}</p>
        <p className="mb-4 text-xs text-gray-600">{project.techStack}</p>
      </div>
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

export function Projects() {
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;
  const pageCount = Math.ceil(projects.length / projectsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1));
  };

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-4xl font-bold mb-12 text-center">PROJECTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {currentProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`p-2 rounded-full ${
            currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
          }`}
        >
          <FaChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === pageCount - 1}
          className={`p-2 rounded-full ${
            currentPage === pageCount - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
          }`}
        >
          <FaChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}

