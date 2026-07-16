import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContactInput } from "@/src/lib/contact-validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateContactInput(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (result.honeypot) {
      return NextResponse.json({ success: true });
    }

    const { name, email, message } = result.data;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.CONTACT_EMAIL_TO || "camilanavas13@gmail.com";
    const fromEmail =
      process.env.CONTACT_EMAIL_FROM ||
      "Portafolio <onboarding@resend.dev>";

    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY no configurado");
      return NextResponse.json(
        { error: "Servicio de correo no configurado" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} desde el portafolio`,
      text: [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Error inesperado:", err);
    return NextResponse.json({ error: "Error inesperado" }, { status: 500 });
  }
}
