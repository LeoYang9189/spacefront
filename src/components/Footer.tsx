"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useStore from "@/store/useStore";

const Footer = () => {
  const { companyInfo } = useStore();

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
                <p className="text-xl font-bold text-white">
                  {companyInfo?.phone}
                </p>
                <p className="text-white/80 text-sm">
                  邮箱：{companyInfo?.email}
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="text-white/80 text-sm flex">
                  <span>地址：</span>
                  <div>
                    {companyInfo?.address.split("\n").map((item: any) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* 融合的底部信息 */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-white/60">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <span>{companyInfo?.description}</span>
                  <span>备案号：{companyInfo?.filing}</span>
                </div>
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
              {companyInfo?.qrcodeList[0] && companyInfo?.qrcodeList[0].url && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-white p-1.5 rounded-lg mb-2">
                    <Image
                      src={companyInfo?.qrcodeList[0].url}
                      alt="官方微信"
                      width={80}
                      height={80}
                      className="w-full h-full rounded"
                    />
                  </div>
                  <p className="text-xs text-white/70">
                    {companyInfo?.qrcodeList[0].name}
                  </p>
                </div>
              )}

              {companyInfo?.qrcodeList[1] && companyInfo?.qrcodeList[1].url && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-white p-1.5 rounded-lg mb-2">
                    <Image
                      src={companyInfo?.qrcodeList[1].url}
                      alt="官方商城"
                      width={80}
                      height={80}
                      className="w-full h-full rounded"
                    />
                  </div>
                  <p className="text-xs text-white/70">
                    {companyInfo?.qrcodeList[1].name}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
