import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

/**
 * It takes a readable stream and returns a promise that resolves to a buffer
 * containing all the data from the stream
 * @param {Readable} readable - The readable stream to buffer.
 * @returns A promise that resolves to a buffer.
 */
async function buffer(readable: Readable) {
    const chunks = [];

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === 'string' ? Buffer.from(chunk) : chunk
        )
    }

    return Buffer.concat(chunks)
}

/* Telling Next.js to not parse the body of the request. */
export const config = {
    api: {
        bodyParse: false
    }
}

/* A set of events that we want to listen to. */
const relevantEvents = new Set([
    'checkout.session.completed'
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
    /* A webhook handler. */
    if (req.method === 'POST') {
        const buf = await buffer(req)

        const secret = req.headers['stripe-signature']

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf.toString(), secret, process.env.STRIPE_WEBHOOK_SECRET)
            // console.log(event);
            
        } catch (error) {
            console.log(error);
            
            return res.status(400).send(`Webhook error: ${error.message}`)
        }

        const { type } = event

        if (relevantEvents.has(type)) {
            try {
                switch (type) {
                    case 'checkout.session.completed':

                        const checkoutSession = event.data.object as Stripe.Checkout.Session
                        console.log(checkoutSession.subscription.toString(),
                        checkoutSession.customer.toString());
                        
                        await saveSubscription(
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString()
                        )

                        break;
                    default:
                        throw new Error('Unhandled event.')
                }
            } catch (error) {
                return res.json({ error: 'Webhook handler failed' })
            }
        }
    
        res.json({ received: true }) 
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}