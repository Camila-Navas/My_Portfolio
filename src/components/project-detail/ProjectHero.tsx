"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "./animations";

interface ProjectHeroProps {
  project: {
    slug: string;
    category: string;
    date: string;
    title: string;
    shortDescription: string;
    mainImage: string;
  };
}

export const ProjectHero = ({ project }: ProjectHeroProps) => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <motion.div variants={fadeInUp} className="flex justify-center gap-3 mb-6">
          
          {/* Badge Categoría: Adaptable a Dark Mode */}
          <Badge 
            variant="outline" 
            className="px-3 py-1 text-sm border-cyan-200 bg-cyan-50 text-cyan-700 shadow-sm dark:border-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
          >
            {project.category}
          </Badge>

          {/* Badge Fecha: Adaptable a Dark Mode */}
          <Badge 
            variant="outline" 
            className="px-3 py-1 text-sm text-gray-500 border-gray-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-400"
          >
            {project.date}
          </Badge>
        </motion.div>

        {/* Título: Negro en día, Blanco en noche */}
        <motion.h1
          variants={fadeInUp}
          style={{ viewTransitionName: `project-title-${project.slug}` }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight pb-2"
        >
          {project.title}
        </motion.h1>

        {/* Descripción: Gris medio en día, Gris claro en noche */}
        <motion.p 
          variants={fadeInUp} 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          {project.shortDescription}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mb-24 group max-w-6xl mx-auto"
      >
        {/* Contenedor Imagen: Borde y fondo oscuros en modo noche */}
        <div
          className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-2xl bg-gray-50 dark:bg-zinc-900"
          style={{ viewTransitionName: `project-image-${project.slug}` }}
        >
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </motion.div>
    </>
  );
};