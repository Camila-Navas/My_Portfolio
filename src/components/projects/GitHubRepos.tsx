"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitFork, Github, Rocket, Star } from "lucide-react";
import type { FeaturedReposResponse } from "@/src/app/api/github-featured-repos/route";

function formatRelativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "hoy";
  if (diffDays === 1) return "hace 1 dia";
  if (diffDays < 30) return `hace ${diffDays} dias`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "hace 1 mes";
  if (diffMonths < 12) return `hace ${diffMonths} meses`;
  const diffYears = Math.floor(diffDays / 365);
  return diffYears === 1 ? "hace 1 ano" : `hace ${diffYears} anos`;
}

function SkeletonRepos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/60 overflow-hidden animate-pulse"
        >
          <div className="h-36 bg-gray-200 dark:bg-zinc-800" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-2/3" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function GitHubRepos() {
  const [data, setData] = useState<FeaturedReposResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-featured-repos")
      .then(async (res) => {
        if (!res.ok) throw new Error("fetch_failed");
        return res.json() as Promise<FeaturedReposResponse>;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError("No se pudieron cargar los repositorios");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 p-8 text-center text-gray-500 dark:text-zinc-400 text-sm">
        {error}.{" "}
        <a
          href="https://github.com/Camila-Navas"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900 dark:hover:text-white"
        >
          Ver perfil en GitHub
        </a>
      </div>
    );
  }

  if (!data) {
    return <SkeletonRepos />;
  }

  if (data.repos.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {data.repos.map((repo) => (
        <a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 glow-border"
        >
          <div className="relative h-36 w-full bg-muted overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={repo.ogImage}
              alt={`Vista previa de ${repo.name}`}
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>

          <div className="flex flex-col flex-grow p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-bold text-foreground truncate flex items-center gap-2">
                <Github size={16} className="shrink-0 text-muted-foreground" />
                {repo.name}
              </h3>
              <ExternalLink
                size={14}
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-primary mt-1"
              />
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
              {repo.description ?? "Sin descripcion disponible."}
            </p>

            {(repo.language || repo.topics.length > 0) && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {repo.language && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50">
                    {repo.language}
                  </span>
                )}
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md text-muted-foreground bg-transparent border border-dashed border-border/50"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/40 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <Star size={12} /> {repo.stars}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks}
                </span>
              </div>
              <span>actualizado {formatRelativeDate(repo.updatedAt)}</span>
            </div>

            {repo.homepage && (
              <span
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(repo.homepage!, "_blank", "noopener,noreferrer");
                }}
              >
                <Rocket size={12} /> Ver demo
              </span>
            )}
          </div>
        </a>
      ))}
    </motion.div>
  );
}
