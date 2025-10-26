"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBannerList } from "@/api/common";
import { tryCatch } from "@/utils/util";

interface Banner {
  coverImage: string;
  title1: string;
  title2: string;
  title3: string;
}

const HeroBanner = () => {
  const [mounted, setMounted] = useState(false);
  const [bannerList, setBannerList] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const getBannerListData = async () => {
      const [err, list] = await tryCatch(getBannerList);
      if (err) return;
      setBannerList(list.filter((item: any) => item.status !== false));
      setMounted(true);
    };
    getBannerListData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    arrows: false,
    swipe: true,
    draggable: true,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    beforeChange: (oldIndex: number, newIndex: number) => {
      setSlideDirection(newIndex > oldIndex ? -1 : 1);
      setCurrentSlide(newIndex);
    },
    customPaging: () => (
      <div className="w-2 h-2 mx-1 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-300" />
    ),
    dotsClass: "slick-dots !flex !justify-center !items-center gap-3 !bottom-8",
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] bg-white overflow-hidden">
      <style jsx global>{`
        .slick-slider,
        .slick-list,
        .slick-track {
          height: 100%;
        }
        .slick-slide > div {
          height: 100%;
        }
        .slick-dots {
          z-index: 50;
        }
        .slick-dots li.slick-active button:before {
          opacity: 0;
        }
        .slick-dots li button:before {
          opacity: 0;
        }
      `}</style>
      <Slider {...settings} className="h-full">
        {bannerList.map((banner, index) => (
          <div key={index} className="relative h-full w-full">
            <motion.div
              className="relative h-full w-full"
              initial={{ x: slideDirection * 100 + "%", opacity: 0 }}
              animate={{
                x: currentSlide === index ? "0%" : slideDirection * -100 + "%",
                opacity: currentSlide === index ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <Image
                src={banner.coverImage}
                alt={banner.title1}
                fill
                sizes="100vw"
                quality={90}
                priority={index === 0}
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 z-10">
              {/* <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#235A5A]/50 to-transparent"
                initial={{ x: slideDirection * 50 + "%", opacity: 0 }}
                animate={{
                  x: currentSlide === index ? "0%" : slideDirection * -50 + "%",
                  opacity: currentSlide === index ? 1 : 0,
                }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  clipPath: "polygon(0 0, 45% 0, 35% 100%, 0 100%)",
                }}
              /> */}
            </div>
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <motion.div key={index} className="max-w-3xl relative">
                <motion.h2
                  initial={{
                    x: slideDirection * 50,
                    opacity: 0,
                    rotateY: slideDirection * 45,
                  }}
                  animate={{
                    x: currentSlide === index ? 0 : slideDirection * -50,
                    opacity: currentSlide === index ? 1 : 0,
                    rotateY: currentSlide === index ? 0 : slideDirection * -45,
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-bold text-white italic mb-6 origin-left"
                >
                  {banner.title1}
                </motion.h2>
                <div className="space-y-4">
                  <motion.p
                    initial={{
                      x: slideDirection * 50,
                      opacity: 0,
                      rotateY: slideDirection * 45,
                    }}
                    animate={{
                      x: currentSlide === index ? 0 : slideDirection * -50,
                      opacity: currentSlide === index ? 1 : 0,
                      rotateY:
                        currentSlide === index ? 0 : slideDirection * -45,
                    }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-medium text-white whitespace-pre-line origin-left"
                  >
                    {banner.title2}
                  </motion.p>
                  {banner.title3 && (
                    <motion.p
                      initial={{
                        x: slideDirection * 50,
                        opacity: 0,
                        rotateY: slideDirection * 45,
                      }}
                      animate={{
                        x: currentSlide === index ? 0 : slideDirection * -50,
                        opacity: currentSlide === index ? 1 : 0,
                        rotateY:
                          currentSlide === index ? 0 : slideDirection * -45,
                      }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl md:text-2xl text-white/90 mt-4 origin-left"
                    >
                      {banner.title3}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
