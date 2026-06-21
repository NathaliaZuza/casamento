import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://casamentonathaliaerodrigo.com.br/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rodrigo & Nathália",
  description: "Casamento • 06 de Agosto de 2026",

  openGraph: {
    title: "Rodrigo & Nathália",
    description: "Casamento • 06 de Agosto de 2026",
    type: "website",

    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Rodrigo & Nathália",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: [`${siteUrl}/og-image.jpg`],
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
