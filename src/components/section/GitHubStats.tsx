"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  Users,
  Calendar,
  GitFork,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import type { GitHubStatsResponse } from "@/src/app/api/github-stats/route";
import { NumberCounter } from "./NumberCounter";

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

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 glow-border">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Icon size={16} className="shrink-0" />
        <span className="text-xs uppercase tracking-wider font-medium">
          {label}
        </span>
      </div>
      <NumberCounter
        value={value}
        duration={1.4}
        className="text-3xl font-bold text-foreground tabular-nums"
      />
    </div>
  );
}

function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 dark:border-zinc-800 p-5 animate-pulse"
        >
          <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-2/3 mb-3" />
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function GitHubStats() {
  const [data, setData] = useState<GitHubStatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-stats")
      .then(async (res) => {
        if (!res.ok) throw new Error("fetch_failed");
        return res.json() as Promise<GitHubStatsResponse>;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError("No se pudieron cargar las estadisticas");
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
          href={`https://github.com/13camilaaaaa`}
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
    return <SkeletonStats />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Repositorios"
          value={data.publicRepos}
          icon={Github}
        />
        <StatCard label="Stars totales" value={data.totalStars} icon={Star} />
        <StatCard
          label="Seguidores"
          value={data.followers}
          icon={Users}
        />
        <StatCard
          label="Anos en GitHub"
          value={data.yearsOnGithub}
          icon={Calendar}
        />
      </div>

      {data.languages.length > 0 && (
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6">
          <h3 className="text-sm uppercase tracking-wider font-medium text-gray-500 dark:text-zinc-400 mb-4">
            Lenguajes mas usados
          </h3>
          <div className="space-y-3">
            {data.languages.map((lang) => (
              <div key={lang.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {lang.name}
                  </span>
                  <span className="text-gray-500 dark:text-zinc-400">
                    {lang.count} repos ({lang.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.recentRepo && (
          <a
            href={data.recentRepo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 transition-all hover:border-gray-400 dark:hover:border-zinc-600"
          >
            <div className="flex items-center justify-between text-gray-500 dark:text-zinc-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-medium">
                Repo mas reciente
              </span>
              <ArrowUpRight
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {data.recentRepo.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
              {data.recentRepo.language ? `${data.recentRepo.language} | ` : ""}
              actualizado {formatRelativeDate(data.recentRepo.updatedAt)}
            </div>
          </a>
        )}

        {data.topRepo && (
          <a
            href={data.topRepo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 transition-all hover:border-gray-400 dark:hover:border-zinc-600"
          >
            <div className="flex items-center justify-between text-gray-500 dark:text-zinc-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-medium">
                Repo destacado
              </span>
              <ArrowUpRight
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {data.topRepo.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-zinc-400 mt-1 flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Star size={12} /> {data.topRepo.stars}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork size={12} /> {data.topRepo.forks}
              </span>
            </div>
          </a>
        )}
      </div>

      <div className="text-center">
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Ver perfil completo en GitHub
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}
