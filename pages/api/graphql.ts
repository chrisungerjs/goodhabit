import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { connectToDatabase } from '../../util/db'
import { ObjectId } from 'mongodb'
import { typeDefs } from '../../util/schema'
import { hash, compare } from 'bcrypt'
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from './auth'

const resolvers = {
  Query: {
    habits: async (_parent, _args, _context) => {
      const { db } = await connectToDatabase()
      const allHabits = await db
        .collection('habit_db')
        .find({})
        .sort({ index: 1 })
        .toArray()
      return allHabits
    }
  },
  Mutation: {
    register: async (_parent, { email, password }, _context) => {
      const hashedPassword = await hash(password, 12)
      const { db } = await connectToDatabase()
      const existingEmail = await db
        .collection('users')
        .findOne({ email })
      if (existingEmail) return false
      const newUser = await db
        .collection('users')
        .insertOne({ email, password: hashedPassword, habits: [] })
      if (!newUser) return false
      return true
    },
    login: async (_parent, { email, password }, { res }) => {
      const { db } = await connectToDatabase()
      const user = await db
        .collection('users')
        .findOne({ email })
      if (!user) return
      const validatedPassword = await compare(password, user.password)
      if (!validatedPassword) return
      sendRefreshToken(res, createRefreshToken(user))
      return { accessToken: createAccessToken(user)}
    },
    addHabit: async (_parent, { habit }, { user }) => {
      console.log(user)
      const { db } = await connectToDatabase()
      const newHabit = await db
        .collection('habit_db')
        .insertOne({ ...habit })
      return newHabit.ops[0]
    },
    updateHabit: async (_parent, { habit }, _context) => {
      const { _id, ...restHabit} = habit
      const { db } = await connectToDatabase()
      const updatedHabit = await db
        .collection('habit_db')
        .findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $set: { ...restHabit } },
          { upsert: true },
        )
      return updatedHabit.value
    },
    updateHistory: async (_parent, { _id, historyInput }, _context) => {
      const { db } = await connectToDatabase()
      const updatedHabit = await db
        .collection('habit_db')
        .findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $addToSet: { history: historyInput } },
        )
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
  context: async ({ req, res }) => ({ req, res }),
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  }
}

const cors = Cors({
  allowMethods: ["POST", "OPTIONS"],
  allowCredentials: true,
})

export default cors(handler)
