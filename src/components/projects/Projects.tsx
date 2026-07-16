"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/src/config/projects-data";
import { ProjectCard } from "./ProjectCard";
import { ProjectsStack } from "./ProjectsStack";

const ALL = "Todos";

export default function Projects() {
  const categories = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => set.add(p.category));
    return [ALL, ...Array.from(set)];
  }, []);

  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(() => {
    if (active === ALL) return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <section id="proyectos" className="py-24 bg-background relative overflow-hidden">

      {/* --- FONDO PERSONALIZADO --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">

        {/* Header de Sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Proyectos Destacados
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones reales que demuestran arquitectura sólida, código limpio y visión de producto.
          </p>
        </motion.div>

        {/* V30: Stack view tipo Apple para los primeros 3 proyectos */}
        <ProjectsStack projects={PROJECTS.slice(0, 3)} />

        {/* Filtros por categoría (V31) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Filtrar proyectos por categoría"
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  isActive
                    ? "text-primary-foreground border-transparent"
                    : "text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="projects-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid de Proyectos */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">
            No hay proyectos en esta categoría todavía.
          </p>
        )}

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 max-w-2xl mx-auto shadow-sm">
            <p className="text-gray-900 font-bold mb-4 text-lg">
              ¿Te interesa ver cómo escribo código?
            </p>
            <p className="text-gray-600 mb-6 text-sm">
              Explora mis repositorios para ver mis proyectos personales.
            </p>

            {/* CAMBIO CLAVE: Botón con colores explícitos (Negro sólido) */}
            <Button
              size="lg"
              className="gap-2 group shadow-md bg-black text-white hover:bg-gray-800 transition-all border-0"
              asChild
            >
              <a href="https://github.com/13camilaaaaa" target="_blank" rel="noreferrer">
                <Github className="w-4 h-4" />
                Explorar GitHub
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}