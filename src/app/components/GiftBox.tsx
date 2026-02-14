import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { CustomBow } from "./CustomBow";

interface GiftBoxProps {
  onOpen: () => void;
}

const HangingHeart = ({ left, height, size, delay, color }: { left: string, height: string, size: number, delay: number, color: string }) => (
  <div 
    className="absolute top-0 flex flex-col items-center pointer-events-none" 
    style={{ left, zIndex: 5 }}
  >
    <div 
      className="w-[1px] bg-white/20" 
      style={{ height }} 
    />
    <motion.div
      initial={{ y: -10 }}
      animate={{ y: [0, 10, 0] }}
      transition={{ 
        duration: 3 + Math.random() * 2, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <Heart 
        size={size} 
        style={{ color, fill: color }} 
        className="opacity-60 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" 
      />
    </motion.div>
  </div>
);

const Pearl = ({ top, left, size, opacity, delay }: { top: string, left: string, size: number, opacity: number, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity, scale: 1 }}
    transition={{ delay, duration: 2 }}
    className="absolute rounded-full bg-white/10 blur-[1px] pointer-events-none"
    style={{ 
      top, 
      left, 
      width: size, 
      height: size,
      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
      boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.1)'
    }}
  />
);

export const GiftBox: React.FC<GiftBoxProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-[#3d1c22]">
      {/* Background Gradient to match reference */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4a242a] via-[#3d1c22] to-[#2a1317] opacity-100" />

      {/* Hanging Hearts from Reference */}
      <HangingHeart left="5%" height="150px" size={14} delay={0} color="#ffb3c1" />
      <HangingHeart left="15%" height="280px" size={18} delay={0.5} color="#ffffff" />
      <HangingHeart left="85%" height="200px" size={16} delay={0.3} color="#ffffff" />
      <HangingHeart left="95%" height="180px" size={14} delay={1.5} color="#ff85a1" />

      {/* Floating Pearls/Spheres */}
      <Pearl top="20%" left="15%" size={20} opacity={0.3} delay={0.2} />
      <Pearl top="45%" left="8%" size={40} opacity={0.2} delay={0.5} />
      <Pearl top="75%" left="22%" size={25} opacity={0.3} delay={0.8} />
      <Pearl top="65%" left="82%" size={50} opacity={0.15} delay={1.2} />
      <Pearl top="30%" left="92%" size={30} opacity={0.2} delay={0.6} />

      {/* Main Title - Beautiful cursive, raised higher above the bow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isOpen ? { opacity: 0, scale: 1.2, y: -200 } : { opacity: 1, scale: 1, y: -220 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-0 w-full text-center px-4 -translate-y-1/2 z-[100] pointer-events-none"
      >
        <h2 className="text-7xl md:text-9xl font-['Great_Vibes'] text-[#e2b1b1] drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
          Click to open
        </h2>
      </motion.div>

      {/* Cross Ribbons */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden bg-[#00000000]">
        {/* Horizontal Ribbon */}
        <motion.div 
          animate={isOpen ? { x: '100%', opacity: 0 } : { x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute w-full h-24 md:h-32 bg-[#a62639] shadow-2xl flex items-center"
        >
          {/* Removed white line */}
        </motion.div>

        {/* Vertical Ribbon */}
        <motion.div 
          animate={isOpen ? { y: '-100%', opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute h-full w-24 md:w-32 bg-[#a62639] shadow-2xl flex justify-center"
        >
          {/* Removed white line */}
        </motion.div>
      </div>

      {/* The Central Bow (Classic Style) */}
      <div 
        className="relative z-50 cursor-pointer group select-none scale-100 md:scale-125"
        onClick={handleOpen}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              exit={{ 
                scale: 1.5, 
                opacity: 0, 
                rotate: 15,
              }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-64 flex items-center justify-center"
            >
              {/* Custom High-End SVG Bow */}
              <div className="w-full h-full p-4">
                <CustomBow />
              </div>

              {/* Interaction Pulse */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-rose-400/10 blur-[40px] rounded-full group-hover:bg-rose-400/20" 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
