import type { Metadata } from "next";

const siteUrl = "https://casamentonathaliaerodrigo.com.br";

export const metadata: Metadata = {
  title: "Lista de Presentes",
  openGraph: {
    images: [
      {
        url: `${siteUrl}/og-presentes.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};
