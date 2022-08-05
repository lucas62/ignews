import { SessionProvider } from "next-auth/react"
import { AppProps } from "../../node_modules/next/app"
import { Header } from "../components/Header"

import '../styles/global.scss'

/**
 * MyApp is a function that takes in a Component and pageProps and returns a
 * SessionProvider with a Header and Component
 * @param {AppProps}  - AppProps
 * @returns The Header component is being returned.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
