import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn (class name utility)", () => {
  it("combina clases simples separadas por espacio", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("ignora valores falsy", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });

  it("retorna string vacio cuando no recibe nada", () => {
    expect(cn()).toBe("");
  });

  it("aplica conditional className via objeto", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("merge de clases tailwind conflictivas (la ultima gana)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-base")).toBe("text-base");
  });

  it("preserva clases tailwind que no entran en conflicto", () => {
    const result = cn("flex", "items-center", "gap-2");
    expect(result).toContain("flex");
    expect(result).toContain("items-center");
    expect(result).toContain("gap-2");
  });
});
