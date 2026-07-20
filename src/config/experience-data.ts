"use client";

import { Variants } from "framer-motion";

// --- DATOS: EXPERIENCIA (Lo más importante) ---
export const WORK_EXPERIENCE = [
  {
    id: 1,
    role: "Auxiliar de Sistemas",
    company: "ODIR Certificaciones S.A.S",
    location: "Bucaramanga, Colombia",
    period: "Enero 2026 - Julio 2026",
    description: "Desarrollo, validación y despliegue de aplicativos internos, dando soporte a su sostenimiento y mejora continua. Soporte técnico de software y hardware a las distintas áreas de la organización. Gestión del inventario de equipos tecnológicos y documentación de procedimientos para estandarizar la operación. Acompañamiento a diferentes áreas en la resolución de incidencias y en el uso de las herramientas internas.",
    skills: ["Soporte Técnico", "Resolución de Incidencias", "Node.js", "MySQL", "Gestión de Inventario", "Documentación de Procesos"],
  },
  {
    id: 2,
    role: "Practicante de Desarrollo de Software",
    company: "ODIR Certificaciones S.A.S",
    location: "Bucaramanga, Colombia",
    period: "Julio 2025 - Enero 2026",
    description: "Participación en la creación y validación de aplicativos internos como parte del equipo de desarrollo. Apoyo en el despliegue y sostenimiento de soluciones ya existentes. Colaboración en tareas de infraestructura tecnológica y soporte técnico.",
    skills: ["Node.js", "Nest.js", "MySQL", "APIs REST", "Git/GitHub", "QA"],
  },
];

// --- DATOS: EDUCACIÓN Y CURSOS (Soporte) ---
// In Experience.tsx

export const EDUCATION = [
  {
    id: 1,
    title: "Ingeniería de Sistemas",
    institution: "UNAD - Universidad Nacional Abierta y a Distancia",
    period: "En curso",
    type: "degree",
  },
  {
    id: 2,
    slug: "tecnologia-analisis-desarrollo-software",
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    institution: "SENA - Centro Industrial de Mantenimiento Integral",
    period: "2024 - 2026",
    type: "degree",
  },
  {
    id: 3,
    title: "Bachiller técnico con especialidad en informática",
    institution: "Colegio Luis Carlos Galán Sarmiento",
    period: "2022",
    type: "degree",
  },
  {
    id: 4,
    slug: "soporte-tecnico-fundamentos",
    title: "Fundamentos de Soporte Técnico y Help Desk",
    institution: "Plataforma de Cursos",
    period: "2025",
    type: "certificate",
  },
  {
    id: 5,
    slug: "qa-testing-fundamentals",
    title: "Software Testing & Quality Assurance",
    institution: "Plataforma de Cursos",
    period: "2025",
    type: "certificate",
  },
  {
    id: 6,
    slug: "automatizacion-pruebas",
    title: "Automatización de Pruebas",
    institution: "Plataforma de Cursos",
    period: "2025",
    type: "certificate",
  },
  {
    id: 7,
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