import { NextResponse } from "next/server";

const USERNAME = "Camila-Navas";
const EXCLUDED_REPOS = ["13camilaaaaa"];
const FEATURED_COUNT = 6;
const CACHE_SECONDS = 3600;

export const revalidate = 3600;

type GhRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
  fork: boolean;
};

export type FeaturedRepo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
  ogImage: string;
};

export type FeaturedReposResponse = {
  repos: FeaturedRepo[];
};

export function selectFeaturedRepos(
  repos: GhRepo[],
  count: number = FEATURED_COUNT
): GhRepo[] {
  return repos
    .filter((r) => !r.fork && !EXCLUDED_REPOS.includes(r.name))
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    })
    .slice(0, count);
}

export function extractReadmeSummary(markdown: string): string | null {
  const lines = markdown.split("\n");
  const paragraph: string[] = [];
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    if (!line) {
      if (paragraph.length) break;
      continue;
    }
    if (line.startsWith("#")) continue;
    if (line.startsWith("[![") || line.startsWith("![")) continue;
    if (line.startsWith(">")) continue;
    paragraph.push(line);
  }

  if (!paragraph.length) return null;

  const text = paragraph
    .join(" ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();

  if (!text) return null;

  return text.length > 220 ? `${text.slice(0, 217)}...` : text;
}

async function fetchReadmeSummary(
  repoName: string,
  headers: HeadersInit
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${USERNAME}/${repoName}/readme`,
      {
        headers: { ...headers, Accept: "application/vnd.github.raw" },
        next: { revalidate: CACHE_SECONDS },
      }
    );
    if (!res.ok) return null;
    const markdown = await res.text();
    return extractReadmeSummary(markdown);
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    const reposRes = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
      { headers, next: { revalidate: CACHE_SECONDS } }
    );

    if (!reposRes.ok) {
      return NextResponse.json(
        { error: "No se pudieron obtener los repositorios de GitHub" },
        { status: 502 }
      );
    }

    const repos = (await reposRes.json()) as GhRepo[];
    const selected = selectFeaturedRepos(repos);

    const featured: FeaturedRepo[] = await Promise.all(
      selected.map(async (repo) => {
        const description =
          repo.description ?? (await fetchReadmeSummary(repo.name, headers));

        return {
          name: repo.name,
          description,
          url: repo.html_url,
          homepage: repo.homepage || null,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          topics: repo.topics ?? [],
          updatedAt: repo.updated_at,
          ogImage: `https://opengraph.githubassets.com/1/${USERNAME}/${repo.name}`,
        };
      })
    );

    const payload: FeaturedReposResponse = { repos: featured };
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[github-featured-repos] Error:", err);
    return NextResponse.json(
      { error: "Error al obtener los repositorios destacados" },
      { status: 500 }
    );
  }
}
