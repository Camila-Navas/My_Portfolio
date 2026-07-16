export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_MIN = 2;
export const NAME_MAX = 100;
export const EMAIL_MAX = 150;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

export type ContactInput = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

export type ValidatedData = {
  name: string;
  email: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; data: ValidatedData }
  | { ok: false; error: string };

export function validateContactInput(input: ContactInput): ValidationResult {
  const honeypot = typeof input.website === "string" ? input.website : "";
  if (honeypot.length > 0) {
    return { ok: true, honeypot: true };
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message =
    typeof input.message === "string" ? input.message.trim() : "";

  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return {
      ok: false,
      error: `El nombre debe tener entre ${NAME_MIN} y ${NAME_MAX} caracteres`,
    };
  }
  if (!EMAIL_RE.test(email) || email.length > EMAIL_MAX) {
    return { ok: false, error: "Correo electronico invalido" };
  }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return {
      ok: false,
      error: `El mensaje debe tener entre ${MESSAGE_MIN} y ${MESSAGE_MAX} caracteres`,
    };
  }

  return { ok: true, honeypot: false, data: { name, email, message } };
}
