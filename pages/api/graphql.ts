import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { connectToDatabase } from '../../util/db'
import { ObjectId } from 'mongodb'
import { typeDefs } from '../../util/typeDefs'

const resolvers = {
  Query: {
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
      return newHabit.ops[0]
    },
    updateHabit: async (_parent, { _id, name }, _context) => {
      const { db } = await connectToDatabase()
      const updatedHabit = await db
        .collection('habit_db')
        .findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: { name } })
      return updatedHabit.value
    },
    deleteHabit: async (_parent, { _id }, _context) => {
      const { db } = await connectToDatabase()
      const deletedHabit = await db
        .collection('habit_db')
        .findOneAndDelete({ _id: new ObjectId(_id) })
      return !!deletedHabit.value
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
