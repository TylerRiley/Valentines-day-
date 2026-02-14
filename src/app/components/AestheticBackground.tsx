import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export const AestheticBackground: React.FC = () => {
  const hangingHearts = [
    { left: "5%", length: "20vh", size: 32, color: "text-rose-300", delay: 0 },
    { left: "15%", length: "35vh", size: 48, color: "text-white", delay: 0.5 },
    { left: "85%", length: "18vh", size: 36, color: "text-rose-100", delay: 1.1 },
    { left: "95%", length: "30vh", size: 44, color: "text-rose-400", delay: 0.6 },
  ];

  const spheres = [
    { left: "10%", top: "60%", size: "40px", delay: 0 },
    { left: "80%", top: "70%", size: "60px", delay: 1 },
    { left: "20%", top: "85%", size: "30px", delay: 2 },
    { left: "90%", top: "40%", size: "20px", delay: 1.5 },
    { left: "5%", top: "30%", size: "25px", delay: 0.5 },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#80202d] via-[#5e1c24] to-[#3d0d12]">
      {/* Hanging Strings and Hearts */}
      {hangingHearts.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: item.delay }}
          className="absolute top-0 flex flex-col items-center"
          style={{ left: item.left }}
        >
          <div className="w-[1px] bg-white/30" style={{ height: item.length }} />
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4 + Math.random() * 2,
              ease: "easeInOut" 
            }}
          >
            <Heart 
              size={item.size} 
              className={`${item.color} fill-current drop-shadow-2xl opacity-90`} 
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Floating Spheres */}
      {spheres.map((sphere, idx) => (
        <motion.div
          key={`sphere-${idx}`}
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3 + idx,
            ease: "easeInOut",
            delay: sphere.delay 
          }}
          className="absolute rounded-full bg-gradient-to-br from-rose-200/40 to-rose-400/20 backdrop-blur-[2px] shadow-inner"
          style={{ 
            left: sphere.left, 
            top: sphere.top, 
            width: sphere.size, 
            height: sphere.size,
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        />
      ))}

      {/* Background Decorative Elements (Diagonal splits) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[#b33f4f]/10 rotate-12 blur-3xl rounded-full" />
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-white/5 rotate-45 blur-2xl" />
      </div>

      {/* Podium base shadows */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
};
