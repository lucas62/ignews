import Stripe from "stripe";
import { version } from '../../package.json'

/* Creating a new Stripe object with the API key and the version of the API. */
export const stripe = new Stripe(
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'Ignews',
            version
        },
    }
)
