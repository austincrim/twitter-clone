import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/tailwind.css'

const client = new QueryClient()

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
