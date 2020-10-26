import { ApolloClient, InMemoryCache } from '@apollo/client'
import { onError } from "apollo-link-error";
import { setContext } from '@apollo/client/link/context'
import { createHttpLink } from 'apollo-link-http'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import jwtDecode from 'jwt-decode'
import { getAccessToken, setAccessToken } from './accessToken'

const uri = 'http://localhost:3000/api/graphql'
const credentials = 'include'
const httpLink = createHttpLink({ uri, credentials })

const logLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const requestLink = setContext((_, { headers }) => {
  const token = getAccessToken()
  const authorization = token ? `Bearer ${token}` : ''
  return { headers: { ...headers, authorization }}
})

const refreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()
    if (!token) return true
    const { exp } = jwtDecode(token)
    if (Date.now() >= exp * 1000) return false
    return false
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:3000/api/refresh_token', {
      method: 'POST',
      credentials: 'include',
    })
  },
  handleFetch: accessToken => setAccessToken(accessToken),
  handleError: err => console.warn(err)
})

const link = logLink
  .concat(requestLink as any)
  .concat(refreshLink as any)
  .concat(httpLink as any) as any

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        habits: {
          merge: false,
        }
      }
    },
  },
})

export const client = new ApolloClient({ cache, link })