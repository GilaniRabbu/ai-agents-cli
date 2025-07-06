import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Providers } from "@/redux/provider";
// import { SessionProvider } from "next-auth/react";
import "./globals.css";

const geist = Geist_Mono({
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ArkLab AI Agents Catalog",
  description: "Browse a server-rendered catalog of intelligent AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
