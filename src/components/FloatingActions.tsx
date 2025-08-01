'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQrcode, FaHeadset, FaHome, FaArrowUp } from 'react-icons/fa';
import Image from 'next/image';

const FloatingActions = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className="fixed right-6 bottom-[20%] z-50 select-none"
    >
      <div className="flex flex-col gap-3">
        {/* 二维码按钮 */}
        <div className="relative">
          <button
            onMouseEnter={() => setShowQRCode(true)}
            onMouseLeave={() => setShowQRCode(false)}
            className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white hover:bg-brand-700 transition-colors shadow-lg"
          >
            <FaQrcode size={24} />
          </button>
          
          {/* 二维码弹出框 */}
          {showQRCode && !isDragging && (
            <div 
              className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-white p-4 rounded-xl shadow-xl flex gap-4"
              style={{ width: '320px' }}
            >
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-50 p-2 rounded-lg mb-2">
                  <Image
                    src="/qr-weixin.jpg"
                    alt="官方微信"
                    width={112}
                    height={112}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-gray-600">官方微信</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-50 p-2 rounded-lg mb-2">
                  <Image
                    src="/qr-web.jpg"
                    alt="官方商城"
                    width={112}
                    height={112}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-gray-600">官方商城</p>
              </div>
            </div>
          )}
        </div>

        {/* 客服电话 */}
        <div className="relative group">
          <button className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white hover:bg-brand-700 transition-colors shadow-lg">
            <FaHeadset size={24} />
          </button>
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-white px-4 py-2 rounded-lg shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <p className="text-brand-600 font-medium">021-61259481</p>
          </div>
        </div>

        {/* 回到首页 */}
        <a 
          href="/"
          className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white hover:bg-brand-700 transition-colors shadow-lg"
        >
          <FaHome size={24} />
        </a>

        {/* 回到顶部 */}
        <button 
          onClick={scrollToTop}
          className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white hover:bg-brand-700 transition-colors shadow-lg"
        >
          <FaArrowUp size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export default FloatingActions; 