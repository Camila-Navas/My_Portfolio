"use client";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { fadeInUp } from "./animations";

export const ProjectDescription = ({ fullDescription }: { fullDescription: string }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      {/* Título adaptable: borde oscuro y texto blanco en noche */}
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 pb-2 text-gray-900 dark:text-white">
        {/* Icono adaptable: fondo oscuro translúcido en noche */}
        <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-cyan-600 dark:text-cyan-400">
          <Layers size={20} />
        </div>
        Sobre el Proyecto
      </h3>

      {/* Lista adaptable: texto gris claro en noche */}
      <ul className="list-disc list-outside pl-6 space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed md:text-lg">
        {fullDescription
          .split('\n')
          .filter((line) => line.trim() !== '')
          .map((line, i) => {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
              <li key={i} className="pl-2">
                {parts.map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    // Negritas adaptables: blanco en noche
                    return <strong key={j} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
                  }
                  return part;
                })}
              </li>
            );
          })}
      </ul>
    </motion.section>
  );
};