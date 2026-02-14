import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";

interface MessageSequenceProps {
  onComplete: () => void;
}

export const MessageSequence: React.FC<MessageSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const messages = [
    "Honestly, I know things have been kind of slow between us, and I know we’ve both been really busy…",
    "but I just want to reassure you that I’m here for you, luv.",
    "It’s been a rough start to the year",
    "we both know",
    "but no matter how rough it gets, I’ll always want you with me through it.",
    "(And if you’re reading this late… I coded this 😭😂.)",
    "I catch myself thinking about you when I’m not supposed to",
    "rereading our messages and blushing for no reason",
    "and I enjoy every minute of it.",
    "I'm not trying to rush anything,",
    "but I can't pretend you don't matter to me...",
    "because you do.",
    "And with that, can you answer one small thing for me…?",
    "Miss Jaleah Gabrielle Rogena Barker....",
    "Will you be my Valentine?"
  ];

  const handleNext = () => {
    if (currentStep < messages.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 max-w-5xl mx-auto text-center relative">
      {/* Subtle glow behind text for maximum legibility */}
      <div className="absolute inset-0 bg-radial-gradient from-black/40 to-transparent pointer-events-none blur-3xl" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="relative z-10"
        >
          {/* Decorative Hearts */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-20">
            <Heart size={40} className="text-rose-300" />
          </div>

          <p className="text-3xl md:text-5xl font-serif italic leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] px-4 font-medium">
            {messages[currentStep]}
          </p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >
            <button
              onClick={handleNext}
              className="group flex items-center gap-4 mx-auto px-10 py-4 bg-white/10 hover:bg-white text-rose-100 hover:text-[#5e1c24] backdrop-blur-md border-2 border-white/30 hover:border-white rounded-full transition-all duration-300 cursor-pointer text-xl font-semibold shadow-xl"
            >
              <span>{currentStep === messages.length - 1 ? "Ask Me" : "Continue"}</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="flex gap-2 mt-16">
        {messages.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentStep ? "w-8 bg-rose-400" : "w-2 bg-rose-400/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
