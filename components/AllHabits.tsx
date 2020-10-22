import { GetHabitsDocument, Habit, useDeleteHabitMutation, useGetHabitsQuery } from "../generated/graphql"

const AllHabits: React.FC = () => {
  const [deleteHabit] = useDeleteHabitMutation()
  const { data } = useGetHabitsQuery()
  return (
    <>
      <h1>All Habits:</h1>
      <ul>
        {data.habits.map((habit: Habit) => (
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

export default AllHabits
