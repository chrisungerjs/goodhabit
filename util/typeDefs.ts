import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Habit {
    _id: ID,
    name: String,
  }
  type Query {
    habits: [Habit],
  }
  type Mutation {
    addHabit(name: String): Habit,
    updateHabit(_id: ID, name: String): Habit,
    deleteHabit(_id: ID): Boolean,
  }
`