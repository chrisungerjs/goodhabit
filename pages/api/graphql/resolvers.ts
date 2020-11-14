import { connectToDatabase } from '../../../util/db'
import { ObjectId } from 'mongodb'

export const resolvers = {
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