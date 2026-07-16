"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp } from "./animations";

interface ProjectFeaturesProps {
  features?: string[];
}

export const ProjectFeatures = ({ features }: ProjectFeaturesProps) => {
  if (!features || features.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      {/* Título adaptable */}
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
        {/* Icono Título: Fondo verde claro (día) / Verde oscuro translúcido (noche) */}
        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
          <CheckCircle2 size={20} />
        </div>
        Key Features
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div
            key={i}
            // Card adaptable: Fondo blanco/zinc-900, Borde gris/zinc-800
            className="flex items-start gap-3 p-4 rounded-xl 
            bg-white dark:bg-zinc-900 
            border border-gray-200 dark:border-zinc-800 
            shadow-sm hover:border-cyan-200 dark:hover:border-cyan-500/50 
            transition-all"
          >
            {/* Check Icon: Fondo morado claro (día) / Morado oscuro (noche) */}
            <div className="mt-1 p-1 bg-cyan-50 dark:bg-cyan-900/20 rounded-full text-cyan-600 dark:text-cyan-400 shrink-0">
              <CheckCircle2 size={14} />
            </div>
            
            {/* Texto Feature: Gris oscuro (día) / Gris claro (noche) */}
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-snug">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};