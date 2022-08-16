import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";

/* This is a Next.js API route. It is a function that is called when a request is
made to the /api/checkout route. It is an async function that returns a
response. */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if ( req.method === 'POST') {
        const { user } = await getSession({ req })

        const stripeCustomer = await stripe.customers.create({
            email: user.email,
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
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