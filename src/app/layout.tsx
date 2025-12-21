import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TLEYOU — Набор для медитации и ритуал возвращения к себе",
  description: "Набор для медитации и осознанности для женщин. Травяные скрутки, карточки для рефлексии и керамическая подставка. 30 дней гарантия. Доставка по России.",
  keywords: [
    "TLEYOU",
    "набор для медитации",
    "ритуал для женщин",
    "практики осознанности",
    "травяные скрутки",
    "карточки для рефлексии",
    "забота о себе",
    "возвращение к себе",
    "медитация для начинающих",
    "подарок для женщины",
  ],
  openGraph: {
    title: "TLEYOU — Набор для медитации и ритуал возвращения к себе",
    description: "10 минут тишины каждый день. Травяная скрутка, карточка с вопросом и ты — наедине с собой.",
    type: "website",
    locale: "ru_RU",
    siteName: "TLEYOU",
  },
  twitter: {
    card: "summary_large_image",
    title: "TLEYOU — Набор для медитации",
    description: "Ритуал возвращения к себе для женщин",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
