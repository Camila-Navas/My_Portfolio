"use client";

import { motion } from "framer-motion";
import { FileCheck } from "lucide-react";
import { fadeInUp } from "./animations";

interface ExperienceContentProps {
  shortDescription: string;
  fullDescription: string;
  certificateImage?: string;
  title: string;
}

export const ExperienceContent = ({ shortDescription, fullDescription, certificateImage, title }: ExperienceContentProps) => {
  return (
    <div className="space-y-12">
      {/* Short Description */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        // CAMBIO: Texto gris claro en modo noche
        className="text-xl leading-relaxed text-foreground/90 dark:text-gray-300 font-medium"
      >
        {shortDescription}
      </motion.section>

      {/* Certificado (Imagen Principal) */}
      {certificateImage && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          // CAMBIO: Borde oscuro en noche
          className="relative group rounded-2xl overflow-hidden border border-border dark:border-zinc-800 shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6" />
          <img
            src={certificateImage}
            alt={`Certificado ${title}`}
            className="w-full h-auto object-cover"
          />
        </motion.section>
      )}

      {/* Descripción Completa con Viñetas */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {/* Título: Negro en día, Blanco en noche */}
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <FileCheck className="text-cyan-600 dark:text-cyan-400" /> Detalles y Logros
        </h3>

        {/* Lista: Texto gris medio en día, gris claro en noche */}
        <ul className="list-disc list-outside pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
          {fullDescription
            .split('\n')
            .filter((line) => line.trim() !== '')
            .map((line, i) => {
              const cleanLine = line.trim().startsWith('-')
                ? line.trim().substring(1).trim()
                : line.trim();

              const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

              return (
                <li key={i} className="pl-2">
                  {parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        // Negritas: Resaltadas en blanco para modo noche
                        <strong key={j} className="font-semibold text-gray-900 dark:text-white">
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    return part;
                  })}
                </li>
              );
            })}
        </ul>
      </motion.section>
    </div>
  );
};