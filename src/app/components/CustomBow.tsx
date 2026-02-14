import React from "react";
import { motion } from "motion/react";

export const CustomBow = () => {
  return (
    <motion.svg
      viewBox="0 0 200 160"
      className="w-full h-full filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
      initial={{ scale: 0.9, rotate: -2 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "reverse", 
        ease: "easeInOut" 
      }}
    >
      <defs>
        {/* Deep Silk Gradient */}
        <linearGradient id="bowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c42847" />
          <stop offset="50%" stopColor="#800f2f" />
          <stop offset="100%" stopColor="#590d22" />
        </linearGradient>

        {/* Rose Gold Highlight */}
        <linearGradient id="roseGoldHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#e2b1b1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Shadow for depth */}
        <filter id="innerShadow">
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="3" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.5" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* Tails */}
      <motion.path
        d="M80 100 L40 160 L20 150 L60 90 Z"
        fill="url(#bowGradient)"
        initial={{ rotate: 0 }}
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.path
        d="M120 100 L160 160 L180 150 L140 90 Z"
        fill="url(#bowGradient)"
        initial={{ rotate: 0 }}
        animate={{ rotate: [1, -1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Left Loop */}
      <path
        d="M100 80 C40 80 20 40 40 20 C60 0 100 40 100 80"
        fill="url(#bowGradient)"
        stroke="#e2b1b1"
        strokeWidth="0.5"
        strokeOpacity="0.2"
        filter="url(#innerShadow)"
      />
      <path
        d="M95 75 C50 75 35 45 50 30"
        fill="none"
        stroke="url(#roseGoldHighlight)"
        strokeWidth="2"
      />

      {/* Right Loop */}
      <path
        d="M100 80 C160 80 180 40 160 20 C140 0 100 40 100 80"
        fill="url(#bowGradient)"
        stroke="#e2b1b1"
        strokeWidth="0.5"
        strokeOpacity="0.2"
        filter="url(#innerShadow)"
      />
      <path
        d="M105 75 C150 75 165 45 150 30"
        fill="none"
        stroke="url(#roseGoldHighlight)"
        strokeWidth="2"
      />

      {/* Central Knot */}
      <rect
        x="85"
        y="65"
        width="30"
        height="35"
        rx="8"
        fill="url(#bowGradient)"
        stroke="#e2b1b1"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        filter="url(#innerShadow)"
      />
      <path
        d="M90 70 Q100 65 110 70"
        fill="none"
        stroke="#e2b1b1"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
    </motion.svg>
  );
};
