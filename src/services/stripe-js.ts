import { loadStripe } from "@stripe/stripe-js";

/**
 * It loads the Stripe.js library and returns it.
 * @returns The Stripe.js library.
 */
export async function getStripeJs() {
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    return stripeJs
}
