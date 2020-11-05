import { ApolloClient, from, InMemoryCache } from '@apollo/client'
import { onError } from "apollo-link-error";
import { createHttpLink } from 'apollo-link-http'
import { setContext } from '@apollo/client/link/context'
import Cotter from 'cotter'

const httpLink = createHttpLink({ 
  uri: 'https://goodhabit.vercel.app/api/graphql',
  credentials: 'include',
})

console.log(httpLink)

const logLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext(async (_, { headers }) => {
  let token = ''
  const cotter = new Cotter('ca212de7-300a-4354-a178-24f474b3ae69')
  const response = await cotter.tokenHandler.getAccessToken()
  if (response?.token) token = response.token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = from([
  logLink as any,
  authLink as any,
  httpLink as any,
])

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        habits: {
          merge: false,
        },
      },
    },
  },
})

export const client = new ApolloClient({ cache, link })