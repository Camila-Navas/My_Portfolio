import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { buildStats } from "./route";

const baseUser = {
  login: "13camilaaaaa",
  public_repos: 10,
  followers: 5,
  following: 3,
  created_at: "2022-01-15T00:00:00Z",
  avatar_url: "https://example.com/avatar.png",
  html_url: "https://github.com/13camilaaaaa",
  name: "Camila",
};

function repo(overrides: Partial<{
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  html_url: string;
  description: string | null;
  fork: boolean;
}> = {}) {
  return {
    name: "test-repo",
    stargazers_count: 0,
    forks_count: 0,
    language: null,
    updated_at: "2026-04-01T00:00:00Z",
    html_url: "https://github.com/13camilaaaaa/test-repo",
    description: null,
    fork: false,
    ...overrides,
  };
}

describe("buildStats - totales", () => {
  it("calcula la suma total de stars y forks", () => {
    const repos = [
      repo({ stargazers_count: 5, forks_count: 1 }),
      repo({ stargazers_count: 3, forks_count: 2 }),
      repo({ stargazers_count: 0, forks_count: 0 }),
    ];
    const stats = buildStats(baseUser, repos);
    expect(stats.totalStars).toBe(8);
    expect(stats.totalForks).toBe(3);
  });

  it("retorna 0 stars/forks cuando no hay repos", () => {
    const stats = buildStats(baseUser, []);
    expect(stats.totalStars).toBe(0);
    expect(stats.totalForks).toBe(0);
  });

  it("preserva publicRepos y followers del usuario", () => {
    const stats = buildStats(baseUser, []);
    expect(stats.publicRepos).toBe(10);
    expect(stats.followers).toBe(5);
    expect(stats.username).toBe("13camilaaaaa");
  });
});

describe("buildStats - lenguajes", () => {
  it("agrupa y ordena los lenguajes por frecuencia descendente", () => {
    const repos = [
      repo({ language: "TypeScript" }),
      repo({ language: "TypeScript" }),
      repo({ language: "TypeScript" }),
      repo({ language: "JavaScript" }),
      repo({ language: "JavaScript" }),
      repo({ language: "Python" }),
    ];
    const stats = buildStats(baseUser, repos);
    expect(stats.languages[0]).toMatchObject({ name: "TypeScript", count: 3 });
    expect(stats.languages[1]).toMatchObject({ name: "JavaScript", count: 2 });
    expect(stats.languages[2]).toMatchObject({ name: "Python", count: 1 });
  });

  it("calcula el porcentaje de cada lenguaje sobre el total con lenguaje", () => {
    const repos = [
      repo({ language: "TypeScript" }),
      repo({ language: "TypeScript" }),
      repo({ language: "JavaScript" }),
      repo({ language: "JavaScript" }),
    ];
    const stats = buildStats(baseUser, repos);
    expect(stats.languages[0].percentage).toBe(50);
    expect(stats.languages[1].percentage).toBe(50);
  });

  it("ignora repos con language null", () => {
    const repos = [
      repo({ language: "TypeScript" }),
      repo({ language: null }),
      repo({ language: null }),
    ];
    const stats = buildStats(baseUser, repos);
    expect(stats.languages).toHaveLength(1);
    expect(stats.languages[0].percentage).toBe(100);
  });

  it("limita el listado a los 5 lenguajes top", () => {
    const repos = Array.from({ length: 10 }).map((_, i) =>
      repo({ language: `Lang${i}` })
    );
    const stats = buildStats(baseUser, repos);
    expect(stats.languages).toHaveLength(5);
  });

  it("retorna array vacio cuando ningun repo tiene lenguaje", () => {
    const repos = [repo({ language: null })];
    const stats = buildStats(baseUser, repos);
    expect(stats.languages).toEqual([]);
  });
});

describe("buildStats - topRepo y recentRepo", () => {
  it("topRepo es el de mas stars", () => {
    const repos = [
      repo({ name: "one", stargazers_count: 1 }),
      repo({ name: "winner", stargazers_count: 99 }),
      repo({ name: "two", stargazers_count: 5 }),
    ];
    const stats = buildStats(baseUser, repos);
    expect(stats.topRepo?.name).toBe("winner");
    expect(stats.topRepo?.stars).toBe(99);
  });

  it("recentRepo es el primero del array (asume sort=updated del API)", () => {
    const repos = [
      repo({ name: "freshest", updated_at: "2026-04-28T00:00:00Z" }),
      repo({ name: "older", updated_at: "2026-01-01T00:00:00Z" }),
    ];
    const stats = buildStats(baseUser, repos);
    expect(stats.recentRepo?.name).toBe("freshest");
  });

  it("retorna null para topRepo y recentRepo cuando no hay repos", () => {
    const stats = buildStats(baseUser, []);
    expect(stats.topRepo).toBeNull();
    expect(stats.recentRepo).toBeNull();
  });
});

describe("buildStats - yearsOnGithub", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("calcula los anos completos desde la creacion de la cuenta", () => {
    vi.setSystemTime(new Date("2026-04-28T00:00:00Z"));
    const stats = buildStats(
      { ...baseUser, created_at: "2022-01-15T00:00:00Z" },
      []
    );
    expect(stats.yearsOnGithub).toBe(4);
  });

  it("resta uno cuando aun no llega el aniversario en el ano actual", () => {
    vi.setSystemTime(new Date("2026-01-10T00:00:00Z"));
    const stats = buildStats(
      { ...baseUser, created_at: "2022-01-15T00:00:00Z" },
      []
    );
    expect(stats.yearsOnGithub).toBe(3);
  });

  it("nunca retorna negativo", () => {
    vi.setSystemTime(new Date("2020-01-01T00:00:00Z"));
    const stats = buildStats(
      { ...baseUser, created_at: "2022-01-15T00:00:00Z" },
      []
    );
    expect(stats.yearsOnGithub).toBe(0);
  });
});
