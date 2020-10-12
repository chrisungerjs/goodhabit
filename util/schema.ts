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
    dayOfWeek: Day!,
    instanceName: String,
  }
  type Metric {
    name: String!,
    value: String,
  }
  type Record {
    date: String!,
    completed: Boolean!,
    tracking: [Metric],
  }
  type Habit {
    _id: ID,
    name: String!,
    schedule: [Instance],
    history: [Record],
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