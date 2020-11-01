import { ApolloClient, InMemoryCache } from '@apollo/client'
import { onError } from "apollo-link-error";
import { createHttpLink } from 'apollo-link-http'
import { setContext } from '@apollo/client/link/context'

const uri = 'http://localhost:3000/api/graphql'
const credentials = 'include'
const httpLink = createHttpLink({ uri, credentials })

const logLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
  const token = ''
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const link = logLink.concat(authLink as any).concat(httpLink as any) as any

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