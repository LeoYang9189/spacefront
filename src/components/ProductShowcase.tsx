"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { getBanner2List } from "@/api/common";
import { tryCatch } from "@/utils/util";

// const products = [
//   {
//     id: 1,
//     name: 'AGO LIGHTING Cirkus吊灯',
//     brand: '韩国 AGO LIGHTING',
//     designer: 'Bymars',
//     image: '/new1.jpg',
//   },
//   {
//     id: 2,
//     name: 'AGO LIGHTING Cirkus吊灯',
//     brand: '韩国 AGO LIGHTING',
//     designer: 'Bymars',
//     image: '/new2.jpg',
//   },
//   {
//     id: 3,
//     name: 'AGO LIGHTING Cirkus吊灯',
//     brand: '韩国 AGO LIGHTING',
//     designer: 'Bymars',
//     image: '/new3.jpg',
//   },
// ]

interface Product {
  coverImage: string;
  title: string;
  introduce: string;
  designer: string;
}

const ProductShowcase = () => {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const getBanner2ListData = async () => {
      const [err, list] = await tryCatch(getBanner2List);
      if (err) return;
      setProducts(list.filter((item: any) => item.status !== false));
      setMounted(true);
    };
    getBanner2ListData();
  }, []);

  if (!mounted) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const getIntroduce = (item: Product) => {
    if (!item.introduce) return null;
    return (
      <p className="text-[#235A5A] text-[16px] pb-[7px]">
        品牌介绍:{products[currentSlide].introduce}
      </p>
    );
  };
  const getDesigner = (item: Product) => {
    if (!item.designer) return null;
    return <p className="text-[#235A5A] pt-[7px]">设计师:{item.designer}</p>;
  };

  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-brand-600 text-4xl font-bold mb-2">Product</h2>
          <div className="flex items-end gap-4 border-b border-gray-100 pb-2">
            <h3 className="text-3xl font-bold text-brand-600">设计严选</h3>
            {/* <div className="relative">
              <p className="text-lg font-bold text-brand-400 mb-1">
                毫不费力 创意开关
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-400/50 to-transparent"></div>
            </div> */}
          </div>
        </div>

        <div className="flex gap-12">
          {/* 左侧导航 */}
          <div className="w-48">
            <nav className="space-y-6">
              <Link
                href="/products/furniture"
                className="group block relative py-2"
              >
                <span className="block text-xl font-medium text-gray-600 group-hover:text-brand-600 transition-colors">
                  家具
                </span>
                {/* <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 transition-all group-hover:w-full"></span> */}
              </Link>
              <Link
                href="/products/lighting"
                className="group block relative py-2"
              >
                <span className="block text-xl font-medium text-brand-600">
                  灯具
                </span>
                {/* <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-brand-600 transition-all group-hover:w-full"></span> */}
              </Link>
              <Link
                href="/products/decor"
                className="group block relative py-2"
              >
                <span className="block text-xl font-medium text-gray-600 group-hover:text-brand-600 transition-colors">
                  配饰
                </span>
                {/* <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 transition-all group-hover:w-full"></span> */}
              </Link>
            </nav>
          </div>

          {/* 右侧轮播 */}
          <div className="flex-1">
            <div className="relative h-[580px] overflow-hidden rounded-lg bg-white-50">
              <motion.div
                className="absolute w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={products[currentSlide].coverImage}
                  alt={products[currentSlide].title}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                />
                <div className="absolute top-[326px] right-[228px] ">
                  <p
                    className="w-fit text-[#1C4848] font-bold text-[20px] pb-[34px] mb-[30px]"
                    style={
                      products[currentSlide].introduce ||
                      products[currentSlide].designer
                        ? {
                            borderBottom: "1px solid #235A5A",
                          }
                        : {}
                    }
                  >
                    {products[currentSlide].title}
                  </p>
                  <div>
                    {getIntroduce(products[currentSlide])}
                    {getDesigner(products[currentSlide])}
                  </div>
                </div>
              </motion.div>

              {/* 导航按钮 */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-3 rounded-full text-brand-600 transition-colors"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-3 rounded-full text-brand-600 transition-colors"
              >
                <FaChevronRight size={24} />
              </button>

              {/* 轮播指示器 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? "bg-brand-600 w-6"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
