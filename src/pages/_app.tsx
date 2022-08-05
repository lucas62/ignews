import { AppProps } from "../../node_modules/next/app"
import { Header } from "../components/Header"

import '../styles/global.scss'


/**
 * MyApp is a function that takes in a Component and pageProps and returns a Header
 * component and the Component with the pageProps
 * @param {AppProps}  - AppProps - This is the type of the props that Next.js will
 * pass to your App component.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
