import { motion } from "motion/react";
import { Track } from "../types";

interface TrackItemProps {
  track: Track;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

export default function TrackItem({
  track,
  index,
  isActive,
  isPlaying,
  onClick,
}: TrackItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-3 cursor-pointer border-b border-border transition-colors hover:bg-white/[0.03] group ${
        isActive ? "bg-accent/[0.06]" : ""
      }`}
    >
      <div className="w-5 flex-shrink-0 text-center">
        {isActive && isPlaying ? (
          <div className="flex items-end justify-center gap-0.5 h-3.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ["4px", "14px", "4px"] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="w-[3px] bg-accent rounded-[1px]"
              />
            ))}
          </div>
        ) : (
          <span
            className={`text-[11px] font-mono ${
              isActive ? "text-accent" : "text-muted"
            }`}
          >
            {index + 1}
          </span>
        )}
      </div>

      <div className="w-10 h-10 rounded-md bg-surface-brighter shrink-0 flex items-center justify-center text-lg overflow-hidden border border-white/5">
        {track.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <h4
          className={`text-[13px] truncate leading-tight mb-0.5 ${
            isActive ? "text-accent" : "text-white"
          }`}
        >
          {track.title}
        </h4>
        <p className="text-[11px] text-muted truncate">{track.artist}</p>
      </div>

      <div className="text-[11px] text-muted font-mono shrink-0">
        {track.duration}
      </div>
    </div>
  );
}
