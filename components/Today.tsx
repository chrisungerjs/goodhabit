import { arch } from 'process'
import { useState } from 'react'
import { 
  GetHabitsDocument, 
  Habit, 
  useGetHabitsQuery,
  useUpdateHistoryMutation,
} from '../generated/graphql'
import { daysOfTheWeek } from '../util/daysOfTheWeek'

const today = daysOfTheWeek[new Date().getDay()]
const archiveDate = new Date().toLocaleDateString(undefined, {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})

const Today: React.FC = () => {
  const { data } = useGetHabitsQuery()
  const [updateHistory] = useUpdateHistoryMutation()
  const [habitStatusMap, setHabitStatusMap] = useState(
    data.habits.reduce((a, b) => (
      a[b._id] = {
        isComplete:
          b.history && b.history[0].date === archiveDate
          ? true
          : false
      }, a
    ), {})
  )
  const handleChecked = async (e: any, habit: Habit) => {
    setHabitStatusMap({
      ...habitStatusMap,
      [habit._id] : { isComplete: e.target.checked }
    })
    const historyInput = { date: archiveDate }
    updateHistory({
      variables: { _id: habit._id, historyInput },
      refetchQueries: [{ query: GetHabitsDocument }],
    })
  }
  return (
    <>
      {data?.habits && habitStatusMap ? (
        data.habits.filter((habit: Habit) => habit.schedule[today].doesRepeat).map(habit => (
          <div key={habit._id} style={{
            textDecoration: habitStatusMap[habit._id]?.isComplete ? 'line-through' : 'none',
            color: habitStatusMap[habit._id].isComplete ? '#777' : '#000',
          }}>
            <h2>
              <span>{habit.name}</span>
              {habit.schedule[today].customName ? <span>: {habit.schedule[today].customName}</span> : null}
              <span>
                <input
                  type="checkbox"
                  defaultChecked={habitStatusMap[habit._id].isComplete}
                  onChange={(e) => handleChecked(e, habit)}
                  />
              </span>
            </h2>
          </div>
        ))
        ) : null}
    </>
  )
}

export default Today

