import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rodrigo & Nathália",
  description: "06 de Agosto de 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}