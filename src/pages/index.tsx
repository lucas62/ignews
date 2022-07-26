import styles from '../styles/home.module.scss'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <h1 className={styles.tittle}>Hello World</h1>
    </>
  )
}
