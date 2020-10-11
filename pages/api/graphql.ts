import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { connectToDatabase } from '../../util/db'

const typeDefs = gql`
  type Habit {
    _id: ID,
    name: String,
  }
  type Query {
    test: Habit,
  }
  type Mutation {
    addHabit(name: String): Habit,
  }
`
const resolvers = {
  Query: {
    test: async (_parent, _args, _context) => {
      const { db } = await connectToDatabase()
      const test = await db
        .collection('habit_db')
        .findOne({ name: 'test' })
      return test
    },
  },
  Mutation: {
    addHabit: async (_parent, { name }, _context) => {
      const { db } = await connectToDatabase()
      const newHabit = await db
        .collection('habit_db')
        .insertOne({ name })
      console.log(newHabit)
      return newHabit.ops[0]
    },
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  }
}

const cors = Cors({
  allowMethods: ["POST", "OPTIONS"]
})

export default cors(handler)
