import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Rodrigo & Nathália",
  description: "Casamento • 06 de Agosto de 2026",
  openGraph: {
    title: "Rodrigo & Nathália",
    description: "Casamento • 06 de Agosto de 2026",
    images: [
      {
        url: "/og-image.png", 
        width: 1284,
        height: 836,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
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