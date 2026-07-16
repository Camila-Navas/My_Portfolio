"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { GitHubStats } from "./GitHubStats";
import { GitHubHeatmap } from "./GitHubHeatmap";

export default function GitHubSection() {
  return (
    <section
      id="github"
      className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-800 text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-4">
            <Github size={14} />
            Actividad en vivo
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Mis estadisticas de GitHub
          </h2>
          <p className="text-gray-600 dark:text-zinc-400">
            Datos en tiempo real consumidos directamente desde la API publica
            de GitHub. Se actualizan automaticamente cada hora.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <GitHubStats />
          <GitHubHeatmap />
        </div>
      </div>
    </section>
  );
}
