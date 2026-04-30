interface ProgressBarProps {
  current: number;
  total: number;
  onSeek: (val: number) => void;
}

export default function ProgressBar({ current, total, onSeek }: ProgressBarProps) {
  const progressPercent = (current / total) * 100;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mb-2">
      <div className="relative h-1 w-full bg-surface-brighter rounded-full group cursor-pointer">
        <div
          className="absolute h-full bg-accent rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
        <input
          type="range"
          min="0"
          max={total}
          value={current}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {/* Playhead thumb handle (visible on hover) */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ left: `calc(${progressPercent}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between mt-1.5 font-mono text-[10px] text-muted tracking-wide">
        <span>{formatTime(current)}</span>
        <span>{formatTime(total)}</span>
      </div>
    </div>
  );
}
