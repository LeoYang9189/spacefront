"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import EmojiFallEffect from "@/components/EmojiFallEffect";
import { Providers } from "./providers";
import { useEffect } from "react";
import { fetchCategories, fetchCompanyInfo } from "@/api/common";
import useStore from "@/store/useStore";
import { tryCatch } from "@/utils/util";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCompanyInfo, setCategories } = useStore();
  useEffect(() => {
    const getCompanyInfo = async () => {
      const [err, res] = await tryCatch(fetchCompanyInfo);
      if (err) return;
      setCompanyInfo(res);
    };
    getCompanyInfo();

    const getCategoryList = async () => {
      const [err, res] = await tryCatch(fetchCategories);
      if (err) return;
      setCategories(res);
    };
    getCategoryList();
  }, []);

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
