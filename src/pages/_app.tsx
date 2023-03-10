import { AuthProvider } from '@/contexts/authContext'
import { GlobalStyle } from '@/css/global'
import { theme } from '@/css/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider >
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}
