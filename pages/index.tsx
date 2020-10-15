import Head from 'next/head'
import { useState } from 'react'
import AddHabit from '../components/AddHabit'
import { daysOfTheWeek } from '../util/daysOfTheWeek'
import {
  useGetHabitsQuery,
  useDeleteHabitMutation,
  GetHabitsDocument,
} from '../generated/graphql'

const Home: React.FC = () => {
  const { loading, error, data } = useGetHabitsQuery()
  const [deleteHabit] = useDeleteHabitMutation()
  const [isAddHabit, setIsAddHabit] = useState(true)
  if (loading) return <>Loading...</>
  if (error) return <>Error</>
  const today = daysOfTheWeek[new Date().getDay()]
  return (
    <>
      <Head>
        <title>GoodHabit</title>
      </Head>
      <h1>GoodHabit</h1>
      <>
        <button
          onClick={() => setIsAddHabit(true)}
        >
          Add Habit
        </button>
        {isAddHabit ? <AddHabit /> : null}
      </>
      <ul>
        {data.habits.map((habit) => (
          <>
            <div key={habit._id}>
              <>{JSON.stringify(habit)}</>
              <h2>
                <span>{habit.name}</span>
                {/* {habit.repeats ? (
                  <span>: {habit.repeats[today]}</span>
                ): null} */}
              </h2>
              <button
                onClick={async () => await deleteHabit({
                  variables: { _id: habit._id },
                  refetchQueries: [{ query: GetHabitsDocument }],
                })}
              >Remove</button>
            </div>
          </>
        ))}
      </ul>
    </>
  )
}

export default Home
