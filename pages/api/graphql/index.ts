import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../../util/schema'
import { resolvers } from './resolvers'
import { context } from './context'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: true,
})

export const config = { api: { bodyParser: false } }

export default apolloServer.createHandler({ path: '/api/graphql' })