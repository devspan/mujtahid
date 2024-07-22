// app/layout.tsx

import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";

const amiri = Amiri({ 
  subsets: ["arabic", "latin"],
  weight: ['400', '700'],
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  title: "Mujtahid - Islamic Hadith Analysis Platform",
  description: "Explore and analyze Islamic Hadiths with advanced search and AI-powered insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${amiri.variable}`}>
      <body className="font-amiri">{children}</body>
    </html>
  );
}
