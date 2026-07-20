import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { NotesProvider } from "@/components/NotesProvider";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roadbook Alemania — Ruta Camper",
  description:
    "Guía de viaje colaborativa para la ruta camper por el sur de Alemania: qué ver, costes, parking, transporte y checklist compartida.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Roadbook DE",
  },
  icons: {
    icon: [{ url: "/icons/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={sans.variable}>
      <body className="font-sans antialiased bg-ink text-[#e8edf2]">
        <NotesProvider>{children}</NotesProvider>
      </body>
    </html>
  );
}
