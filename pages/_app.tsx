import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../util/apolloClient'
import { Provider } from '../util/context'
import '../bootstrap.min.css'
import '../main.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  )
}

export default MyApp
