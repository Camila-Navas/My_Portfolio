"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HERO_CONTENT } from "@/src/config/hero-data";

export const ProfileImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="relative group"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-3 bg-gradient-to-r from-primary/30 to-cyan-500/30 rounded-full blur-2xl -z-10"
      />

      {/* --- CONTENEDOR DE LA IMAGEN (FLOTANDO) --- */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="relative h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px]"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-transparent to-primary/50 opacity-20 animate-spin-slow p-1" />
    
        <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
           <Image
             src={HERO_CONTENT.image} 
             alt={`Foto de perfil de ${HERO_CONTENT.name}`}
             fill
             className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
             priority
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
           />
        </div>
      </motion.div>
    </motion.div>
  );
};
