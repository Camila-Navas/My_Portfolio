import { Variants } from "framer-motion";

// Configuración del contenido (Fácil de editar en el futuro)
export const HERO_CONTENT = {
  badge: "Disponible para trabajar",
  name: "Maria Camila Vesga Navas",
  role: "Tecnólogo en Análisis y Desarrollo de Software",
  roles: [
    "Software Developer",
    "QA Analyst",
    "IT Support",
    "Automatización de Pruebas",
  ] as const,
  description: "Software Developer | QA Analyst | IT Support | Automatización de Pruebas | Resolución de Incidencias",
  social: {
    github: "https://github.com/Camila-Navas",
    linkedin: "https://www.linkedin.com/in/camila-navas13",
    email: "mailto:camilanavas13@gmail.com",
  },
  image: "/fotoPerfilHojaVida.png"
};

// Configuración de Animaciones (Variants)
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9] as const
    }
  },
};