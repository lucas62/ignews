import { GetStaticProps } from 'next'
import Head from 'next/head'

import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

/* It's a type checker. It's saying that the Home component will receive a prop
called product, which is an object with two properties: priceId and amount. */
interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

/**
 * We're using the HomeProps interface to type check the props that are passed to
 * the Home component
 * @param {HomeProps}  - HomeProps
 */
export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all publications <br />
            <span>
              for {product.amount} month
            </span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

/**
 * It retrieves the price from Stripe and returns it as a prop to the component
 * @returns - props: {
 *       product
 *     },
 *     revalidate: 60 * 60 * 24 //24 hours
 */
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LQHBMFKbmr2IkUdLEWhGoiI')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //24 hours
  }
}
