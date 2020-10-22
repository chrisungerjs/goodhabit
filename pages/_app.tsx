import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../util/apolloClient'
import '../bootstrap.min.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
