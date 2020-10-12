import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { connectToDatabase } from '../../util/db'
import { ObjectId } from 'mongodb'

const typeDefs = gql`
  type Habit {
    _id: ID,
    name: String,
  }
  type Query {
    test: Habit,
    habits: [Habit],
  }
  type Mutation {
    addHabit(name: String): Habit,
    updateHabit(_id: ID, name: String): Habit,
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
    habits: async (_parent, _args, _context) => {
      const { db } = await connectToDatabase()
      const allHabits = await db
        .collection('habit_db')
        .find({})
        .toArray()
      return allHabits
    }
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
    updateHabit: async (_parent, { _id, name }, _context) => {
      const { db } = await connectToDatabase()
      const updatedHabit = await db
        .collection('habit_db')
        .findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: { name } })
      return updatedHabit.value
    }
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
