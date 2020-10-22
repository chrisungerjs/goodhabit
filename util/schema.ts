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
    schedule: Schedule,
    history: [Record],
  }
  input HabitInput {
    _id: ID,
    name: String!,
    schedule: ScheduleInput,
    history: [RecordInput],
  }
  type Query {
    habits: [Habit],
  }
  type Mutation {
    addHabit(habit: HabitInput): Habit,
    updateHabit(habit: HabitInput): Habit,
    deleteHabit(_id: ID): Boolean,
  }
`
