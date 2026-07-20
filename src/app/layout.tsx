import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Providers from "../components/section/Providers";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "../components/themeProvider/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://camila-portfolio.vercel.app";
const SITE_NAME = "Camila Vesga Navas - Portafolio";
const TITLE = "Camila Vesga Navas | Software Developer & QA Analyst";
const DESCRIPTION =
  "Portafolio profesional de Camila Vesga Navas. Software Developer, QA Analyst e IT Support. Tecnologa en Analisis y Desarrollo de Software (SENA) y estudiante de Ingenieria de Sistemas (UNAD), con experiencia en ODIR Certificaciones combinando desarrollo, QA y soporte tecnico.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Camila Vesga Navas",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Camila Vesga Navas", url: SITE_URL }],
  creator: "Camila Vesga Navas",
  publisher: "Camila Vesga Navas",
  category: "portfolio",
  keywords: [
    "Maria Camila Vesga Navas",
    "Camila Vesga Navas",
    "Camila Navas",
    "Software Developer",
    "QA Analyst",
    "IT Support",
    "Automatizacion de Pruebas",
    "Resolucion de Incidencias",
    "Tecnologa en Analisis y Desarrollo de Software",
    "Desarrolladora Full Stack",
    "Auxiliar de Sistemas",
    "ODIR Certificaciones",
    "Portafolio Colombia",
    "Next.js",
    "React",
    "TypeScript",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
