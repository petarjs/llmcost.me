import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import "./globals.css";

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
  title:
    "LLM Cost Calculator - Estimate AI Project Costs with Precision | Automateo",
  description:
    "Easily calculate the costs of using large language models (LLMs) like GPT-3.5-turbo with our LLM Cost Calculator. Plan your AI budget based on model usage, input/output tokens, and number of users. Powered by Automateo for accurate AI cost insights.",
  openGraph: {
    images: [
      {
        url: "https://automateo.b-cdn.net/llmcost/cover.jpeg",
      },
    ],
  },
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
