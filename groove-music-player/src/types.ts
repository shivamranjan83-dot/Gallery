export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  emoji: string;
  duration: string; // "m:ss" format
}

export interface PlayerState {
  currentIndex: number;
  isPlaying: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  isAutoplay: boolean;
  currentTime: number;
  volume: number;
}
