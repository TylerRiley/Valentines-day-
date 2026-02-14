import React, { useState, useRef } from "react";
import { AestheticBackground } from "./components/AestheticBackground";
import { ProposalSection } from "./components/ProposalSection";
import { GiftBox } from "./components/GiftBox";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

import img1 from "@/assets/d52138d498514c86b9250c733cac6e4235545bb2.png";
import img2 from "@/assets/a59d0178f721e31acedf153109946ae12191d701.png";
import img3 from "@/assets/aaad24cc4e2ae21feafedb9d37df7d24f5036bf1.png";
import img4 from "@/assets/79435e7aae1c48c2c86a1b245fed807afe5b07fd.png";
import musicTrack from "@/assets/Death Do Us Part (feat. Mariah The Scientist)_spotdown.org.mp3";

const IMAGES = [img1, img2, img3, img4];

const MUSIC_URL = musicTrack;

export default function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to start music on first interaction to bypass browser autoplay restrictions
  const startMusic = () => {
    if (!hasStarted && audioRef.current) {
      audioRef.current.play().then(() => {
        setHasStarted(true);
      }).catch(err => console.log("Autoplay prevented, waiting for interaction", err));
    }
  };

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    startMusic();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <main 
      className="min-h-screen relative selection:bg-rose-200 selection:text-[#5e1c24] overflow-hidden cursor-pointer"
      onClick={startMusic}
    >
      <Toaster position="top-center" />
      <AestheticBackground />
      
      {/* 
          MUSIC SECTION: 
          Change the MUSIC_URL constant above to your own direct .mp3 link.
          The music starts on the first click anywhere on the page.
      */}
      <audio 
        ref={audioRef} 
        src={MUSIC_URL} 
        loop 
        autoPlay 
        playsInline
      />

      {/* Music Toggle UI */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={toggleMute}
        className="fixed top-6 right-6 z-[200] p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white shadow-2xl transition-all group"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 group-hover:scale-110 transition-transform" />
        ) : (
          <div className="relative">
            <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>
        )}
      </motion.button>
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!isGiftOpened ? (
            <motion.div
              key="gift"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <GiftBox onOpen={handleOpenGift} />
            </motion.div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <motion.div
                key="proposal"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                <ProposalSection images={IMAGES} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
