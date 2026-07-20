"use client";

import {  Variants } from "framer-motion";
import {
    Database,
    Layout,
    Server,
    Terminal,
    ShieldCheck,
    Headset,
} from "lucide-react";

// --- DATOS ---
export const SKILL_CATEGORIES = [
    {
        id: "frontend",
        label: "Frontend",
        icon: Layout,
        description: "Experiencias de usuario rápidas, reactivas y accesibles.",
        skills: ["HTML5", "CSS3", "JavaScript"],
    },
    {
        id: "backend",
        label: "Backend",
        icon: Server,
        description: "Servidores escalables con lógica de negocio sólida.",
        skills: ["Node.js", "Nest.js", "Java", "Python", "APIs REST"],
    },
    {
        id: "qa",
        label: "QA Testing",
        icon: ShieldCheck,
        description: "Mentalidad 'Bug-Free'. Desde pruebas manuales hasta automatización.",
        skills: ["Pruebas Funcionales", "Validación de Calidad", "Automatización QA"],
    },
    {
        id: "support",
        label: "IT Support",
        icon: Headset,
        description: "Resolución de incidencias y soporte técnico a usuarios.",
        skills: ["Soporte Técnico (Software y Hardware)", "Gestión de Inventario", "Documentación de Procedimientos"],
    },
    {
        id: "database",
        label: "Base de datos",
        icon: Database,
        description: "Gestión eficiente de datos y consultas SQL.",
        skills: ["MySQL"],
    },
    {
        id: "workflow",
        label: "Herramientas",
        icon: Terminal,
        description: "Herramientas que aceleran el ciclo de desarrollo.",
        skills: ["Git", "GitHub", "Docker", "PowerShell", "Excel", "Herramientas de IA"],
    },
];

// --- ANIMACIONES ---
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};