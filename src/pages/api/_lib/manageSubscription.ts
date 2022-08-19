import { query as q } from 'faunadb'
import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

/**
 * It takes a subscription ID and a customer ID, retrieves the subscription from
 * Stripe, and creates a new document in the subscriptions collection with the
 * subscription data
 * @param {string} subscriptionId - The ID of the subscription that was just
 * created.
 * @param {string} customerId - The Stripe customer ID.
 */
export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
) {
    /* Getting the user's ref from the user_by_stripe_customer_id index. */
    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    /* Retrieving the subscription from Stripe. */
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    /* Creating a new object with the subscription data. */
    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
    }

    /* Creating a new document in the subscriptions collection. */
    await fauna.query(
        q.Create(
            q.Collection('subscriptions'),
            { data: subscriptionData }
        )
    )
}