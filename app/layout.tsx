import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Providers } from "@/redux/provider";
import "./globals.css";
import { ClientProviders } from "./client-provider";

const geist = Geist_Mono({
  weight: ["400", "700"],
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
        <ClientProviders>
          <Providers>{children}</Providers>
        </ClientProviders>
      </body>
    </html>
  );
}
