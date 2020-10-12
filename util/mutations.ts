import { gql } from '@apollo/client'

export const ADD_HABIT = gql`
  mutation AddHabit($name: String!) {
    addHabit(name: $name) {
      _id
      name
    }
  }
`

export const UPDATE_HABIT = gql`
  mutation UpdateHabit($_id: ID!, $name: String!) {
    updateHabit(_id: $_id, name: $name) {
      _id
      name
    }
  }
`