import '@/styles/globals.css';  // Adjust based on your project structure

import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
