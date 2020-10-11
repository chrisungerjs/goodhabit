import Head from 'next/head'
import { connectToDatabase } from '../util/db'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { Habit } from '../util/types'

type HomeProps = {
  habitString: string,
  errorMessage?: string,
}

const Home: React.FC<HomeProps> = ({ habitString, errorMessage = null }: HomeProps) => {
  const [error, setError] = useState(null)
  const daysOfTheWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const today = daysOfTheWeek[new Date().getDay()]
  if (errorMessage) setError(errorMessage)
  const habits: [Habit] = JSON.parse(habitString)
  const handleAddHabit = async () => {

  }
  return (
    <>
      <Head>
        <title>GoodHabit</title>
      </Head>
      <h1>GoodHabit</h1>
      {error ? (
        <>
          {error}
        </>
      ): null}
      <>
        <button
          onClick={handleAddHabit}
        >
          Add Habit
        </button>
      </>
      <ul>
        {habits.map((habit, index) => (
          <>
            <li key={index}>{JSON.stringify(habit)}</li>
            <div key={habit._id}>
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

export const getServerSideProps: GetServerSideProps = async (_context: GetServerSidePropsContext) => {
  const { client, db } = await connectToDatabase()
  const isConnected = await client?.isConnected()
  if (!isConnected) return { props: { errorMessage: 'database not connected' } }
  const habits = await db
    .collection('habit_db')
    .find({})
    .sort({})
    .limit(20)
    .toArray()
  return { props: { habitString: JSON.stringify(habits) } }
}

export default Home