"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type HeatmapData = {
  username: string;
  totalContributions: number;
  weeks: ContributionDay[][];
  rangeStart: string;
  rangeEnd: string;
};

const LEVEL_CLASSES = [
  "bg-zinc-200/70 dark:bg-zinc-800/80",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
];

const MONTH_LABELS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatRange(start: string, end: string): string {
  if (!start || !end) return "";
  const s = new Date(start);
  const e = new Date(end);
  const fmt = (d: Date) =>
    d.toLocaleDateString("es-CO", { month: "short", year: "numeric" });
  return `${fmt(s)} - ${fmt(e)}`;
}

export function GitHubHeatmap() {
  const [data, setData] = useState<HeatmapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-contributions")
      .then(async (r) => {
        if (!r.ok) {
          const body = await r.json().catch(() => ({}));
          throw new Error(body?.error ?? "Error al cargar el heatmap");
        }
        return r.json() as Promise<HeatmapData>;
      })
      .then((json) => {
        if (cancelled) return;
        setData(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Cargando contribuciones...
          </span>
        </div>
        <div className="h-32 bg-muted/40 rounded-md animate-pulse" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Heatmap de contribuciones
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {error ??
            "No se pudo cargar el heatmap. Verifica que GITHUB_TOKEN este configurado."}
        </p>
      </div>
    );
  }

  const monthMarkers = computeMonthMarkers(data.weeks);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border/60 bg-card p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {data.totalContributions.toLocaleString("es-CO")} contribuciones en
            el ultimo ano
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatRange(data.rangeStart, data.rangeEnd)}
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-2 min-w-full">
          <div className="flex gap-[3px] pl-7 text-[10px] text-muted-foreground">
            {monthMarkers.map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="w-[12px] flex-none text-left"
                aria-hidden="true"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            <div className="flex flex-col gap-[3px] pr-1 text-[10px] text-muted-foreground">
              <span className="h-[12px]" aria-hidden="true" />
              <span className="h-[12px]">Lun</span>
              <span className="h-[12px]" aria-hidden="true" />
              <span className="h-[12px]">Mie</span>
              <span className="h-[12px]" aria-hidden="true" />
              <span className="h-[12px]">Vie</span>
              <span className="h-[12px]" aria-hidden="true" />
            </div>

            {data.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <span
                    key={day.date}
                    title={`${day.count} contribuciones el ${formatDate(day.date)}`}
                    className={`block w-[12px] h-[12px] rounded-[3px] ${LEVEL_CLASSES[day.level]}`}
                  />
                ))}
                {Array.from({ length: 7 - week.length }).map((_, i) => (
                  <span
                    key={`pad-${wi}-${i}`}
                    className="block w-[12px] h-[12px] rounded-[3px] opacity-0"
                    aria-hidden="true"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 text-[11px] text-muted-foreground">
        <span>Menos</span>
        {LEVEL_CLASSES.map((cls, i) => (
          <span
            key={i}
            className={`block w-[10px] h-[10px] rounded-[2px] ${cls}`}
            aria-hidden="true"
          />
        ))}
        <span>Mas</span>
      </div>
    </motion.div>
  );
}

function computeMonthMarkers(weeks: ContributionDay[][]): string[] {
  const labels: string[] = [];
  let lastMonth = -1;
  for (const week of weeks) {
    const first = week[0];
    if (!first) {
      labels.push("");
      continue;
    }
    const month = new Date(first.date).getMonth();
    if (month !== lastMonth) {
      labels.push(MONTH_LABELS[month]);
      lastMonth = month;
    } else {
      labels.push("");
    }
  }
  return labels;
}
