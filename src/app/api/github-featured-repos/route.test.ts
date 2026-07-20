import { describe, it, expect } from "vitest";
import { selectFeaturedRepos, extractReadmeSummary } from "./route";

function repo(overrides: Partial<{
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}> = {}) {
  return {
    name: "test-repo",
    description: null,
    html_url: "https://github.com/Camila-Navas/test-repo",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: null,
    topics: [],
    updated_at: "2026-04-01T00:00:00Z",
    fork: false,
    ...overrides,
  };
}

describe("selectFeaturedRepos", () => {
  it("excluye forks", () => {
    const repos = [
      repo({ name: "original", fork: false }),
      repo({ name: "forked", fork: true }),
    ];
    const result = selectFeaturedRepos(repos);
    expect(result.map((r) => r.name)).toEqual(["original"]);
  });

  it("excluye el repo especial de perfil (13camilaaaaa)", () => {
    const repos = [
      repo({ name: "13camilaaaaa" }),
      repo({ name: "proyecto-real" }),
    ];
    const result = selectFeaturedRepos(repos);
    expect(result.map((r) => r.name)).toEqual(["proyecto-real"]);
  });

  it("ordena por estrellas descendente", () => {
    const repos = [
      repo({ name: "poco", stargazers_count: 1 }),
      repo({ name: "mucho", stargazers_count: 10 }),
      repo({ name: "medio", stargazers_count: 5 }),
    ];
    const result = selectFeaturedRepos(repos);
    expect(result.map((r) => r.name)).toEqual(["mucho", "medio", "poco"]);
  });

  it("en empate de estrellas, ordena por actualizado mas reciente", () => {
    const repos = [
      repo({ name: "viejo", stargazers_count: 2, updated_at: "2025-01-01T00:00:00Z" }),
      repo({ name: "nuevo", stargazers_count: 2, updated_at: "2026-01-01T00:00:00Z" }),
    ];
    const result = selectFeaturedRepos(repos);
    expect(result.map((r) => r.name)).toEqual(["nuevo", "viejo"]);
  });

  it("limita al top N solicitado", () => {
    const repos = Array.from({ length: 10 }).map((_, i) =>
      repo({ name: `repo-${i}`, stargazers_count: i })
    );
    const result = selectFeaturedRepos(repos, 6);
    expect(result).toHaveLength(6);
    expect(result[0].name).toBe("repo-9");
  });

  it("retorna vacio cuando no hay repos elegibles", () => {
    const repos = [repo({ name: "13camilaaaaa" }), repo({ fork: true })];
    expect(selectFeaturedRepos(repos)).toEqual([]);
  });
});

describe("extractReadmeSummary", () => {
  it("extrae el primer parrafo de texto, ignorando el encabezado", () => {
    const md = `# Mi Proyecto\n\nEste es un sistema de gestion de pedidos en tiempo real.\n\nMas detalles abajo.`;
    expect(extractReadmeSummary(md)).toBe(
      "Este es un sistema de gestion de pedidos en tiempo real."
    );
  });

  it("ignora badges e imagenes antes del parrafo", () => {
    const md = `# Titulo\n\n[![Build](https://img.shields.io/badge/build-passing-green)](https://ci.example.com)\n![banner](./banner.png)\n\nDescripcion real del proyecto.`;
    expect(extractReadmeSummary(md)).toBe("Descripcion real del proyecto.");
  });

  it("quita marcado de negrita, cursiva, codigo y links", () => {
    const md = `# T\n\nUsa **Node.js** y \`Express\` con [TypeScript](https://typescriptlang.org) para *velocidad*.`;
    expect(extractReadmeSummary(md)).toBe(
      "Usa Node.js y Express con TypeScript para velocidad."
    );
  });

  it("ignora bloques de codigo", () => {
    const md = "# T\n\n```js\nconst x = 1;\n```\n\nDescripcion despues del codigo.";
    expect(extractReadmeSummary(md)).toBe("Descripcion despues del codigo.");
  });

  it("trunca a 220 caracteres", () => {
    const long = "a".repeat(300);
    const md = `# T\n\n${long}`;
    const result = extractReadmeSummary(md);
    expect(result?.length).toBe(220);
    expect(result?.endsWith("...")).toBe(true);
  });

  it("retorna null cuando no hay parrafo de texto", () => {
    const md = "# Solo titulo\n\n![banner](./x.png)\n\n> Solo una cita";
    expect(extractReadmeSummary(md)).toBeNull();
  });
});
