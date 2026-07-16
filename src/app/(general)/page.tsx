
import About from "../../components/section/About";
import Contact from "../../components/section/Contact";
import Experience from "../../components/section/Experience";
import GitHubSection from "../../components/section/GitHubSection";
import Hero from "../../components/section/Hero";
import Projects from "../../components/projects/Projects";
import Skills from "../../components/section/Skills";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">

      {/* 1. PORTADA (Impacto Visual) */}
      <Hero />

      {/* 2. INTRODUCCIÓN (Quién eres y métricas) */}
      <About />

      {/* 3. HABILIDADES (Tu Stack Técnico) */}
      <Skills />

      {/* 4. ACTIVIDAD EN GITHUB (Prueba social en vivo) */}
      <GitHubSection />

      {/* 5. PROYECTOS (Tu evidencia de trabajo) */}
      <Projects />

      {/* 6. TRAYECTORIA (Tu historia profesional y académica) */}
      <Experience />

      {/* 7. CIERRE (Llamado a la acción) */}
      <Contact />

    </main>
  );
}
