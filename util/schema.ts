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
    customName: String,
  }
  input InstanceInput {
    dayOfWeek: Day!,
    customName: String,
  }
  type Metric {
    name: String!,
    value: String,
  }
  input MetricInput {
    name: String!,
    value: String,
  }
  type Record {
    date: String!,
    completed: Boolean!,
    tracking: [Metric],
  }
  input RecordInput {
    date: String!,
    completed: Boolean!,
    tracking: [MetricInput],
  }
  type Habit {
    _id: ID,
    name: String!,
    schedule: [Instance],
    history: [Record],
  }
  input HabitInput {
    name: String!,
    schedule: [InstanceInput],
    history: [RecordInput],
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
