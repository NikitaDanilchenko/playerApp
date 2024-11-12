export type VideoPlayerContext = {
    isPlaying: boolean;
    isInitialized: boolean;
  };
  
export type VideoPlayerEvent =
  | { type: 'OPEN_MINI' }
  | { type: 'OPEN_FULL' }
  | { type: 'CLOSE'}
  | { type: 'TOGGLE_PLAY_PAUSE'}
  | { type: 'INIT_PLAYER' }
  | { type: 'STOP_PLAYING'}