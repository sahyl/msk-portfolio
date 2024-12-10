import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Skills />
      <Projects />
      <Education />
      <Footer/>
    </main>
  )
}

