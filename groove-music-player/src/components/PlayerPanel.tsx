import { Track, PlayerState } from "../types";
import Vinyl from "./Vinyl";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import VolumeControl from "./VolumeControl";

interface PlayerPanelProps {
  currentTrack: Track;
  state: PlayerState;
  totalDurationSeconds: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onSeek: (val: number) => void;
  onVolumeChange: (val: number) => void;
}

export default function PlayerPanel({
  currentTrack,
  state,
  totalDurationSeconds,
  onTogglePlay,
  onNext,
  onPrev,
  onToggleShuffle,
  onToggleRepeat,
  onSeek,
  onVolumeChange,
}: PlayerPanelProps) {
  return (
    <div className="bg-bg border-r border-border p-7 flex flex-col relative overflow-hidden h-full">
      {/* Background radial glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-radial-gradient from-accent/5 to-transparent pointer-events-none" />
      
      <div className="font-serif text-[13px] tracking-[0.18em] text-accent uppercase mb-6 flex items-center gap-2">
        <span className="w-4 h-4 border border-accent rounded-full flex items-center justify-center text-[8px] font-mono">◈</span>
        Groove
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <Vinyl isPlaying={state.isPlaying} currentTrack={currentTrack} />

        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl text-white mb-1.5 truncate px-2 leading-tight">
            {currentTrack.title}
          </h2>
          <p className="text-[11px] text-accent font-mono tracking-[0.12em] uppercase mb-1">
            {currentTrack.artist}
          </p>
          <p className="text-[10px] text-muted tracking-wide truncate opacity-60">
            {currentTrack.album}
          </p>
        </div>

        <ProgressBar 
          current={state.currentTime} 
          total={totalDurationSeconds} 
          onSeek={onSeek} 
        />

        <Controls
          isPlaying={state.isPlaying}
          isShuffle={state.isShuffle}
          isRepeat={state.isRepeat}
          onTogglePlay={onTogglePlay}
          onNext={onNext}
          onPrev={onPrev}
          onToggleShuffle={onToggleShuffle}
          onToggleRepeat={onToggleRepeat}
        />
      </div>

      <div className="mt-4">
        <VolumeControl 
          volume={state.volume} 
          onVolumeChange={onVolumeChange} 
        />
      </div>
    </div>
  );
}
