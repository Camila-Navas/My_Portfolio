"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "@/src/config/projects-data";

interface ProjectsStackProps {
  projects: Project[];
}

export function ProjectsStack({ projects }: ProjectsStackProps) {
  if (projects.length === 0) return null;

  return (
    <div className="hidden lg:block max-w-5xl mx-auto mb-24">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary">
          <span className="block w-8 h-px bg-primary" />
          Featured stack
          <span className="block w-8 h-px bg-primary" />
        </span>
        <p className="text-sm text-muted-foreground mt-2">
          Scrollea para apilar los proyectos destacados.
        </p>
      </div>
      <div className="relative">
        {projects.map((project, i) => (
          <StackCard
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
          />
        ))}
      </div>
    </div>
  );
}

interface StackCardProps {
  project: Project;
  index: number;
  total: number;
}

function StackCard({ project, index, total }: StackCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isLast = index === total - 1;
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, isLast ? 1 : 0.94]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.7, 1],
    [1, isLast ? 1 : 0.65]
  );

  const topOffset = 96 + index * 28;

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${topOffset}px`, marginBottom: "18vh" }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="relative grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border/60 bg-card shadow-2xl shadow-primary/5"
      >
        <div className="relative aspect-[4/3] md:aspect-auto bg-muted overflow-hidden">
          <Image
            src={project.cardImage}
            alt={`Portada del proyecto ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute top-5 left-5 inline-flex items-center text-[11px] uppercase tracking-widest font-semibold text-white/90 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
            {project.category}
          </span>
        </div>

        <div className="p-8 md:p-10 flex flex-col justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {`0${index + 1}`.slice(-2)} / {`0${total}`.slice(-2)}
            </span>
            <h3 className="font-display italic text-3xl md:text-4xl font-medium text-foreground mt-3 mb-4 leading-tight">
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed line-clamp-4">
              {project.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            href={`/proyectos/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all w-fit"
          >
            Ver proyecto
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
