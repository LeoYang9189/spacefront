'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FallingEmoji {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
}

const furnitureEmojis = [
  '🛋️', '🪑', '🛏️', '🛁', '🚽', '🪞', '🛋', '📺', '🗄️', 
  '🎪', '🏮', '💡', '🪴', '🎍', '🎭', '🖼️', '⚜️', '🏺'
];

const EmojiFallEffect = () => {
  const [emojis, setEmojis] = useState<FallingEmoji[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const randomEmoji = furnitureEmojis[Math.floor(Math.random() * furnitureEmojis.length)];
      const newEmoji: FallingEmoji = {
        id: count,
        x: e.clientX,
        y: e.clientY,
        emoji: randomEmoji,
        rotation: Math.random() * 360
      };
      
      setEmojis(prev => [...prev, newEmoji]);
      setCount(prev => prev + 1);

      setTimeout(() => {
        setEmojis(prev => prev.filter(emoji => emoji.id !== newEmoji.id));
      }, 6000); // 延长到6秒
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {emojis.map((item) => (
          <motion.div
            key={item.id}
            initial={{ 
              opacity: 1, 
              scale: 1.2,
              x: item.x - 10,
              y: item.y - 10,
              rotate: 0
            }}
            animate={{ 
              opacity: 0,
              scale: 0.8,
              x: item.x - 10 + (Math.random() * 80 - 40), // 减小水平偏移范围
              y: window.innerHeight + 50,
              rotate: item.rotation
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 5, // 延长到5秒
              ease: [0.1, 0.2, 0.3, 0.95], // 调整缓动函数使下落更加轻盈
              opacity: { duration: 4 }, // 延长淡出时间
              scale: { duration: 5 }, // 缩放动画时间
              rotate: { // 单独设置旋转动画
                duration: 5,
                ease: "easeInOut"
              }
            }}
            className="absolute text-3xl"
            style={{ 
              willChange: 'transform',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EmojiFallEffect; 