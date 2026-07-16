"use client";

import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../modeToggle/mode-toggle";
// 1. IMPORTAR EL TOGGLE


const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#experiencia", label: "Experiencia" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lógica de scroll simple
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div
        className={`relative flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "w-[95%] md:w-[85%] lg:w-[70%] rounded-full px-6 py-2 shadow-md backdrop-blur-md border" 
            // 2. COLORES ADAPTATIVOS: Blanco en día, Negro translúcido en noche
            + " bg-white/90 dark:bg-black/80 border-gray-200 dark:border-gray-800"
            : "w-full container px-4 md:px-6 bg-transparent"
        }`}
      >

        {/* LOGO */}
        <a href="#inicio" className="flex items-center gap-2 group z-10">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white shadow-sm dark:bg-white dark:text-black transition-colors">
            <span className="font-bold text-sm">D</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
            Dev<span className="text-gray-600 dark:text-gray-400">Camila</span>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:block relative z-10">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ACCIONES */}
        <div className="flex items-center gap-3 z-10">

          {/* Botón CV */}
          <a
            href="/cv-camila.pdf"
            download="Camila_Vesga_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex"
          >
            <Button 
              variant="outline" 
              size="sm" 
              // Borde gris en día, borde oscuro en noche. Texto adaptable.
              className="rounded-full gap-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
            >
              <FileDown size={16} /> 
              <span className="hidden lg:inline">CV</span>
            </Button>
          </a>

          {/* Botón Hablemos: Negro en día, Blanco en noche para resaltar */}
          <a href="#contacto" className="hidden sm:flex">
            <Button 
              size="sm" 
              className="rounded-full font-semibold bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-sm border-0"
            >
              Hablemos
            </Button>
          </a>

          {/* 3. AQUI AGREGAMOS EL BOTÓN DE MODO OSCURO */}
          <ModeToggle />

          {/* Botón Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            // Fondo blanco en día, negro en noche
            className="absolute top-full left-0 right-0 mx-4 mt-2 p-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl md:hidden flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 text-gray-700 dark:text-gray-200 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            {/* Agrego el botón CV aquí también para móviles si quieres */}
            <a
                href="/cv-camila.pdf"
                download="Camila_Vesga_CV.pdf"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 text-gray-700 dark:text-gray-200 font-medium transition-colors border-t border-gray-100 dark:border-gray-800 mt-2"
              >
                Descargar CV <FileDown size={16}/>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}