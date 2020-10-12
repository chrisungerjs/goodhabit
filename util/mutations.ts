import { gql } from '@apollo/client'

export const ADD_HABIT = gql`
  mutation AddHabit($name: String!) {
    addHabit(name: $name) {
      _id
      name
    }
  }
`