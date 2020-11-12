import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../util/apolloClient'
import { Provider } from '../util/context'
import '../styles/bootstrap.min.css'
import '../styles/main.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={client}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  )
}

export default MyApp
