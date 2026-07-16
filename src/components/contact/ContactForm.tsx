"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MAX_NAME = 100;
const MAX_EMAIL = 150;
const MAX_MESSAGE = 2000;
const MIN_MESSAGE = 10;

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;

    setIsPending(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.error || "No se pudo enviar el mensaje");
        return;
      }

      toast.success("Mensaje enviado. Te respondere lo antes posible.");
      form.reset();
      setMessageLength(0);
    } catch {
      toast.error("Error de red. Intenta de nuevo en unos segundos.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 0,
          height: 0,
          opacity: 0,
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={MAX_NAME}
            placeholder="Tu nombre"
            disabled={isPending}
            autoComplete="name"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={MAX_EMAIL}
            placeholder="tucorreo@dominio.com"
            disabled={isPending}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-gray-700"
          >
            Mensaje
          </label>
          <span
            className={`text-xs ${
              messageLength > MAX_MESSAGE
                ? "text-red-600"
                : "text-gray-400"
            }`}
          >
            {messageLength}/{MAX_MESSAGE}
          </span>
        </div>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          minLength={MIN_MESSAGE}
          maxLength={MAX_MESSAGE}
          placeholder="Cuentame sobre tu proyecto, oferta o consulta..."
          disabled={isPending}
          onChange={(e) => setMessageLength(e.currentTarget.value.length)}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full font-semibold bg-black hover:bg-gray-800 text-white border-0 shadow-sm"
      >
        {isPending ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={18} className="mr-2" />
            Enviar mensaje
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Tu correo solo se usa para responderte. No comparto datos con terceros.
      </p>
    </form>
  );
}
