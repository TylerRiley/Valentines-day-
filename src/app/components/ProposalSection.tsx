import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Music, Camera, Gift, Film, Utensils, Gamepad2, Joystick } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { MessageSequence } from "./MessageSequence";

interface ProposalSectionProps {
  images: string[];
}

export const ProposalSection: React.FC<ProposalSectionProps> = ({ images }) => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonCount, setNoButtonCount] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [currentMessage, setCurrentMessage] = useState("Valentine's Day");
  
  const messages = [
    "Wait, are you sure?",
    "Think about it again...",
    "Pretty please? 🥺",
    "I'll give you chocolate! 🍫",
    "You can't say no forever!",
    "I'm going to keep asking!",
  ];

  const handleNoClick = () => {
    setNoButtonCount((prev) => prev + 1);
    setYesButtonScale((prev) => prev + 0.2);
    const padding = 120;
    const maxX = window.innerWidth - padding * 2;
    const maxY = window.innerHeight - padding * 2;
    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setHasAccepted(true);
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ffffff", "#ffccd5", "#ff4d6d", "#8b2635"]
    });
  };

  if (hasAccepted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-8"
        >
          <Heart className="w-24 h-24 text-white fill-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-['Great_Vibes'] text-white mb-6 drop-shadow-lg">
          My Valentine ❤️
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mb-12">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-square"
            >
              <ImageWithFallback src={img} alt="Memory" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <motion.div className="bg-black/30 backdrop-blur-xl rounded-[40px] p-8 border border-white/10 max-w-2xl shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-20"><Heart size={80} /></div>
           <h2 className="text-3xl font-serif font-bold text-rose-100 mb-8 tracking-widest uppercase text-center">What to expect in March</h2>
           <div className="space-y-6 text-left">
              {[
                { icon: <Film />, title: "Movie Night", desc: "Date night movie night with snacks and cozy vibes." },
                { icon: <Utensils />, title: "Fine Dining", desc: "A nice delicious restaurant with a nice walk in the city." },
                { icon: <Gamepad2 />, title: "Small Games Night", desc: "Competitive fun and cozy moments at home." },
                { icon: <Joystick />, title: "Arcade Adventure", desc: "An arcade night of fun with me." }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="p-4 bg-white/10 rounded-2xl text-white group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-rose-200 text-lg">{item.title}</h3>
                    <p className="text-rose-100/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <button 
            onClick={() => confetti({ particleCount: 150, spread: 70, origin: { y: 0.8 } })}
            className="px-8 py-4 bg-white text-[#5e1c24] rounded-full font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            Sounds Good! ❤️
          </button>
          <button 
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-light tracking-widest uppercase transition-all"
          >
            Still needs to be discussed 🤔
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {!showQuestion ? (
        <MessageSequence onComplete={() => setShowQuestion(true)} />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center w-full"
        >
          {/* Main Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 relative z-10"
          >
            <h1 className="text-[100px] md:text-[160px] leading-tight font-['Great_Vibes'] text-white drop-shadow-2xl select-none">
              Valentine's
              <div className="text-[80px] md:text-[130px] -mt-10">Day</div>
            </h1>
          </motion.div>

          {/* Podium Layout */}
          <div className="absolute bottom-0 left-0 w-full flex items-end justify-center px-4 overflow-hidden h-[30vh]">
            <div className="w-1/3 h-[20vh] bg-[#4a1017] rounded-t-3xl shadow-2xl mx-2 flex items-center justify-center border-t border-white/10 translate-y-4">
              <ImageWithFallback src={images[1]} className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
            </div>
            <div className="w-2/5 h-[28vh] bg-[#5e1c24] rounded-t-3xl shadow-2xl mx-2 relative border-t border-white/20">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-rose-400/10 rounded-full blur-3xl" />
            </div>
            <div className="w-1/3 h-[24vh] bg-[#3d0d12] rounded-t-3xl shadow-2xl mx-2 border-t border-white/5">
              <ImageWithFallback src={images[2]} className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
            </div>
          </div>

          {/* Interactive Buttons */}
          <div className="relative z-20 flex flex-col items-center gap-8 -mt-10">
            <motion.button
              style={{ scale: yesButtonScale }}
              whileHover={{ scale: yesButtonScale * 1.05 }}
              whileTap={{ scale: yesButtonScale * 0.95 }}
              onClick={handleYesClick}
              className="px-16 py-5 bg-white text-[#5e1c24] rounded-full text-2xl font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all cursor-pointer uppercase tracking-widest"
            >
              Yes, I will! ❤️
            </motion.button>

            <motion.button
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onMouseEnter={handleNoClick}
              onClick={handleNoClick}
              className="px-10 py-3 bg-transparent border border-white/20 text-white/50 rounded-full text-lg font-light hover:text-white/80 transition-colors cursor-pointer"
            >
              Maybe next year...
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
