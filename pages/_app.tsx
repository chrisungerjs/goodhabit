import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../util/apolloClient'
import { setAccessToken } from '../util/accessToken'
import '../bootstrap.min.css'
import '../main.css'
import { useEffect } from 'react'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    fetch('http://localhost:3000/api/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async response => {
      const { accessToken } = await response.json()
      console.log(accessToken)
      setAccessToken(accessToken)
    })
  }, [])

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
