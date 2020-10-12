import { gql } from '@apollo/client'

export const GET_HABITS = gql`
  query GetHabits {
    habits {
      _id
      name
      # repeats {
      #   mon
      #   tue
      #   wed
      #   thu
      #   fri
      #   sat
      #   sun
      # }
    }
  }
`