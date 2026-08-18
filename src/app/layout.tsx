import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/syncfusion-license";

import { AppProviders } from "@/components/providers/AppProviders";
import { MainLayoutWrapper } from "@/components/layout/MainLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KEY360 Syncfusion Metadata-Driven Enterprise Portal",
  description: "Metadata-driven UI framework with Syncfusion React components, TanStack Query, and REST/MCP API compatibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
        <AppProviders>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}
