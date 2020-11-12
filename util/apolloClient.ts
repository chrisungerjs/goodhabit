import {
  ApolloClient,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { onError } from "apollo-link-error";
import { HttpLink } from 'apollo-link-http'
import { setContext } from '@apollo/client/link/context'
import Cotter from 'cotter'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject>

const httpLink = new HttpLink({
  uri: 'https://goodhabit.vercel.app/api/graphql',
  credentials: 'include',
})

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

const createIsomorphicLink = () => {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema')
    const { typeDefs } = require('../util/schema')
    return new SchemaLink({ typeDefs })
  } else {
    return link
  }
}

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(),
    cache,
  })
}

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  if (initialState) _apolloClient.cache.restore(initialState)
  if (typeof window === 'undefined') return _apolloClient
  apolloClient = apolloClient ?? _apolloClient
  return apolloClient
}

export const useApollo = (initialState: any) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
