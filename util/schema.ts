import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Instance {
    doesRepeat: Boolean,
    customName: String,
  }
  input InstanceInput {
    doesRepeat: Boolean,
    customName: String,
  }
  type Schedule {
    mon: Instance,
    tue: Instance,
    wed: Instance,
    thu: Instance,
    fri: Instance,
    sat: Instance,
    sun: Instance,
  }
  input ScheduleInput {
    mon: InstanceInput,
    tue: InstanceInput,
    wed: InstanceInput,
    thu: InstanceInput,
    fri: InstanceInput,
    sat: InstanceInput,
    sun: InstanceInput,
  }
  type Metric {
    name: String!,
    value: String,
  }
  input MetricInput {
    name: String!,
    value: String,
  }
  type History {
    date: String!,
    tracking: [Metric],
  }
  input HistoryInput {
    date: String!,
    tracking: [MetricInput],
  }
  type Habit {
    _id: ID,
    name: String!,
    description: String,
    index: Int,
    schedule: Schedule,
    history: [History],
  }
  input HabitInput {
    _id: ID,
    index: Int,
    name: String!,
    description: String,
    schedule: ScheduleInput,
    history: [HistoryInput],
  }
  type User {
    email: String!,
    password: String!,
    habits: [Habit],
  }
  type Query {
    habits: [Habit],
  }
  type Mutation {
    register(email: String!, password: String!): User,
    login(email: String!, password: String!): User,
    addHabit(habit: HabitInput): Habit,
    updateHabit(habit: HabitInput): Habit,
    deleteHabit(_id: ID): Boolean,
    updateHistory(_id: ID, historyInput: HistoryInput): Habit,
  }
`
