"use client";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/src/config/contact-data";
import { ArrowUp, Heart } from "lucide-react";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#sobre-mi", label: "Sobre mí" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // CAMBIO CLAVE: Diseño oscuro forzado (siempre se ve técnico y elegante)
    <footer className="bg-[#0a0a0a] text-zinc-400 pt-16 pb-8 border-t border-white/10 relative overflow-hidden">

      {/* --- 1. FONDO TÉCNICO --- */}
      {/* Grid pattern sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Luz ambiental (Glow morado/azul) */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-30" />
      
      {/* Línea de luz superior (Efecto Neon) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* 1. BRAND & MISION */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            
            {/* LOGO */}
            <a href="#inicio" className="flex items-center gap-2 group w-fit">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                 <span className="font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-100">
                DevCamila
              </span>
            </a>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Construyendo experiencias digitales que combinan diseño elegante con arquitectura de software robusta. Enfocado en escalabilidad, rendimiento y accesibilidad.
            </p>
          </div>

          {/* 2. ENLACES RÁPIDOS */}
          <div>
            <h4 className="font-semibold mb-6 text-zinc-100">Navegación</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-primary hover:translate-x-1 transition-all inline-flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. SOCIAL */}
          <div>
            <h4 className="font-semibold mb-6 text-zinc-100">Conecta</h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label || link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:border-primary hover:text-primary hover:bg-white/10 hover:shadow-lg hover:shadow-primary/20"
                  aria-label={link.label || link.name}
                >
                  <link.icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- BARRA INFERIOR --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            
            <p className="text-xs text-zinc-600 flex items-center gap-1">
                © {currentYear} DevCamila. Hecho con <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" /> y Next.js
            </p>

            {/* Botón Scroll Top */}
            <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-zinc-500 hover:text-zinc-100 hover:bg-white/5"
            >
                Subir <ArrowUp className="ml-2 h-3 w-3" />
            </Button>
        </div>

      </div>
    </footer>
  );
}