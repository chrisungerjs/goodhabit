import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { ObjectId } from 'mongodb'
import { CotterValidateJWT } from 'cotter-node'
import { CotterAccessToken } from 'cotter-token-js'
import { connectToDatabase } from '../../util/db'
import { typeDefs } from '../../util/schema'

const resolvers = {
  Query: {
    habits: async (_parent, _args, { user }) => {
      if (!user) return
      const { db } = await connectToDatabase()
      const allHabits = await db
        .collection('habit_db')
        .find({ user })
        .sort({ index: 1 })
        .toArray()
      return allHabits
    }
  },
  Mutation: {
    addHabit: async (_parent, { habit }, { user }) => {
      if (!user) return
      const { db } = await connectToDatabase()
      const newHabit = await db
        .collection('habit_db')
        .insertOne({ ...habit })
      return newHabit.ops[0]
    },
    updateHabit: async (_parent, { habit }, { user }) => {
      if (!user) return
      const { _id, ...updateHabit} = habit
      const { db } = await connectToDatabase()
      const updatedHabit = await db
        .collection('habit_db')
        .findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $set: { ...updateHabit } },
          { upsert: true },
        )
      return updatedHabit.value
    },
    updateHistory: async (_parent, { _id, historyInput }, { user }) => {
      if (!user) return
      const { db } = await connectToDatabase()
      const updatedHabit = await db
        .collection('habit_db')
        .findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $addToSet: { history: historyInput } },
        )
      return updatedHabit.value
    },
    deleteHabit: async (_parent, { _id }, { user }) => {
      if (!user) return
      const { db } = await connectToDatabase()
      const deletedHabit = await db
        .collection('habit_db')
        .findOneAndDelete({ _id: new ObjectId(_id) })
      return !!deletedHabit.value
    },
  }
}

const context = async ({ req }) => {
  if (!('authorization' in req.headers)) return { user: null }
  const auth = await req.headers.authorization
  const bearer = auth.split(' ')
  const token = bearer[1]
  let valid = false
  try {
    valid = await CotterValidateJWT(token)
  } catch (err) {
    console.log(err)
    valid = false
  }
  if (!valid) return { user: null }
  const decoded = new CotterAccessToken(token)
  const userEmail = decoded.payload?.identifier
  console.log(userEmail)
  return { user: userEmail }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  }
}

// const cors = Cors({
//   allowMethods: ["POST", "OPTIONS"],
//   allowCredentials: true,
// })

export default handler