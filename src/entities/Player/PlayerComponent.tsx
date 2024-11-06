import { Modal } from "antd"
import styles from '../Player/style.module.css'
import { useMachine } from "@xstate/react"
import { playerMachine } from "./PlayerMachine"
import { PlayCircleOutlined } from "@ant-design/icons"

export const PlayerComponent = () => {
    const [snapshot, send] = useMachine(playerMachine)

    const openPlayer = (mode: 'full' | 'mini') => {
        send({ type: mode === 'full' ? 'OPEN_FULL' : 'OPEN_MINI' });
        send({ type: 'INIT_PLAYER' });
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
            />
        </div>
    )
}
