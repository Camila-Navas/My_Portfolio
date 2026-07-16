import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("ContactForm - render", () => {
  it("renderiza los tres campos requeridos", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
  });

  it("renderiza el boton de envio con texto inicial", () => {
    render(<ContactForm />);
    const button = screen.getByRole("button", { name: /enviar mensaje/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("incluye un campo honeypot oculto llamado 'website'", () => {
    const { container } = render(<ContactForm />);
    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).toBeTruthy();
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
    expect(honeypot).toHaveAttribute("tabIndex", "-1");
  });

  it("muestra el contador de caracteres del mensaje en 0/2000 al inicio", () => {
    render(<ContactForm />);
    expect(screen.getByText("0/2000")).toBeInTheDocument();
  });

  it("muestra la nota de privacidad debajo del boton", () => {
    render(<ContactForm />);
    expect(
      screen.getByText(/no comparto datos con terceros/i)
    ).toBeInTheDocument();
  });
});

describe("ContactForm - contador de caracteres", () => {
  it("actualiza el contador cuando se escribe en el textarea", () => {
    render(<ContactForm />);
    const textarea = screen.getByLabelText(/mensaje/i);
    fireEvent.change(textarea, { target: { value: "Hola mundo" } });
    expect(screen.getByText("10/2000")).toBeInTheDocument();
  });
});

describe("ContactForm - submit", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("envia POST a /api/contact con los datos del formulario", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    global.fetch = fetchMock;

    const { container } = render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "Camila" },
    });
    fireEvent.change(screen.getByLabelText(/correo/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: "Mensaje de prueba largo suficiente" },
    });

    const form = container.querySelector("form");
    if (!form) throw new Error("form no encontrado");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    const call = fetchMock.mock.calls[0];
    const init = call[1] as RequestInit;
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      name: "Camila",
      email: "test@example.com",
      message: "Mensaje de prueba largo suficiente",
    });
  });
});
