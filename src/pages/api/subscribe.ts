import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { query as q } from "faunadb";
import { stripe } from "../../services/stripe";


/**
 * A User is an object with a ref property that is an object with an id property
 * that is a string, and a data property that is an object with a
 * stripe_customer_id property that is a string.
 * @property ref - {
 * @property data - {
 */
type User = {
    ref: {
        id: string
    }
    data: {
        stripe_customer_id: string
    }
}

/* A Next.js API route. It is a function that is called when a request is
made to the /api/checkout route. It is an async function that returns a
response. */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if ( req.method === 'POST') {
        /* Getting the session from the request. */
        const session = await getSession({ req })

        /* Getting the user from FaunaDB. */
        const user  = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )

        let customerId = user.data.stripe_customer_id

        /* If the user does not have a Stripe customer ID, then create a Stripe
        customer and update the user's FaunaDB document with the Stripe customer
        ID. */
        if (!customerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
            })
    
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id
                        }
                    }
                )
            ) 

            customerId = stripeCustomer.id
        }

        /* Creating a Stripe Checkout Session. */
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1LQHBMFKbmr2IkUdLEWhGoiI', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({sessionId: stripeCheckoutSession.id})
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not a allowed')
    }
}