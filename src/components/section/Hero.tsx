"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ChevronDown, Linkedin, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { containerVariants, HERO_CONTENT, itemVariants } from "@/src/config/hero-data";
import { ProfileImage } from "./ProfileImage";
import { Typewriter } from "./Typewriter";
import { InteractiveGrid } from "./InteractiveGrid";

export default function Hero() {
  const [isCopied, setIsCopied] = useState(false);

  const scrollToProjects = () => {
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(HERO_CONTENT.social.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section
      id="inicio"
      // CAMBIO 1: Soporte Dark Mode en el fondo principal
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 pt-20 pb-10 transition-colors duration-300"
    >
      {/* --- V02: GRADIENT MESH ANIMADO --- */}
      <div className="gradient-mesh" aria-hidden="true" />

      {/* V42: Grid interactivo que reacciona al cursor */}
      <InteractiveGrid cellSize={28} glowRadius={220} />

      {/* Halo central sutil */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-3xl opacity-40 dark:opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--primary-rgb), 0.18), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* COLUMNA 1: TEXTO */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* --- BADGE COPIABLE --- */}
            <motion.div
              variants={itemVariants}
              className="mb-6 cursor-pointer group"
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 ${isCopied
                  ? "border-green-300/60 bg-green-50/60 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/60"
                  : "border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                } text-xs font-medium`}>
                {!isCopied && <span className="dot-pulse" aria-hidden="true" />}
                {isCopied ? "Email Copiado" : HERO_CONTENT.badge}
                {isCopied ? <Check size={12} /> : <Copy size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />}
              </span>
            </motion.div>

            {/* --- V01: TIPOGRAFIA DISPLAY EN EL TITULO --- */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(2.5rem,7vw,5.25rem)] leading-[0.95] tracking-tight text-foreground mb-6 font-bold"
            >
              <span className="block text-muted-foreground text-[0.4em] font-semibold tracking-widest uppercase mb-3">
                Hola, soy
              </span>
              <span className="font-display italic text-[1.05em] block bg-gradient-to-br from-primary via-primary to-accent-foreground bg-clip-text text-transparent">
                {HERO_CONTENT.name}
              </span>
              <span className="block text-foreground/85 text-[0.45em] sm:text-[0.4em] mt-4 font-medium tracking-tight">
                <Typewriter
                  words={HERO_CONTENT.roles}
                  className="inline-flex items-baseline text-primary"
                  cursorClassName="inline-block w-[2px] h-[0.9em] align-[-0.1em] ml-1 bg-primary animate-pulse"
                />
              </span>
            </motion.h1>

            {/* --- DESCRIPCIÓN --- */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed"
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* BOTONES */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              {/* --- BOTÓN VER PROYECTOS --- */}
              <Button
                size="lg"
                // CAMBIO 5: Inversión de colores inteligente
                // Día: Negro fondo / Blanco texto
                // Noche: Blanco fondo / Negro texto (para resaltar)
                className="w-full sm:w-auto font-semibold bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-md transition-all rounded-lg h-12 px-8"
                onClick={scrollToProjects}
              >
                <span className="flex items-center">
                  Ver Proyectos <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>

              {/* --- ICONOS SOCIALES --- */}
              <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <SocialButton href="#contacto" icon={<Mail className="h-5 w-5" />} label="Email" />
                <SocialButton href={HERO_CONTENT.social.linkedin} icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
              </div>
            </motion.div>
          </div>

          {/* COLUMNA 2: IMAGEN */}
          <div className="flex justify-center order-1 lg:order-2">
            <ProfileImage />
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        onClick={scrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const isInternal = href.startsWith("#");

  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
      {/* CAMBIO 6: Botones sociales adaptables */}
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-11 w-11 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
        asChild
      >
        <a
          href={href}
          target={isInternal ? "_self" : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          aria-label={label}
          onClick={(e) => {
            if (isInternal) {
              e.preventDefault();
              const element = document.querySelector(href);
              element?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {icon}
        </a>
      </Button>
    </motion.div>
  );
}