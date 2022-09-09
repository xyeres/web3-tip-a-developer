import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MetamaskStateProvider } from '../lib/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetamaskStateProvider>
      <Component {...pageProps} />
    </MetamaskStateProvider>
  )
}

export default MyApp
