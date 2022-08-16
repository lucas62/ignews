import { signIn, useSession } from 'next-auth/react';
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
    const {data: session, status} = useSession()

    function handleSubscribe() {
        if (!session) {
            signIn('github')
            return
        }

          

    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}