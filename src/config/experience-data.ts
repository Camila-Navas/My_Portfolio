"use client";

import { Variants } from "framer-motion";

// --- DATOS: EXPERIENCIA (Lo más importante) ---
export const WORK_EXPERIENCE = [
  {
    id: 1,
    role: "Auxiliar de Sistemas",
    company: "ODIR Certificaciones S.A.S",
    location: "Presencial",
    period: "Julio 2025 - Actualidad",
    description: "Soporte técnico de primer nivel a usuarios internos: diagnóstico y resolución de incidencias de hardware, software y red. Apoyo en la administración de equipos, mantenimiento preventivo y correctivo, gestión de inventario tecnológico y acompañamiento en procesos de mejora continua del área de sistemas.",
    skills: ["Soporte Técnico", "Resolución de Incidencias", "Mantenimiento de Equipos", "Redes", "Office 365", "Gestión de Inventario"],
  },
  {
    id: 2,
    role: "Desarrolladora Full Stack (Portafolio)",
    company: "Proyectos Personales",
    location: "Remoto",
    period: "2024 - Presente",
    description: "Diseño y desarrollo de aplicaciones web end-to-end aplicando buenas prácticas de código limpio, testing y despliegue. Implementación de arquitecturas escalables, integración de APIs y prácticas de QA para garantizar la calidad del producto final.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Testing"],
  },
];

// --- DATOS: EDUCACIÓN Y CURSOS (Soporte) ---
// In Experience.tsx

export const EDUCATION = [
  {
    id: 1,
    slug: "tecnologia-analisis-desarrollo-software",
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    institution: "SENA",
    period: "2024 - 2026",
    type: "degree",
  },
  {
    id: 2,
    slug: "soporte-tecnico-fundamentos",
    title: "Fundamentos de Soporte Técnico y Help Desk",
    institution: "Plataforma de Cursos",
    period: "2025",
    type: "certificate",
  },
  {
    id: 3,
    slug: "qa-testing-fundamentals",
    title: "Software Testing & Quality Assurance",
    institution: "Plataforma de Cursos",
    period: "2025",
    type: "certificate",
  },
  {
    id: 4,
    slug: "automatizacion-pruebas",
    title: "Automatización de Pruebas",
    institution: "Plataforma de Cursos",
    period: "2025",
    type: "certificate",
  },
  {
    id: 5,
    slug: "javascript-moderno",
    title: "JavaScript Moderno",
    institution: "Plataforma de Cursos",
    period: "2025",
    type: "certificate",
  },
];



// --- ANIMACIONES ---
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  },
};