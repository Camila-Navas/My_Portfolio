"use client";

import { Variants } from "framer-motion";
import { Code2, Cpu, BookOpen, ShieldCheck, Headset } from "lucide-react";

export const ABOUT_DATA = {
    title: "Trayectoria Profesional",
    subtitle: "De la Lógica al Producto Escalable",
    timeline: [
        {
            id: 1,
            title: "Formación en Software (SENA + UNAD)",
            description: "Tecnóloga en Análisis y Desarrollo de Software (SENA) y estudiante de Ingeniería de Sistemas (UNAD). Base sólida en programación, bases de datos y buenas prácticas de desarrollo.",
            icon: BookOpen,
        },
        {
            id: 2,
            title: "Trayectoria en ODIR Certificaciones",
            description: "Un año de experiencia en el sector TIC: inicié como Practicante de Desarrollo de Software y, por desempeño, fui vinculada como Auxiliar de Sistemas en el mismo equipo.",
            icon: Headset,
        },
        {
            id: 3,
            title: "Visión integral del ciclo de vida del software",
            description: "Construyo aplicaciones, las valido con testing y sostengo su operación resolviendo incidencias: un enfoque que combina desarrollo, QA y soporte técnico.",
            icon: ShieldCheck,
        },
    ],
    stats: [
        {
            label: "Perfil Técnico",
            value: "Software Dev",
            icon: Code2,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "group-hover:border-blue-500/50"
        },
        {
            label: "Especialidad",
            value: "QA Analyst",
            icon: ShieldCheck,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            border: "group-hover:border-cyan-500/50"
        },
        {
            label: "Soporte",
            value: "IT Support",
            icon: Headset,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            border: "group-hover:border-pink-500/50"
        },
        {
            label: "Stack",
            value: "Full Stack",
            icon: Cpu,
            color: "text-green-500",
            bg: "bg-green-500/10",
            border: "group-hover:border-green-500/50"
        },
    ],
    conclusion: {
        cmd: "echo $PROPUESTA_VALOR",
        output: "Un buen sistema no solo debe funcionar: debe ser estable, usable y confiable. Análisis, calidad y resolución de problemas, lista para aportar desde el primer día."
    }
};

// --- ANIMACIONES (Variants para Framer Motion) ---
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Efecto dominó entre tarjetas
        },
    },
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};