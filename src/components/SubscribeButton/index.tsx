import styles from './styles.module.scss'

/* It's defining the type of the props that the component will receive. */
interface SubscribeBttonProps {
    priceId: string;
}

/**
 * "This function takes a priceId and returns a button with the text 'Subscribe
 * now' and the className 'subscribeButton'"</code>
 * 
 * 
 * 
 * The above is a very simple example, but it's a good start.
 * @param {SubscribeBttonProps}  - SubscriptionPlanProps
 * @returns A button with the text "Subscribe now"
 */
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