import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BERBER CARS — Auto Serwis | Geometria 3D | Katowice",
  description:
    "Auto Serwis BERBER CARS: Geometria 3D, diagnostyka, elektronika. Roździeńska 41, Katowice. Umów wizytę.",
  metadataBase: new URL("https://example.com"), // при деплое поставь свой домен
  openGraph: {
    title: "BERBER CARS — Auto Serwis",
    description:
      "Geometria 3D, diagnostyka, elektronika. Roździeńska 41, Katowice.",
    type: "website",
    images: [
      {
        url: "/brand/hero-logo.png",
        width: 1200,
        height: 630,
        alt: "BERBER CARS — logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BERBER CARS — Auto Serwis",
    description:
      "Geometria 3D, diagnostyka, elektronika. Roździeńska 41, Katowice.",
    images: ["/brand/hero-logo.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        {/* Шрифты для заголовков/текста */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@400;500;700&family=Oswald:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0b0b0d" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
