import { Button, Modal } from "antd"
import styles from '../Player/style.module.css'
import { useMachine } from "@xstate/react"
import { playerMachine } from "./playerMachine"
import { ArrowsAltOutlined, PauseOutlined, PlayCircleOutlined, ShrinkOutlined } from "@ant-design/icons"
import ReactPlayer from "react-player"
import { useRef } from "react"

export const PlayerComponent = () => {
    const [snapshot, send] = useMachine(playerMachine)
    const playerRef = useRef<ReactPlayer | null>(null);
    const isPlaying = snapshot.context.isPlaying
    const isOpen = !snapshot.matches('closed')

    const toggleSize = () => {
        send({ type: snapshot.matches('full') ? 'OPEN_MINI' : 'OPEN_FULL' });
        if (!isPlaying) {
            send({ type: 'STOP_PLAYING' })
        }
    }
    const togglePlayPause = () => {
        send({ type: 'TOGGLE_PLAY_PAUSE' });
    }

    const closePlayer = () => {
        send({ type: 'STOP_PLAYING' });
        setTimeout(() => send({ type: 'CLOSE' }), 0);
    }
    const openPlayer = (mode: 'full' | 'mini') => {
        send({ type: mode === 'full' ? 'OPEN_FULL' : 'OPEN_MINI' });
        if (!snapshot.context.isInitialized) {
            send({ type: 'INIT_PLAYER' });
        }
        send({ type: 'TOGGLE_PLAY_PAUSE' })
    }
    return (
        <div className={styles.modal_wrapper}>
            {snapshot.matches('closed') && (
                <PlayCircleOutlined
                    className={styles.modal_icon}
                    onClick={() => openPlayer('full')}
                />
            )}
            <Modal
                title="Player"
                open={isOpen}
                width={snapshot.matches('full') ? '1000px' : '500px'}
                style={{ top: snapshot.matches('full') ? '5vh' : '10vh' }}
                onCancel={closePlayer}
                footer={
                    <>
                        <Button
                            onClick={toggleSize}
                            shape="circle"
                            icon={snapshot.matches('full') ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                        />
                        <Button
                            onClick={togglePlayPause}
                            shape="circle"
                            icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
                        />
                    </>
                }
            >
                <ReactPlayer
                    ref={playerRef}
                    url="https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8"
                    playing={isPlaying}
                    controls={false}
                    width="100%"
                    height="100%"
                    loop={true}
                />
            </Modal>
        </div>
    )
}
