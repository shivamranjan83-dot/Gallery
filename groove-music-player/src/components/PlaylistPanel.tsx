import { Track, PlayerState } from "../types";
import TrackItem from "./TrackItem";

interface PlaylistPanelProps {
  playlist: Track[];
  state: PlayerState;
  onTrackSelect: (index: number) => void;
  onToggleAutoplay: () => void;
  nextTrackTitle?: string;
}

export default function PlaylistPanel({
  playlist,
  state,
  onTrackSelect,
  onToggleAutoplay,
  nextTrackTitle,
}: PlaylistPanelProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface">
      <div className="p-6 pb-4 border-b border-border flex items-center justify-between">
        <h3 className="text-[11px] font-mono tracking-[0.16em] uppercase text-muted">
          Playlist · <span className="text-white">{playlist.length}</span> tracks
        </h3>
        
        <label className="flex items-center gap-2 cursor-pointer select-none group">
          <span className="text-[10px] text-muted group-hover:text-white transition-colors">Autoplay</span>
          <div 
            onClick={(e) => { e.preventDefault(); onToggleAutoplay(); }}
            className={`w-8 h-4 rounded-full relative transition-colors ${state.isAutoplay ? 'bg-accent' : 'bg-surface-brighter'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-bg rounded-full transition-transform ${state.isAutoplay ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </label>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-surface-brighter px-0">
        {playlist.map((track, i) => (
          <TrackItem
            key={track.id}
            track={track}
            index={i}
            isActive={i === state.currentIndex}
            isPlaying={state.isPlaying}
            onClick={() => onTrackSelect(i)}
          />
        ))}
      </div>

      <div className="p-3 px-6 border-t border-border flex items-center justify-between font-mono text-[10px] text-muted">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${state.isPlaying ? 'bg-green-400 animate-pulse' : 'bg-muted'}`} />
          <span>{state.isPlaying ? 'Now Playing' : 'Paused'}</span>
        </div>
        <div>
          {nextTrackTitle ? `Next: ${nextTrackTitle}` : 'End of queue'}
        </div>
      </div>
    </div>
  );
}
