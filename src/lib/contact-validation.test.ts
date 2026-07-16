import { describe, it, expect } from "vitest";
import {
  validateContactInput,
  EMAIL_RE,
  NAME_MIN,
  NAME_MAX,
  MESSAGE_MIN,
  MESSAGE_MAX,
} from "./contact-validation";

describe("validateContactInput - honeypot", () => {
  it("acepta y marca como honeypot cuando 'website' viene lleno", () => {
    const result = validateContactInput({
      name: "Camila",
      email: "test@example.com",
      message: "Mensaje de prueba largo suficiente",
      website: "spam-bot.com",
    });
    expect(result).toEqual({ ok: true, honeypot: true });
  });

  it("ignora honeypot cuando viene vacio o ausente", () => {
    const r1 = validateContactInput({
      name: "Camila",
      email: "test@example.com",
      message: "Mensaje de prueba largo suficiente",
      website: "",
    });
    const r2 = validateContactInput({
      name: "Camila",
      email: "test@example.com",
      message: "Mensaje de prueba largo suficiente",
    });
    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(true);
    if (r1.ok) expect(r1.honeypot).toBe(false);
    if (r2.ok) expect(r2.honeypot).toBe(false);
  });
});

describe("validateContactInput - nombre", () => {
  const validBase = {
    email: "test@example.com",
    message: "Mensaje de prueba largo suficiente",
  };

  it("rechaza nombre vacio", () => {
    const result = validateContactInput({ ...validBase, name: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/nombre/i);
  });

  it("rechaza nombre con un solo caracter", () => {
    const result = validateContactInput({ ...validBase, name: "A" });
    expect(result.ok).toBe(false);
  });

  it("acepta nombre con longitud minima", () => {
    const result = validateContactInput({
      ...validBase,
      name: "A".repeat(NAME_MIN),
    });
    expect(result.ok).toBe(true);
  });

  it("acepta nombre con longitud maxima", () => {
    const result = validateContactInput({
      ...validBase,
      name: "A".repeat(NAME_MAX),
    });
    expect(result.ok).toBe(true);
  });

  it("rechaza nombre que excede el maximo", () => {
    const result = validateContactInput({
      ...validBase,
      name: "A".repeat(NAME_MAX + 1),
    });
    expect(result.ok).toBe(false);
  });

  it("rechaza nombre que no es string", () => {
    const result = validateContactInput({ ...validBase, name: 123 });
    expect(result.ok).toBe(false);
  });

  it("aplica trim al nombre antes de validar", () => {
    const result = validateContactInput({
      ...validBase,
      name: "   Camila   ",
    });
    expect(result.ok).toBe(true);
    if (result.ok && !result.honeypot) {
      expect(result.data.name).toBe("Camila");
    }
  });
});

describe("validateContactInput - email", () => {
  const validBase = {
    name: "Camila",
    message: "Mensaje de prueba largo suficiente",
  };

  it.each([
    ["sin arroba", "camilanavas13.gmail.com"],
    ["sin punto", "camila@gmail"],
    ["con espacios", "cami la@gmail.com"],
    ["string vacio", ""],
    ["solo arroba", "@"],
  ])("rechaza email invalido: %s", (_label, email) => {
    const result = validateContactInput({ ...validBase, email });
    expect(result.ok).toBe(false);
  });

  it.each([
    ["formato basico", "test@example.com"],
    ["con subdominio", "user@mail.example.com"],
    ["con punto en el local", "first.last@example.com"],
    ["con guion", "user-name@example.co"],
    ["con plus", "user+tag@example.com"],
  ])("acepta email valido: %s", (_label, email) => {
    const result = validateContactInput({ ...validBase, email });
    expect(result.ok).toBe(true);
  });

  it("rechaza email que excede el maximo", () => {
    const longEmail = "a".repeat(140) + "@example.com";
    const result = validateContactInput({ ...validBase, email: longEmail });
    expect(result.ok).toBe(false);
  });
});

describe("validateContactInput - mensaje", () => {
  const validBase = {
    name: "Camila",
    email: "test@example.com",
  };

  it("rechaza mensaje vacio", () => {
    const result = validateContactInput({ ...validBase, message: "" });
    expect(result.ok).toBe(false);
  });

  it("rechaza mensaje muy corto", () => {
    const result = validateContactInput({
      ...validBase,
      message: "Hola",
    });
    expect(result.ok).toBe(false);
  });

  it("acepta mensaje con longitud minima", () => {
    const result = validateContactInput({
      ...validBase,
      message: "A".repeat(MESSAGE_MIN),
    });
    expect(result.ok).toBe(true);
  });

  it("acepta mensaje con longitud maxima", () => {
    const result = validateContactInput({
      ...validBase,
      message: "A".repeat(MESSAGE_MAX),
    });
    expect(result.ok).toBe(true);
  });

  it("rechaza mensaje que excede el maximo", () => {
    const result = validateContactInput({
      ...validBase,
      message: "A".repeat(MESSAGE_MAX + 1),
    });
    expect(result.ok).toBe(false);
  });
});

describe("validateContactInput - retorno con datos", () => {
  it("retorna los datos limpios (trimmed) cuando todo es valido", () => {
    const result = validateContactInput({
      name: "  Camila  ",
      email: "  test@example.com  ",
      message: "  Hola, este es un mensaje de prueba  ",
    });
    expect(result.ok).toBe(true);
    if (result.ok && !result.honeypot) {
      expect(result.data).toEqual({
        name: "Camila",
        email: "test@example.com",
        message: "Hola, este es un mensaje de prueba",
      });
    }
  });
});

describe("EMAIL_RE - regex de email", () => {
  it("acepta formatos comunes", () => {
    expect(EMAIL_RE.test("test@example.com")).toBe(true);
    expect(EMAIL_RE.test("a@b.co")).toBe(true);
  });

  it("rechaza formatos malformados", () => {
    expect(EMAIL_RE.test("test")).toBe(false);
    expect(EMAIL_RE.test("test@")).toBe(false);
    expect(EMAIL_RE.test("@example.com")).toBe(false);
  });
});
