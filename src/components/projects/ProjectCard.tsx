"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { ExternalLink, Github, FolderGit2, ArrowRight, AlertTriangle, Rocket } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cardVariants } from "@/src/config/skills-data";
import { Project } from "@/src/config/projects-data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col h-full glow-border"
    >
      {/* V19: Spotlight radial siguiendo al cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1] rounded-2xl"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--primary-rgb), 0.12),
              transparent 70%
            )
          `,
        }}
        aria-hidden="true"
      />
      {/* 1. CARD IMAGE */}
      <Link
        href={`/proyectos/${project.slug}`}
        className="relative z-10 block cursor-pointer overflow-hidden group/image h-52 w-full bg-muted"
        aria-label={`Ver detalles del proyecto ${project.title}`}
        style={{ viewTransitionName: `project-image-${project.slug}` }}
      >
          {/* Next/Image para optimización */}
          <Image
            src={project.cardImage}
            alt={`Portada del proyecto ${project.title}`}
            fill
            className="object-cover opacity-90 transition-transform duration-700 group-hover/image:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none opacity-80" />

          {/* Icono Decorativo */}
          <FolderGit2 className="absolute bottom-4 right-4 text-white/10 w-24 h-24 rotate-12 transform translate-y-8 translate-x-8 group-hover/image:translate-y-4 group-hover/image:translate-x-4 transition-transform duration-500 z-10" />

          {/* Badge de Categoría */}
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 border border-border/50">
            {project.category}
          </div>
      </Link>

      {/* 2. CONTENIDO */}
      <div className="relative z-10 p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <Link href={`/proyectos/${project.slug}`} className="block group/title flex-1 mr-2">
            <h3
              className="text-xl font-bold text-foreground group-hover/title:text-primary transition-colors flex items-center gap-2 line-clamp-1"
              style={{ viewTransitionName: `project-title-${project.slug}` }}
            >
              {project.title}
              <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300 text-primary" />
            </h3>
          </Link>

          {/* Links Externos */}
          <div className="flex gap-1 shrink-0">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground hover:bg-secondary p-2 rounded-md transition-all"
                title="Ver Código en GitHub"
                aria-label="Ver Código en GitHub"
              >
                <Github size={18} />
              </a>
            )}
            
            {project.links.demo && (
              project.demoNote ? (
                /* Alerta si hay nota */
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-2 rounded-md transition-all"
                      title="Ver Demo en vivo"
                      aria-label="Ver Demo en vivo"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-md border-yellow-500/20">
                    <AlertDialogHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-500/10 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                        </div>
                        <AlertDialogTitle>Aviso de Infraestructura</AlertDialogTitle>
                      </div>
                      <AlertDialogDescription className="text-base leading-relaxed">
                        {project.demoNote}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction asChild className="bg-primary hover:bg-primary/90">
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Rocket size={16} /> Ir al Demo
                        </a>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                /* Link directo si no hay nota */
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-2 rounded-md transition-all"
                  title="Ver Demo en vivo"
                  aria-label="Ver Demo en vivo"
                >
                  <ExternalLink size={18} />
                </a>
              )
            )}
          </div>
        </div>

        <p className="text-muted-foreground line-clamp-3 mb-6 text-sm leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tags de Tecnologías */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-border/40">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
             <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md text-muted-foreground bg-transparent border border-dashed border-border/50">
               +{project.technologies.length - 4}
             </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}