import { gql } from '@apollo/client'

export const typeDefs = gql`
  enum Day {
    mon
    tue
    wed
    thu
    fri
    sat
    sun
  }
  type Instance {
    dayOfWeek: Day,
    
  }
  type Habit {
    _id: ID,
    name: String,
    schedule: [Instance],
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