import { Volume2 } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (val: number) => void;
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <Volume2 size={16} className="text-muted shrink-0" />
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="flex-1 h-0.5 bg-surface-brighter rounded-full appearance-none outline-none cursor-pointer accent-accent transition-all hover:bg-neutral-700"
      />
      <span className="text-[10px] text-muted w-7 text-right font-mono">
        {volume}%
      </span>
    </div>
  );
}
