"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Building2, GraduationCap, Briefcase, Award } from "lucide-react";
import { fadeInUp, staggerContainer } from "./animations";

// Helpers para iconos y colores (puedes moverlos a un utils si prefieres)
const getIcon = (type: string) => {
  switch (type) {
    case "education": return GraduationCap;
    case "work": return Briefcase;
    case "course": return Award;
    default: return Briefcase;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "education": return "Educación";
    case "work": return "Experiencia Laboral";
    case "course": return "Certificación";
    default: return "Experiencia";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "education": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    case "work": return "text-green-500 bg-green-500/10 border-green-500/20";
    case "course": return "text-cyan-500 bg-cyan-500/10 border-cyan-500/20";
    default: return "text-primary bg-primary/10 border-primary/20";
  }
};

interface ExperienceHeroProps {
  experience: {
    type: "education" | "work" | "course";
    title: string;
    period: string;
    organization: string;
  };
}

export const ExperienceHero = ({ experience }: ExperienceHeroProps) => {
  const Icon = getIcon(experience.type);
  const typeStyles = getTypeColor(experience.type);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-4xl mx-auto mb-16"
    >
      <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6">
        <Link href="/#experiencia" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${typeStyles}`}>
          <Icon size={16} />
          <span>{getTypeLabel(experience.type)}</span>
        </div>
        <span className="text-muted-foreground text-sm flex items-center gap-1">
          <Calendar size={14} /> {experience.period}
        </span>
      </motion.div>

      <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
        {experience.title}
      </motion.h1>

      <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 text-lg text-muted-foreground border-l-4 border-primary/20 pl-4">
        <div className="flex items-center gap-2">
          <Building2 className="text-primary h-5 w-5" />
          <span className="font-semibold text-foreground">{experience.organization}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};