import { useState } from 'react'
import { 
  GetHabitsDocument, 
  Habit, 
  useGetHabitsQuery,
  useUpdateHistoryMutation,
} from '../generated/graphql'
import { daysOfTheWeek } from '../util/daysOfTheWeek'
import HabitCard from './HabitCard'

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
          b.history?.length && b.history[0].date === archiveDate
          ? true
          : false
      }, a
    ), {})
  )
  const handleChecked = async (e: React.ChangeEvent<HTMLInputElement>, habit: Habit) => {
    e.stopPropagation()
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
          <HabitCard
            habit={habit}
            habitStatusMap={habitStatusMap}
            handleChecked={handleChecked}
            today={today}
            key={habit._id}
          />
        ))
      ) : null}
    </>
  )
}

export default Today

