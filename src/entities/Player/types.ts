export type VideoPlayerContext = {
    isPlaying: boolean;
    isInitialized: boolean;
    saveTime: number
  };
  
export type VideoPlayerEvent =
  | { type: 'OPEN_MINI' }
  | { type: 'OPEN_FULL' }
  | { type: 'CLOSE', time: number }
  | { type: 'TOGGLE_PLAY_PAUSE', time: number}
  | { type: 'INIT_PLAYER' }