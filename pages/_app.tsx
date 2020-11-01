import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../util/apolloClient'
import '../bootstrap.min.css'
import '../main.css'
import { Provider } from '../util/context'

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
