import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thai Fund Compare - เปรียบเทียบกองทุนรวมไทย",
  description: "Compare Thai mutual funds NAV with SEC API data and Yahoo Finance charts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
