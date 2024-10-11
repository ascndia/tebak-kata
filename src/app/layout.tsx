import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GameProvider from "@/context/GameProvider";
import { ThemeProvider } from "next-themes";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tebak Kata",
  description: "Game Tebak Kata by @ruwwww_",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider enableSystem={false} attribute="class">
          <GameProvider>{children}</GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
