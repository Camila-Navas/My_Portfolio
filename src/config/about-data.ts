"use client";

import { Variants } from "framer-motion";
import { Code2, Cpu, BookOpen, ShieldCheck, Headset } from "lucide-react";

export const ABOUT_DATA = {
    title: "Trayectoria Profesional",
    subtitle: "De la Lógica al Producto Escalable",
    timeline: [
        {
            id: 1,
            title: "Tecnólogo en Análisis y Desarrollo de Software (SENA)",
            description: "Formación integral en programación, bases de datos, metodologías ágiles y buenas prácticas de desarrollo de software.",
            icon: BookOpen,
        },
        {
            id: 2,
            title: "Auxiliar de Sistemas en ODIR Certificaciones",
            description: "Soporte técnico, resolución de incidencias y mantenimiento de equipos en un entorno empresarial real, fortaleciendo el análisis y la atención al usuario.",
            icon: Headset,
        },
        {
            id: 3,
            title: "Enfoque en QA y Desarrollo de Software",
            description: "Especialización en aseguramiento de calidad, automatización de pruebas y desarrollo Full Stack con stack moderno (React, Next.js, TypeScript).",
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
        output: "Análisis, calidad y resolución de problemas. Lista para aportar desde el primer día con código limpio y atención al detalle."
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