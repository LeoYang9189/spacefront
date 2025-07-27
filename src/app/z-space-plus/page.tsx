'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

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
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
          <motion.div 
            className="text-white space-y-8"
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-brand-100 text-lg md:text-xl mb-4 font-medium">业务范围</h3>
                <p className="text-white/90 leading-relaxed">
                  ZSPACEPLUS是一家专注集合品牌的渠道运营商，致力于为广大从事进口家居产品销售的伙伴们提供全球进口家具、进口灯具、进口饰品、面料、墙纸、石材、饰面产品等咨询服务；
                </p>
              </div>
              <div className="flex-1">
                <h3 className="text-brand-100 text-lg md:text-xl mb-4 font-medium">创新服务</h3>
                <p className="text-white/90 leading-relaxed">
                  持续发布世界各地的艺术家居新品，运用现代科技协助客户解决选品难及国际供应链周期长的问题；
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-brand-100 text-lg md:text-xl mb-4 font-medium">品牌体验</h3>
              <p className="text-white/90 leading-relaxed">
                同时ZSPACEPLUS展厅打造集合品牌的沉浸式体验，品味生活，培训教育服务，定制服务，追寻属于自己的LIFESTYLE。
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
        <h3 className="text-2xl font-bold mb-6 text-brand-600">展厅实景</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-48 overflow-hidden rounded-lg group"
            >
              <Image
                src={`/about/image${index}.jpg`}
                alt={`展厅照片 ${index}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
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
          <h3 className="text-xl font-medium">展厅地址</h3>
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <p className="text-lg text-brand-100 max-w-2xl mx-auto">
          上海市嘉定区曹安东路98号赛创新贸易商务中心5号楼1-2层
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
            {[
              { title: '公众号', image: '/qr/wechat-public.png' },
              { title: '微博号', image: '/qr/weibo.png' },
              { title: '抖音号', image: '/qr/douyin.png' },
              { title: '小红书', image: '/qr/xiaohongshu.png' },
              { title: '企业微信', image: '/qr/wechat-work.png' }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="text-center group"
              >
                <div className="w-32 h-32 relative mb-4 bg-white rounded-2xl p-4 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-white font-medium group-hover:text-brand-100 transition-colors">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 