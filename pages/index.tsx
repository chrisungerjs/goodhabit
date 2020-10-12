import Head from 'next/head'
import { useState } from 'react'
import AddHabit from '../components/AddHabit'
import { daysOfTheWeek } from '../util/daysOfTheWeek'
import { useQuery } from '@apollo/client'
import { GET_HABITS } from '../util/queries'

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_HABITS)
  const [isAddHabit, setIsAddHabit] = useState(false)
  if (loading) return <>Loading...</>
  if (error) return <>Error</>
  const today = daysOfTheWeek[new Date().getDay()]
  console.log(data)
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
                {habit.repeats ? (
                  <span>: {habit.repeats[today]}</span>
                ): null}
              </h2>
            </div>
          </>
        ))}
      </ul>
    </>
  )
}

export default Home
