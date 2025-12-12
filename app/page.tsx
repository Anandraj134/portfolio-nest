import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Certifications from "@/components/Certifications";

export default function Home() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-between"
    >
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Timeline />
      <Contact />
    </main>
  );
}
