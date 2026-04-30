import { motion } from "motion/react";
import { Track } from "../types";

interface VinylProps {
  isPlaying: boolean;
  currentTrack: Track;
}

export default function Vinyl({ isPlaying, currentTrack }: VinylProps) {
  return (
    <div className="relative w-48 h-48 mx-auto mb-7 lg:w-56 lg:h-56">
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 360 }}
        initial={{ rotate: 0 }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear",
        }}
        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        className="vinyl-gradient w-full h-full rounded-full flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.6)] border-4 border-[#111] relative"
      >
        {/* Grooves decorative effect */}
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
        
        {/* Center Label */}
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#2a2820] to-[#1a1812] border-2 border-[#333] flex items-center justify-center overflow-hidden z-10">
          <div className="text-[10px] font-medium tracking-wider text-accent text-center px-1 leading-tight">
             {currentTrack.emoji}
          </div>
        </div>
        
        {/* The center hole */}
        <div className="absolute w-2 h-2 rounded-full bg-bg z-20" />
      </motion.div>
    </div>
  );
}
