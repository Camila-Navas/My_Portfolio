import { NextResponse } from "next/server";

const USERNAME = "13camilaaaaa";
const CACHE_SECONDS = 3600;

export const revalidate = 3600;

type GhRepo = {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  html_url: string;
  description: string | null;
  fork: boolean;
};

type GhUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
};

export type GitHubStatsResponse = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  yearsOnGithub: number;
  languages: { name: string; count: number; percentage: number }[];
  topRepo: {
    name: string;
    stars: number;
    forks: number;
    url: string;
    description: string | null;
  } | null;
  recentRepo: {
    name: string;
    updatedAt: string;
    url: string;
    language: string | null;
  } | null;
};

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

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: CACHE_SECONDS },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
        {
          headers,
          next: { revalidate: CACHE_SECONDS },
        }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(
        { error: "No se pudieron obtener los datos de GitHub" },
        { status: 502 }
      );
    }

    const user = (await userRes.json()) as GhUser;
    const reposRaw = (await reposRes.json()) as GhRepo[];
    const repos = reposRaw.filter((r) => !r.fork);

    return NextResponse.json(buildStats(user, repos));
  } catch (err) {
    console.error("[github-stats] Error:", err);
    return NextResponse.json(
      { error: "Error al obtener estadisticas de GitHub" },
      { status: 500 }
    );
  }
}

export function buildStats(user: GhUser, repos: GhRepo[]): GitHubStatsResponse {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

  const langCounts = new Map<string, number>();
  for (const r of repos) {
    if (r.language) {
      langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
    }
  }
  const totalWithLang = Array.from(langCounts.values()).reduce(
    (a, b) => a + b,
    0
  );
  const languages = Array.from(langCounts.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage:
        totalWithLang > 0 ? Math.round((count / totalWithLang) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const sortedByStars = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );
  const topRepoRaw = sortedByStars[0];
  const topRepo = topRepoRaw
    ? {
        name: topRepoRaw.name,
        stars: topRepoRaw.stargazers_count,
        forks: topRepoRaw.forks_count,
        url: topRepoRaw.html_url,
        description: topRepoRaw.description,
      }
    : null;

  const recentRepoRaw = repos[0];
  const recentRepo = recentRepoRaw
    ? {
        name: recentRepoRaw.name,
        updatedAt: recentRepoRaw.updated_at,
        url: recentRepoRaw.html_url,
        language: recentRepoRaw.language,
      }
    : null;

  const created = new Date(user.created_at);
  const now = new Date();
  let yearsOnGithub = now.getFullYear() - created.getFullYear();
  const beforeAnniversary =
    now.getMonth() < created.getMonth() ||
    (now.getMonth() === created.getMonth() &&
      now.getDate() < created.getDate());
  if (beforeAnniversary) yearsOnGithub -= 1;
  if (yearsOnGithub < 0) yearsOnGithub = 0;

  return {
    username: user.login,
    profileUrl: user.html_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    totalForks,
    yearsOnGithub,
    languages,
    topRepo,
    recentRepo,
  };
}
