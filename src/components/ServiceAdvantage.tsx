"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaTruck, FaClock } from "react-icons/fa";
import useStore from "@/store/useStore";
import { cloneDeep } from "lodash";

const ServiceAdvantage = () => {
  const { companyInfo } = useStore();

  const advantages = useMemo<any[]>(() => {
    if (companyInfo?.serviceList) {
      const arr = cloneDeep(companyInfo.serviceList);
      arr[0].icon = <FaRocket className="w-12 h-12" />;
      arr[1].icon = <FaTruck className="w-12 h-12" />;
      arr[2].icon = <FaClock className="w-12 h-12" />;
      return arr;
    }

    return [];
  }, [companyInfo]);

  return (
    <section className="w-full bg-brand-600 text-white py-12">
      <div className="container mx-auto px-4">
        {/* 标题部分 */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-2"
          >
            Service
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-end gap-4 border-b border-white/10 pb-2"
          >
            <h3 className="text-3xl font-bold">服务优势</h3>
            <div className="relative">
              <p className="text-lg font-bold text-white/80 mb-1">
                全球甄选 合作省心
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* 优势展示部分 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.url}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              {/* 图片容器 */}
              <div className="relative h-80 overflow-hidden rounded-2xl mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <img
                  src={advantage.url}
                  alt={advantage.string1}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                {/* 大标题 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <span className="text-8xl font-bold text-white transform -translate-y-6 group-hover:-translate-y-10 transition-transform duration-500">
                      {advantage.string1}
                    </span>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-t from-brand-600/80 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* 描述部分 */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  {advantage.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-1">
                    {advantage.string2}
                  </h4>
                  <p className="text-white/80">{advantage.string3}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAdvantage;
