"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getProductDetail } from "@/api/stock";

// 格式化价格：整数不显示 .00，只有小数时才显示
const formatPrice = (price: number | string | undefined | null): string => {
  if (!price && price !== 0) return "";
  const num = parseFloat(String(price));
  if (isNaN(num)) return "";
  
  // 如果是整数，直接返回整数
  if (num % 1 === 0) {
    return num.toString();
  }
  
  // 如果有小数，去掉末尾的0
  return num.toString().replace(/\.?0+$/, "");
};

export default function ProductDetail() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productDetail, setProductDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!params.id) {
        setError("商品ID不存在");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const data = await getProductDetail({ id: String(params.id) });
        setProductDetail(data);
        // 设置轮播图
        if (Array.isArray(data?.productCoverImageList)) {
          setProductImages(data.productCoverImageList);
        }
      } catch (error: any) {
        console.error("Failed to fetch product detail:", error);
        setError(error?.message || "获取商品详情失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [params.id]);

  // 添加样式确保产品介绍中的图片和视频正确显示
  useEffect(() => {
    const styleId = 'product-show-styles';
    if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .product-show-content {
          width: 100%;
          max-width: 100%;
        }
        
        .product-show-content img {
          max-width: 100% !important;
          width: auto !important;
          height: auto !important;
          display: block;
          margin: 1rem 0;
          border-radius: 8px;
        }
        
        .product-show-content video {
          max-width: 100% !important;
          width: auto !important;
          height: auto !important;
          display: block;
          margin: 1rem 0;
          border-radius: 8px;
        }
        
        .product-show-content iframe {
          max-width: 100% !important;
          margin: 1rem 0;
          border-radius: 8px;
        }
        
        .product-show-content p {
          margin: 1rem 0;
          line-height: 1.8;
        }
        
        .product-show-content * {
          max-width: 100%;
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      // 组件卸载时清理样式（可选）
      // const style = document.getElementById('product-show-styles');
      // if (style) style.remove();
    };
  }, []);

  // 加载状态
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mb-4"></div>
              <p className="text-gray-600">加载中...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 错误状态
  if (error || !productDetail) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || "商品不存在"}</p>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
              >
                返回列表
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
              {/* 副标题字段已注释 */}
              {/* <p className="text-xl text-brand-600">
                {productDetail?.subProductName}
              </p> */}
              {/* 零售价：商品的零售价格，单位为元 */}
              {productDetail?.retailPrice && (
                <p className="text-2xl font-bold text-red-600 mt-2">
                  ￥{formatPrice(productDetail.retailPrice)}
                </p>
              )}
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

            {/* 数量信息 - 独立显示 */}
            {(productDetail?.inStockQuantity !== null && productDetail?.inStockQuantity !== undefined) ||
             (productDetail?.inTransitQuantity !== null && productDetail?.inTransitQuantity !== undefined) ||
             (productDetail?.specialPriceQuantity !== null && productDetail?.specialPriceQuantity !== undefined) ? (
              <div className="space-y-2 mt-4">
                {productDetail?.inStockQuantity !== null && productDetail?.inStockQuantity !== undefined && (
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <span className="text-gray-500">现货数量</span>
                    <span className="text-gray-900">{productDetail.inStockQuantity} 件</span>
                  </div>
                )}
                {productDetail?.inTransitQuantity !== null && productDetail?.inTransitQuantity !== undefined && (
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <span className="text-gray-500">在途数量</span>
                    <span className="text-gray-900">{productDetail.inTransitQuantity} 件</span>
                  </div>
                )}
                {productDetail?.specialPriceQuantity !== null && productDetail?.specialPriceQuantity !== undefined && (
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <span className="text-gray-500">特价数量</span>
                    <span className="text-gray-900">{productDetail.specialPriceQuantity} 件</span>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 产品详情模块 */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* 商品参数 */}
          {productDetail?.productParameter && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">商品参数</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
                {productDetail.productParameter["材质"] && (
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                    <span className="text-gray-500">材质</span>
                    <span className="text-gray-900">
                      {productDetail.productParameter["材质"]}
                    </span>
                  </div>
                )}
                {productDetail.productParameter["尺寸"] && (
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                    <span className="text-gray-500">尺寸</span>
                    <span className="text-gray-900">
                      {productDetail.productParameter["尺寸"]}
                    </span>
                  </div>
                )}
                {productDetail.productParameter["光源"] && (
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                    <span className="text-gray-500">光源</span>
                    <span className="text-gray-900">
                      {productDetail.productParameter["光源"]}
                    </span>
                  </div>
                )}
                {productDetail.productParameter["颜色"] && (
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                    <span className="text-gray-500">颜色</span>
                    <span className="text-gray-900">
                      {productDetail.productParameter["颜色"]}
                    </span>
                  </div>
                )}
                {productDetail.productParameter["品牌国"] && (
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                    <span className="text-gray-500">品牌国</span>
                    <span className="text-gray-900">
                      {productDetail.productParameter["品牌国"]}
                    </span>
                  </div>
                )}
                {productDetail.productParameter["原产地"] && (
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                    <span className="text-gray-500">原产地</span>
                    <span className="text-gray-900">
                      {productDetail.productParameter["原产地"]}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}


          {/* 产品介绍 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">产品介绍</h2>
            <div
              className="product-show-content text-gray-600"
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
