"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getBrandList } from "@/api/stock";
import { tryCatch } from "@/utils/util";

const ITEMS_PER_PAGE = 6;

const GlobalFurniture = () => {
  const [brandList, setBrandList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(brandList.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const getBrandListData = async () => {
      const [err, res] = await tryCatch(getBrandList, {
        pageNum: currentPage,
        pageSize: ITEMS_PER_PAGE,
      });
      if (err) return;
      setBrandList(res.records.filter((item: any) => item.effectiveFlag));
    };
    getBrandListData();
  }, []);

  // 获取当前页的品牌
  const getCurrentBrands = () => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return brandList.slice(start, end);
  };

  return (
    <>
      <main className="min-h-screen bg-white pt-16">
        {/* 页面标题 */}
        <div className="bg-brand-600 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              进口家具全球购
            </h1>
            <p className="text-brand-100 text-center mt-4 text-lg">
              甄选全球顶级家具品牌，打造专属于您的品质生活
            </p>
          </div>
        </div>

        {/* 品牌展示网格 */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentBrands().map((brand: any, index: number) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <Link href={`/brands/detail/${brand.id}`} className="block">
                  {/* 图片容器 */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={brand.brandLogo}
                      alt={brand.brandName}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* 渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* 品牌名称 */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">
                      {brand.brandName}
                    </h3>
                    <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {brand.subProductName}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 分页器 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                <ChevronLeftIcon className="w-6 h-6 text-brand-600" />
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        currentPage === page
                          ? "bg-brand-600 text-white"
                          : "text-brand-600 hover:bg-brand-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                <ChevronRightIcon className="w-6 h-6 text-brand-600" />
              </button>
            </div>
          )}
        </div>

        {/* 底部说明 */}
        <div className="container mx-auto px-4 pb-16">
          <div className="text-center text-gray-600">
            <p className="mb-4">我们与全球顶级家具品牌保持长期合作关系</p>
            <p>为您提供原装正品、专业配送、品质保障服务</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default GlobalFurniture;
