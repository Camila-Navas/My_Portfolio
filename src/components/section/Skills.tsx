"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { containerVariants } from "@/src/config/hero-data";
import { SKILL_CATEGORIES } from "@/src/config/skills-data";
import { cn } from "@/lib/utils";

const BENTO_LAYOUT: Record<string, string> = {
  qa: "md:col-span-2 md:row-span-2",
  frontend: "md:col-span-2",
  backend: "md:col-span-2",
  support: "md:col-span-1",
  database: "md:col-span-1",
  workflow: "md:col-span-2",
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-background relative overflow-hidden">

      {/* Fondo Tecnológico (Malla) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">

        <div className="text-center mb-20 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-tight mb-4 text-foreground pb-2"
          >
            Arsenal{" "}
            <span className="font-display italic text-primary">
              Tecnologico
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Priorizo herramientas que garantizan rendimiento, escalabilidad y código limpio.
          </motion.p>
        </div>

        {/* --- V17: BENTO GRID ASIMETRICO --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px]"
        >
          {SKILL_CATEGORIES.map((category) => {
            const layout = BENTO_LAYOUT[category.id] ?? "md:col-span-2";
            const isFeatured = category.id === "qa";

            return (
              <TiltCard
                key={category.id}
                className={cn("h-full", layout)}
                featured={isFeatured}
              >
                <div
                  className={cn(
                    "relative z-10 h-full flex flex-col",
                    isFeatured ? "p-8 md:p-10" : "p-6"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] shrink-0",
                      isFeatured ? "w-14 h-14" : "w-11 h-11"
                    )}
                  >
                    <category.icon size={isFeatured ? 28 : 22} />
                  </div>

                  <div className="mt-4">
                    <h3
                      className={cn(
                        "font-bold text-foreground mb-1.5 leading-tight",
                        isFeatured ? "text-2xl md:text-3xl" : "text-lg"
                      )}
                    >
                      {isFeatured ? (
                        <>
                          {category.label.split(" ")[0]}{" "}
                          <span className="font-display italic text-primary">
                            {category.label.split(" ").slice(1).join(" ") ||
                              category.label}
                          </span>
                        </>
                      ) : (
                        category.label
                      )}
                    </h3>
                    <p
                      className={cn(
                        "text-muted-foreground leading-relaxed",
                        isFeatured ? "text-base" : "text-xs"
                      )}
                    >
                      {category.description}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "flex flex-wrap gap-1.5 mt-auto pt-4",
                      isFeatured && "gap-2 pt-6"
                    )}
                  >
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          "font-semibold tracking-wide uppercase rounded-md bg-secondary/60 text-secondary-foreground border border-border/50 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_10px_rgba(var(--primary-rgb),0.15)] cursor-default",
                          isFeatured
                            ? "px-3 py-1.5 text-xs"
                            : "px-2 py-0.5 text-[10px]"
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// --- SUB-COMPONENTE: TILT CARD CON SPOTLIGHT Y GLOW BORDER ---
function TiltCard({
  children,
  className = "",
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Valores de movimiento del mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transformaciones para el efecto Tilt (Inclinación)
  // Mouse X -> Rota en eje Y
  // Mouse Y -> Rota en eje X
  const rotateX = useTransform(y, [0, 400], [5, -5]); // Rango de inclinación sutil
  const rotateY = useTransform(x, [0, 400], [-5, 5]);

  // Suavizado del movimiento (Spring physics) para que no sea rígido
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Calculamos la posición relativa del mouse dentro de la card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    // Al salir, reseteamos la posición para que la card vuelva a estar plana
    x.set(0);
    y.set(0);
    // Nota: como usamos spring, volverá suavemente al centro, no de golpe.
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={cn("relative group glow-border rounded-2xl", className)}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-full rounded-2xl border border-border/50 p-[1px] overflow-hidden transition-colors",
          featured
            ? "bg-gradient-to-br from-card via-card to-primary/5"
            : "bg-card"
        )}
      >
        {/* Spotlight radial siguiendo al cursor */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${featured ? 800 : 500}px circle at ${x}px ${y}px,
                rgba(var(--primary-rgb), ${featured ? 0.18 : 0.12}),
                transparent 80%
              )
            `,
          }}
        />

        {/* Decorativo en card grande: punto orbital sutil */}
        {featured && (
          <div
            className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(var(--primary-rgb), 0.4), transparent 70%)",
            }}
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 h-full bg-card/50 backdrop-blur-sm rounded-[15px]">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}