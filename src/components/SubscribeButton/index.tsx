import styles from './styles.module.scss'

interface SubscribeBttonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeBttonProps) {
    return (
        <button
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe now
        </button>
    )
}