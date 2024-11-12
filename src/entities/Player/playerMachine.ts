import { assign, setup } from "xstate";
import { VideoPlayerContext, VideoPlayerEvent } from "./types";


export const playerMachine = setup({
    types: {
        context: {} as VideoPlayerContext,
        events: {} as VideoPlayerEvent
    },
    actions: {
        togglePlayPause: assign(({ context }) => ({
            isPlaying: !context.isPlaying
        })),
        initializePlayer: assign({
            isInitialized: true,
        }),
        stopPlaying: assign(() => ({
            isPlaying: false
        })),
        startPlaying: assign(() => ({
            isPlaying: true
        }))
    },
}).createMachine({
    id: "Player",
    initial: "closed",
    context: {
        isPlaying: false,
        isInitialized: false,
    },
    states: {
        closed: {
            entry: 'startPlaying',
            on: {
                OPEN_MINI: "mini",
                OPEN_FULL: "full",
            },
        },
        mini: {
            on: {
                CLOSE: {target: "closed"},
                STOP_PLAYING: {actions: 'stopPlaying'},
                OPEN_FULL: {target: "full", actions: 'startPlaying'},
                TOGGLE_PLAY_PAUSE: {actions: "togglePlayPause"},
                INIT_PLAYER: {actions: "initializePlayer"},
            },
        },
        full: {
            on: {
                CLOSE: {target: "closed"},
                STOP_PLAYING: {actions: 'stopPlaying'},
                OPEN_MINI: {target: "mini", actions: 'startPlaying'},
                TOGGLE_PLAY_PAUSE: {actions: "togglePlayPause"},
                INIT_PLAYER: {actions: "initializePlayer"},
            },
        },
    },
})