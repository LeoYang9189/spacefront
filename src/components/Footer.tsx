"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-brand-600 text-white pt-8 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 联系信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h4 className="text-lg font-medium mb-3 pb-2 border-b border-white/10">
              联系我们
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <p className="text-xl font-bold text-white">021-61259481</p>
                <p className="text-white/80 text-sm">
                  邮箱：info@zspaceplus.com
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white/80 text-sm">
                  地址：上海市嘉定区娄塘路988弄
                </p>
                <p className="text-white/80 text-sm">
                  慧创园视界南写字楼1号5号1-2层
                </p>
              </div>
            </div>
            {/* 融合的底部信息 */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-white/60">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <span>ZSPACEPLUS是一家专注集合品牌的渠道运营商</span>
                  <span>备案号：沪ICP备20024331号</span>
                </div>
                <a
                  href="https://www.baidu.com/s?wd=zspaceplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80 transition-colors duration-300"
                >
                  百度统计
                </a>
              </div>
            </div>
          </motion.div>

          {/* 二维码 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="flex gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-white p-1.5 rounded-lg mb-2">
                  <Image
                    src="/qr-weixin.jpg"
                    alt="官方微信"
                    width={80}
                    height={80}
                    className="w-full h-full rounded"
                  />
                </div>
                <p className="text-xs text-white/70">官方微信</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white p-1.5 rounded-lg mb-2">
                  <Image
                    src="/qr-web.jpg"
                    alt="官方商城"
                    width={80}
                    height={80}
                    className="w-full h-full rounded"
                  />
                </div>
                <p className="text-xs text-white/70">官方商城</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
