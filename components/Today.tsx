import { useState } from 'react'
import { Habit, useGetHabitsQuery } from '../generated/graphql'
import { daysOfTheWeek } from '../util/daysOfTheWeek'

const today = daysOfTheWeek[new Date().getDay()]

const Today: React.FC = () => {
  const { data } = useGetHabitsQuery()
  const [habitStatusMap, setHabitStatusMap] = useState(
    data.habits.reduce((a, b) => (
      a[b._id] = {
        isComplete: false,
      }, a
    ), {})
  )
  const handleChecked = (e: any, habit: Habit) => {
    setHabitStatusMap({
      ...habitStatusMap,
      [habit._id] : { isComplete: e.target.checked }
    })
  }
  return (
    <>
      <h1>Today</h1>
      {data.habits ? (
        data.habits.filter((habit) => habit.schedule[today].doesRepeat).map(habit => (
          <div key={habit._id}>
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
      <button onClick={() => console.log(JSON.stringify(habitStatusMap, null, 1))}>Print</button>
    </>
  )
}

export default Today
