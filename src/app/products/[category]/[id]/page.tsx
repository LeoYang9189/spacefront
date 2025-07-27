"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getProductDetail, getProductRecommend } from "@/api/stock";
import { tryCatch } from "@/utils/util";

export default function ProductDetail() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productDetail, setProductDetail] = useState<any>(null);
  const [recommendProducts, setRecommendProducts] = useState<any[]>([]);
  const router = useRouter();
  const params = useParams();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + productImages.length) % (productImages.length || 1)
    );
  };
  // 获取产品详情
  const fetchProductDetail = async () => {
    try {
      const data = await getProductDetail({ id: params.id });
      setProductDetail(data);
      // 设置轮播图
      Array.isArray(data?.productCoverImageList) &&
        setProductImages(data.productCoverImageList);
    } catch (error) {
      console.error("Failed to fetch product detail:", error);
    }
  };

  // 获取推荐商品
  const fetchProductRecommend = async () => {
    const [err, res] = await tryCatch(getProductRecommend, {
      largeCategory: params.category,
      randFlag: true,
    });
    if (err) return;
    setRecommendProducts(res.records);
  };
  useEffect(() => {
    fetchProductDetail();
    fetchProductRecommend();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* 产品详情顶部 */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左侧轮播图 */}
          {productImages.length > 0 && (
            <div className="relative h-[500px] bg-gray-50 rounded-lg overflow-hidden">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={productImages[currentSlide] || ""}
                  alt="产品图片"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* 轮播按钮 */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-brand-600 transition-colors"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-brand-600 transition-colors"
              >
                <FaChevronRight size={20} />
              </button>

              {/* 轮播指示器 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? "bg-brand-600 w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 右侧产品信息 */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productDetail?.productName}
              </h1>
              <p className="text-xl text-brand-600">
                {productDetail?.subProductName}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                {productDetail?.productBlurb}
              </p>
            </div>

            {/* 小程序码 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32">
                  <Image
                    src={productDetail?.qrcode || "/qr-weixin.jpg"}
                    alt="小程序码"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    扫码查看更多详情
                  </p>
                  <p className="text-gray-500">了解产品规格、价格等信息</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 产品详情模块 */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* 商品参数 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">商品参数</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                <span className="text-gray-500">材质</span>
                <span className="text-gray-900">
                  {productDetail?.productParameter["材质"]}
                </span>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                <span className="text-gray-500">尺寸</span>
                <span className="text-gray-900">
                  {productDetail?.productParameter["尺寸"]}
                </span>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                <span className="text-gray-500">光源</span>
                <span className="text-gray-900">
                  {productDetail?.productParameter["光源"]}
                </span>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                <span className="text-gray-500">颜色</span>
                <span className="text-gray-900">
                  {productDetail?.productParameter["颜色"]}
                </span>
              </div>
            </div>
          </section>

          {/* 设计师介绍 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              设计师介绍
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-gray-600"
              dangerouslySetInnerHTML={{
                __html: productDetail?.designerIntroduction,
              }}
            ></div>
            {/* <div className="relative h-[300px] md:col-span-1 rounded-lg overflow-hidden">
                <Image
                  src="/new3.jpg"
                  alt="设计师照片"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Umut Yamac
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Umut Yamac 是一位建筑师和设计师，在伦敦工作和生活。
                  他的作品探索物体、空间和它们与使用者之间的关系。
                  每件作品都融合了精确的几何结构和诗意的品质。
                  他的设计常常包含动态元素，让作品能够回应和互动。
                </p>
              </div> */}
          </section>

          {/* 产品介绍 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">产品介绍</h2>
            <div
              className="grid grid-cols-1 gap-8 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: productDetail?.productShow,
              }}
            ></div>
            {/* <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/new1.jpg"
                  alt="产品介绍图"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-600 leading-relaxed">
                  Perch Light 是对自然界中鸟类优雅姿态的致敬。
                  设计师通过折纸艺术，将简单的纸张转化为栩栩如生的鸟形灯具。
                  当光线透过纸张时，会创造出柔和而温暖的光晕，为空间增添一份诗意。
                  灯具的底座采用优质黄铜材质，既保证了稳定性，又增添了一份典雅气质。
                  整体设计简约而不失趣味，是现代家居中不可多得的艺术装饰品。
                </p>
              </div> */}
          </section>
        </div>
      </div>

      {/* 推荐产品 */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">推荐产品</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={product.productCoverImageList}
                  alt={product.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {product.productName}
                </h3>
                <p className="text-sm text-brand-600">{product.brand}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 返回按钮 */}
      <div className="container mx-auto px-4 py-8 text-center">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
        >
          返回列表
        </button>
      </div>
    </main>
  );
}
