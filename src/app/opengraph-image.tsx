import { ImageResponse } from "next/og";

export const alt = "Camila Vesga Navas - Software Developer, QA Analyst, IT Support";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 40,
            padding: "10px 22px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 16px #22c55e",
            }}
          />
          <span style={{ fontSize: 24, color: "#d4d4d8" }}>
            Disponible para trabajar
          </span>
        </div>

        <h1
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1,
            margin: 0,
            color: "#ffffff",
          }}
        >
          Camila
        </h1>
        <h1
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            margin: 0,
            background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Vesga Navas
        </h1>

        <p
          style={{
            fontSize: 34,
            color: "#e4e4e7",
            marginTop: 36,
            marginBottom: 0,
            fontWeight: 500,
          }}
        >
          Software Developer | QA Analyst | IT Support
        </p>

        <p
          style={{
            fontSize: 26,
            color: "#a1a1aa",
            marginTop: 14,
            marginBottom: 0,
          }}
        >
          Tecnologa en Analisis y Desarrollo de Software
        </p>

        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 60,
            left: 80,
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#000000",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            C
          </div>
          <span style={{ fontSize: 22, color: "#a1a1aa" }}>
            github.com/Camila-Navas
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
