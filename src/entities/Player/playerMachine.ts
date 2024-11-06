import { assign, setup } from "xstate";
import { VideoPlayerContext, VideoPlayerEvent } from "./types";


export const playerMachine = setup({
    types: {
        context: {} as VideoPlayerContext,
        events: {} as VideoPlayerEvent
      },
      actions: {
        togglePlayPause: assign(({context, event}) => ({
          saveTime: event.type === 'TOGGLE_PLAY_PAUSE' ?  event.time : context.saveTime,
            isPlaying: !context.isPlaying
        })),
        initializePlayer: assign({
          isInitialized: () => {
            return true;
          },
        }),
        closePlayer: assign(({context, event}) => ({
          saveTime: event.type === 'CLOSE' ? event.time : context.saveTime,
          isPlaying: !context.isPlaying
        }))
      },
}).createMachine({
    id: "Player",
    initial: "closed",
    context: {
        isPlaying: false,
        isInitialized: false,
        saveTime: 0
    },
    states: {
        closed: {
          on: {
            OPEN_MINI: "mini",
            OPEN_FULL: "full",
          },
        },
        mini: {
          on: {
            CLOSE: {
              target: "closed",
              actions: 'closePlayer'
            },
            OPEN_FULL: "full",
            TOGGLE_PLAY_PAUSE: { 
                actions: "togglePlayPause" 
            },
            INIT_PLAYER: { 
                actions: "initializePlayer" 
            },
          },
        },
        full: {
          on: {
            CLOSE: {
              target: "closed",
              actions: 'closePlayer'
            },
            OPEN_MINI: "mini",
            TOGGLE_PLAY_PAUSE: { 
                actions: "togglePlayPause" 
            },
            INIT_PLAYER: { 
                actions: "initializePlayer" 
            },
          },
        },
      },
})