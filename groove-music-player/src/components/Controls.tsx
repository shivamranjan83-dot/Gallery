import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";

interface ControlsProps {
  isPlaying: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
}

export default function Controls({
  isPlaying,
  isShuffle,
  isRepeat,
  onTogglePlay,
  onNext,
  onPrev,
  onToggleShuffle,
  onToggleRepeat,
}: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <button
        onClick={onToggleShuffle}
        className={`p-2 rounded-full transition-colors ${
          isShuffle ? "text-accent" : "text-muted hover:text-white"
        }`}
        title="Shuffle"
      >
        <Shuffle size={18} />
      </button>

      <button
        onClick={onPrev}
        className="p-2 text-muted hover:text-white hover:bg-surface-brighter rounded-full transition-all"
        title="Previous"
      >
        <SkipBack size={22} fill="currentColor" />
      </button>

      <button
        onClick={onTogglePlay}
        className="w-14 h-14 bg-accent hover:bg-accent-muted text-bg rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-lg"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause size={24} fill="currentColor" />
        ) : (
          <Play size={24} fill="currentColor" className="ml-1" />
        )}
      </button>

      <button
        onClick={onNext}
        className="p-2 text-muted hover:text-white hover:bg-surface-brighter rounded-full transition-all"
        title="Next"
      >
        <SkipForward size={22} fill="currentColor" />
      </button>

      <button
        onClick={onToggleRepeat}
        className={`p-2 rounded-full transition-colors ${
          isRepeat ? "text-accent" : "text-muted hover:text-white"
        }`}
        title="Repeat"
      >
        <Repeat size={18} />
      </button>
    </div>
  );
}
