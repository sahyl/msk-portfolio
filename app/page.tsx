import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className=" dark min-h-screen flex items-center justify-center bg-white-100 p-4 print:p-0 print:bg-white">
      <main className="w-[210mm] min-h-[297mm] bg-white shadow-lg print:shadow-none overflow-hidden">
        <div className="p-8 print:p-0">
          <Hero />
          <Skills />
          <Projects />
          <Education />
          <Footer />
        </div>
      </main>
    </div>
  )
}

