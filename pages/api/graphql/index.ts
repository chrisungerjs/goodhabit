import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { typeDefs } from '../../../util/schema'
import { resolvers } from './resolvers'
import { context } from './context'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: true,
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = { api: { bodyParser: false } }

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS'],
  allowCredentials: true,
})

export default cors(handler)