import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MetamaskStateProvider } from '../lib/MetamaskStateProvider'
import { StepsProvider } from '../lib/StepsProvider'
import { TipProvider } from '../lib/TipProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetamaskStateProvider>
      <StepsProvider>
        <TipProvider>
          <Component {...pageProps} />
        </TipProvider>
      </StepsProvider>
    </MetamaskStateProvider>
  )
}

export default MyApp
