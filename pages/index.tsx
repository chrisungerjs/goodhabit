import Head from 'next/head'
import AddHabit from '../components/AddHabit'
import {
  useGetHabitsQuery,
  useDeleteHabitMutation,
  GetHabitsDocument,
} from '../generated/graphql'
import Today from '../components/Today'

const Home: React.FC = () => {
  const { loading, error, data } = useGetHabitsQuery()
  const [deleteHabit] = useDeleteHabitMutation()
  if (loading) return <>Loading...</>
  if (error) return <>Error</>
  return (
    <>
      <Head>
        <title>GoodHabit</title>
      </Head>
      <h1>GoodHabit</h1>
      <AddHabit />
      <Today />

      <h1>All Habits:</h1>
      <ul>
        {data.habits.map((habit) => (
          <div key={habit._id}>
            <>{JSON.stringify(habit)}</>
            <h2>
              <span>{habit.name}</span>
            </h2>
            <button
              onClick={async () => await deleteHabit({
                variables: { _id: habit._id },
                refetchQueries: [{ query: GetHabitsDocument }],
              })}
            >Remove</button>
          </div>
        ))}
      </ul>
    </>
  )
}

export default Home
