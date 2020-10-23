import { useState } from 'react'
import {
  GetHabitsDocument, 
  Habit,
  useGetHabitsQuery,
  useUpdateHistoryMutation,
} from '../generated/graphql'
import {
  today,
  archiveDate,
} from '../util/dateFunctions'
import HabitCard from './HabitCard'

const HabitList: React.FC = () => {
  const { data } = useGetHabitsQuery()
  const [updateHistory] = useUpdateHistoryMutation()
  const [habitStatusMap, setHabitStatusMap] = useState(
    data.habits.reduce((a, b) => (
      a[b._id] = {
        isComplete:
          b.history?.length && b.history[b.history.length - 1].date === archiveDate
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
        data.habits.filter((habit: Habit) => habit.schedule[today].doesRepeat).map((habit: Habit, index: number) => (
          <HabitCard
            key={habit._id}
            habit={habit}
            habitStatusMap={habitStatusMap}
            handleChecked={handleChecked}
            index={index}
          />
        ))
      ) : null}
    </>
  )
}

export default HabitList
