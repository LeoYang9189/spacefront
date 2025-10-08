"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getBrandDetail } from "@/api/stock";
import { tryCatch } from "@/utils/util";
export default function BrandDetail() {
  const router = useRouter();
  const params = useParams();
  const [detailInfo, setDetailInfo] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailInfo = async () => {
      const [err, res] = await tryCatch(getBrandDetail, { id: params.id });
      if (err) return;
      console.log(res);
      setDetailInfo(res);
    };
    fetchDetailInfo();
  }, []);

  return (
    <main className="min-h-screen bg-white pt-32 pb-16">
      {/* 品牌标题 */}
      <div className="container mx-auto px-4 text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          {detailInfo.brandName}
        </motion.h1>

        {/* 渐变横线装饰 */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-96 h-0.5 mx-auto mb-8 bg-gradient-to-r from-transparent via-brand-600 to-transparent"
        ></motion.div>

        {/* 品牌大图 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-4xl mx-auto mb-12"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={detailInfo.brandLogo}
              alt="{detailInfo.brandName}"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </motion.div>

        {/* 两个按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
        >
          <a
            href={detailInfo.atlasLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors text-lg font-medium min-w-[200px] cursor-pointer"
          >
            查看产品图册
          </a>
          <a
            href={detailInfo.brandWebsiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-brand-600 text-brand-600 rounded-full hover:bg-brand-600 hover:text-white transition-colors text-lg font-medium min-w-[200px] cursor-pointer"
          >
            进入品牌官网
          </a>
        </motion.div>

        {/* 品牌说明文字 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            {detailInfo.brandBlurb}
          </p>
        </motion.div>
      </div>

      {/* 产品图片展示 */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 使用固定的两张图片 */}
          {/* {["/images/1.png", "/images/2.png"].map(
            (image: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative w-full cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full">
                  <Image
                    src={image}
                    alt={`TOM DIXON 产品展示 ${index + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </motion.div>
            )
          )} */}

          {/* 如果有API返回的图片，也按照同样的布局显示 */}
          {detailInfo.atlasList &&
            detailInfo.atlasList.map((image: string, index: number) => (
              <motion.div
                key={`api-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 2) * 0.2 }}
                className="relative w-full cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full">
                  <Image
                    src={image}
                    alt={`产品图片 ${index + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </motion.div>
            ))}
        </div>
      </div>
      {/* 图片预览模态框 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="预览图片"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
