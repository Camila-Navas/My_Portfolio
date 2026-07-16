"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { containerVariants, itemVariants } from "@/src/config/hero-data";
import { ABOUT_DATA } from "@/src/config/about-data";
import { NumberCounter } from "./NumberCounter";

const FORMATION_START_YEAR = 2024;

export default function About() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yearsOfFormation = Math.max(
    1,
    new Date().getFullYear() - FORMATION_START_YEAR
  );
  const totalSkills = ABOUT_DATA.timeline.length;

  return (
    <section 
      id="sobre-mi" 
      // CAMBIO 1: Fondo adaptable (Blanco en día, Negro Zinc en noche)
      className="py-24 relative overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* Fondo sutil (Grid cambia de color en dark mode) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          
          {/* --- COLUMNA IZQUIERDA: Timeline Narrativo --- */}
          <div className="space-y-10" ref={targetRef}>
            
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
                {ABOUT_DATA.title}
              </h2>
              {/* Subtítulo Morado (Visible en ambos modos) */}
              <p className="text-xl font-semibold text-cyan-700 dark:text-cyan-400">
                {ABOUT_DATA.subtitle}
              </p>
            </motion.div>

            {/* Timeline Vertical Animado */}
            <div className="relative pl-8 md:pl-10 space-y-12">
              
              {/* Línea Guía Gris (Adaptable) */}
              <div className="absolute left-[9px] top-2 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-800" />
              
              {/* Línea de Color Animada */}
              <motion.div 
                style={{ height: lineHeight }}
                className="absolute left-[9px] top-2 w-[2px] bg-cyan-600 dark:bg-cyan-500 origin-top"
              />

              {ABOUT_DATA.timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Icono Flotante */}
                  <div className="absolute -left-[49px] md:-left-[51px] top-0 bg-white dark:bg-zinc-950 p-1.5 rounded-full border border-gray-300 dark:border-gray-700 z-10 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/20 transition-all duration-300">
                      <item.icon size={16} />
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Terminal (Ya era oscuro, pero aseguramos bordes) */}
            <motion.div
              variants={itemVariants}
              className="mt-8 rounded-xl overflow-hidden border border-gray-800 bg-[#1a1b26] shadow-2xl"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1b26] border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-gray-400 font-mono">bash — developer</span>
              </div>
              
              <div className="p-5 font-mono text-sm md:text-base space-y-3">
                <div className="flex gap-2 text-green-400">
                  <span>➜</span>
                  <span className="text-blue-400">~</span>
                  <span>{ABOUT_DATA.conclusion.cmd}</span>
                </div>
                <div className="text-gray-300 leading-relaxed pl-4 border-l-2 border-cyan-500/50">
                  {`"${ABOUT_DATA.conclusion.output}"`}
                </div>
              </div>
            </motion.div>

          </div>

          {/* --- V32: COLUMNA DERECHA STICKY --- */}
          <div className="lg:sticky lg:top-28 space-y-5">

            {/* Panel destacado con NumberCounter (V22) */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-primary/5 p-7 shadow-sm glow-border"
            >
              <div
                className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(var(--primary-rgb), 0.35), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] uppercase tracking-widest font-semibold">
                  <Sparkles size={12} />
                  En Formacion Activa
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <NumberCounter
                      value={yearsOfFormation}
                      duration={1.4}
                      className="font-display italic text-7xl text-primary leading-none"
                    />
                    <span className="text-xl font-medium text-muted-foreground">
                      {yearsOfFormation === 1 ? "ano" : "anos"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    construyendo experiencia tecnica desde
                    <span className="text-foreground font-semibold">
                      {" "}
                      {FORMATION_START_YEAR}
                    </span>
                    , con foco en calidad, soporte y desarrollo de software.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      <NumberCounter value={totalSkills} duration={1.2} />+
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Hitos clave
                    </div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      <NumberCounter value={6} duration={1.2} />
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Areas tecnicas
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats grid compactos */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {ABOUT_DATA.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group relative p-5 rounded-2xl bg-card border border-border/60 transition-all duration-300 overflow-hidden glow-border"
                >
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="p-2.5 w-fit rounded-xl bg-secondary border border-border/50 text-foreground/70 group-hover:text-primary group-hover:border-primary/30 transition-colors duration-300">
                      <stat.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold tracking-tight text-foreground leading-tight">
                        {stat.value}
                      </h4>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
