import { useState } from 'react'
import { daysOfTheWeek } from '../util/daysOfTheWeek'
import { 
  useAddHabitMutation,
  GetHabitsDocument,
} from '../generated/graphql'

const AddHabit: React.FC = () => {
  const [dayToggle, setDayToggle] = useState('day')
  const [habit, setHabit] = useState({
    name: '',
    schedule: daysOfTheWeek.reduce((a, b) => (
      a[b] = {
        doesRepeat: true,
        customName: '',
      }, a
    ), {})
  })
  const [addHabit] = useAddHabitMutation()
  const handleAddHabit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await addHabit({
      variables: { habit },
      refetchQueries: [{ query: GetHabitsDocument }],
    })
  }
  return (
    <>
      <form onSubmit={handleAddHabit}>
        <label htmlFor="name">I'm going to</label>
        <input
          type="text"
          id="name"
          value={habit.name}
          onChange={e => setHabit({...habit, name: e.target.value})}
        />
        <label htmlFor="dayToggle"></label>
        <select 
          value={dayToggle}
          id="dayToggle"
          onChange={e => setDayToggle(e.target.value)}
        >
          <option value="day">every day</option>
          <option value="week">on specific days</option>
        </select>
        <br/>
        {dayToggle === 'week' ? (
          <>
            {daysOfTheWeek.map(day => (
              <div key={day}>
                <input
                  type="checkbox"
                  defaultChecked={habit.schedule[day].doesRepeat}
                  id={day}
                  onChange={(e) => {
                    const checkedState = e.target.checked
                    setHabit(habit => ({
                      ...habit,
                      schedule: {
                        ...habit.schedule,
                        [day]: {
                          ...habit.schedule[day],
                          doesRepeat: checkedState,
                        }
                      }
                    }))
                  }}
                />
                <label htmlFor={day}>{day}</label>
                <input
                  type="text"
                  id=""
                  placeholder="default"
                  value={habit.schedule[day].customName}
                  onChange={(e) => {
                    const nameState = e.target.value
                    setHabit(habit => ({
                      ...habit,
                      schedule: {
                        ...habit.schedule,
                        [day]: {
                          ...habit.schedule[day],
                          customName: nameState,
                        }
                      }
                    }))
                  }}
                />
                <br/>
              </div>
            ))}
          </>
        ): null}
        <br/>
        <button>Submit</button>
      </form>
    </>
  )
}

export default AddHabit
