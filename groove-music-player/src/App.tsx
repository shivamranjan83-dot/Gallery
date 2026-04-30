/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { PLAYLIST } from "./constants";
import { PlayerState } from "./types";
import PlayerPanel from "./components/PlayerPanel";
import PlaylistPanel from "./components/PlaylistPanel";

export default function App() {
  const [state, setState] = useState<PlayerState>({
    currentIndex: 0,
    isPlaying: false,
    isShuffle: false,
    isRepeat: false,
    isAutoplay: true,
    currentTime: 0,
    volume: 80,
  });

  const timerRef = useRef<number | null>(null);

  const currentTrack = PLAYLIST[state.currentIndex];
  
  const parseDuration = (str: string) => {
    const [m, s] = str.split(":").map(Number);
    return m * 60 + s;
  };

  const totalDurationSeconds = parseDuration(currentTrack.duration);

  const getNextIndex = (currentIndex: number, isShuffle: boolean) => {
    if (isShuffle) {
      let idx;
      do {
        idx = Math.floor(Math.random() * PLAYLIST.length);
      } while (idx === currentIndex && PLAYLIST.length > 1);
      return idx;
    }
    return (currentIndex + 1) % PLAYLIST.length;
  };

  const handleNext = () => {
    const nextIdx = getNextIndex(state.currentIndex, state.isShuffle);
    setState((prev) => ({
      ...prev,
      currentIndex: nextIdx,
      currentTime: 0,
    }));
  };

  const handlePrev = () => {
    if (state.currentTime > 3) {
      setState((prev) => ({ ...prev, currentTime: 0 }));
      return;
    }
    const prevIdx = (state.currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    setState((prev) => ({
      ...prev,
      currentIndex: prevIdx,
      currentTime: 0,
    }));
  };

  const handleTrackSelect = (index: number) => {
    if (index === state.currentIndex) {
      setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    } else {
      setState((prev) => ({
        ...prev,
        currentIndex: index,
        currentTime: 0,
        isPlaying: true,
      }));
    }
  };

  // Timer logic for fake playback
  useEffect(() => {
    if (state.isPlaying) {
      timerRef.current = window.setInterval(() => {
        setState((prev) => {
          const nextTime = prev.currentTime + 1;
          const total = parseDuration(PLAYLIST[prev.currentIndex].duration);

          if (nextTime >= total) {
            if (prev.isRepeat) {
              return { ...prev, currentTime: 0 };
            } else if (prev.isAutoplay) {
              const nextIdx = getNextIndex(prev.currentIndex, prev.isShuffle);
              return { ...prev, currentIndex: nextIdx, currentTime: 0 };
            } else {
              return { ...prev, currentTime: 0, isPlaying: false };
            }
          }
          return { ...prev, currentTime: nextTime };
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.isPlaying, state.currentIndex, state.isShuffle, state.isRepeat, state.isAutoplay]);

  const nextTrackIndex = getNextIndex(state.currentIndex, state.isShuffle);
  const nextTrackTitle = PLAYLIST[nextTrackIndex]?.title;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-bg">
      <div className="w-full max-w-[900px] h-full min-h-[620px] max-h-[750px] grid grid-cols-1 md:grid-cols-[360px_1fr] bg-surface rounded-3xl overflow-hidden border border-border-hover shadow-2xl relative">
        <PlayerPanel
          currentTrack={currentTrack}
          state={state}
          totalDurationSeconds={totalDurationSeconds}
          onTogglePlay={() => setState((p) => ({ ...p, isPlaying: !p.isPlaying }))}
          onNext={handleNext}
          onPrev={handlePrev}
          onToggleShuffle={() => setState((p) => ({ ...p, isShuffle: !p.isShuffle }))}
          onToggleRepeat={() => setState((p) => ({ ...p, isRepeat: !p.isRepeat }))}
          onSeek={(val) => setState((p) => ({ ...p, currentTime: val }))}
          onVolumeChange={(val) => setState((p) => ({ ...p, volume: val }))}
        />

        <PlaylistPanel
          playlist={PLAYLIST}
          state={state}
          onTrackSelect={handleTrackSelect}
          onToggleAutoplay={() => setState((p) => ({ ...p, isAutoplay: !p.isAutoplay }))}
          nextTrackTitle={nextTrackTitle}
        />
      </div>
    </div>
  );
}
