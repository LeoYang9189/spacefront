"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import useStore from "@/store/useStore";
import { useMemo } from "react";

export default function ZSpacePlusPage() {
  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const { companyInfo } = useStore();

  const aboutList = useMemo(() => {
    return companyInfo?.customFields || [];
  }, [companyInfo]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-600 to-brand-700">
      {/* 头部标题区域 */}
      <div className="pt-32 pb-16 text-center text-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('/about/image1.jpg')] bg-cover bg-center bg-no-repeat filter blur-lg"
        />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            关于 ZSPACEPLUS
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-brand-100"
          >
            ABOUT ZSPACEPLUS
          </motion.h2>
        </div>
      </div>

      {/* 公司简介 */}
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <motion.div className="text-white space-y-8" variants={fadeInUp}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-brand-100 text-lg md:text-xl mb-4 font-medium">
                  {aboutList[0]?.title}
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {aboutList[0]?.content}
                </p>
              </div>
              <div className="flex-1">
                <h3 className="text-brand-100 text-lg md:text-xl mb-4 font-medium">
                  {aboutList[1]?.title}
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {aboutList[1]?.content}
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-brand-100 text-lg md:text-xl mb-4 font-medium">
                {aboutList[2]?.title}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {aboutList[2]?.content}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 展厅照片部分 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12"
      >
        <h3 className="text-2xl text-center mb-10 text-white">展厅实景</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {companyInfo?.showroomImageList && companyInfo.showroomImageList.length > 0 ? (
            companyInfo.showroomImageList.map((image: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-48 overflow-hidden rounded-lg group"
              >
                <Image
                  src={image.url || ''}
                  alt={`展厅照片 ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))
          ) : (
            // 降级方案：如果没有配置图片，显示占位提示
            <div className="col-span-full text-center text-white/60 py-8">
              暂无展厅实景图片
            </div>
          )}
        </div>
      </motion.div>

      {/* 地址信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="container mx-auto px-4 py-16 text-white text-center"
      >
        <div className="inline-flex items-center justify-center gap-4 mb-6 px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm">
          <div className="w-2 h-2 bg-white rounded-full" />
          <h3 className="text-xl font-medium">{aboutList[3]?.title}</h3>
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <p className="text-lg text-brand-100 max-w-2xl mx-auto">
          {aboutList[3]?.content}
        </p>
      </motion.div>

      {/* 二维码区域 */}
      <div className="bg-white/5 backdrop-blur-md py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
            {companyInfo?.mediaQrcodeList?.map((item: any, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="text-center group"
              >
                <div className="w-32 h-32 relative mb-4 bg-white rounded-2xl p-4 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-white font-medium group-hover:text-brand-100 transition-colors">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
