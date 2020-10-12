import { ApolloClient, InMemoryCache } from '@apollo/client'
import { onError } from "apollo-link-error";
import { createHttpLink } from 'apollo-link-http'

const httpLink = createHttpLink({ uri: '/api/graphql' })

const logLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = logLink.concat(httpLink as any) as any

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})