import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Query {
    habits: [Habit],
  }
  type Mutation {
    addHabit(habit: HabitInput): Habit,
    updateHabit(habit: HabitInput): Habit,
    deleteHabit(_id: ID): Boolean,
    updateHistory(_id: ID, historyInput: HistoryInput): Habit,
  }
  type Habit {
    _id: ID,
    name: String!,
    user: String,
    description: String,
    index: Int,
    schedule: Schedule,
    history: [History],
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
  type Instance {
    doesRepeat: Boolean,
    customName: String,
  }
  type History {
    date: String!,
    tracking: [Metric],
  }
  type Metric {
    name: String!,
    value: String,
  }
  input HabitInput {
    _id: ID,
    index: Int,
    name: String!,
    user: String,
    description: String,
    schedule: ScheduleInput,
    history: [HistoryInput],
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
  input InstanceInput {
    doesRepeat: Boolean,
    customName: String,
  }
  input HistoryInput {
    date: String!,
    tracking: [MetricInput],
  }
  input MetricInput {
    name: String!,
    value: String,
  }
`
