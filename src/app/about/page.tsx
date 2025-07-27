'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function AboutPage() {
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
    <main className="min-h-screen bg-brand-600">
      {/* 头部标题区域 */}
      <div className="pt-32 pb-16 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
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

      {/* 公司简介 */}
      <motion.div 
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12 text-white"
      >
        <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center mb-16">
          ZSPACEPLUS是一家专注集合品牌的美道运营商，致力于为广大从事进口家居产品销售的伙伴们提供全球进口家具、进口灯具、进口饰品、面料、墙纸、石材、饰面产品等咨询服务；持续发布世界各地的艺术家居新品，运用现代科技协助客户解决选品难及国际供应链周期长的问题；同时ZSPACEPLUS展厅打造集合品牌的沉浸式体验，品味生活，培训教育服务，定制服务，追寻属于自己的LIFESTYLE。
        </p>
      </motion.div>

      {/* 展厅图片展示 */}
      <motion.div 
        ref={ref2}
        initial="hidden"
        animate={inView2 ? "visible" : "hidden"}
        variants={staggerChildren}
        className="container mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative h-72 overflow-hidden rounded-2xl group"
            >
              <Image
                src={`/about/image${index}.jpg`}
                alt={`展厅图片 ${index}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
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
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 bg-white rounded-full" />
          <h3 className="text-xl font-medium">展厅地址</h3>
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <p className="text-lg text-brand-100">
          上海市嘉定区曹安东路98号赛创新贸易商务中心5号楼1-2层
        </p>
      </motion.div>

      {/* 二维码区域 */}
      <div className="bg-white py-16">
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-center"
              >
                <div className="w-32 h-32 relative mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-brand-600 font-medium">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 