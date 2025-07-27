"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import EmojiFallEffect from "@/components/EmojiFallEffect";
import { Providers } from "./providers";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <EmojiFallEffect />
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
