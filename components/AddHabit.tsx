import { useState } from 'react'
import { daysOfTheWeek } from '../util/daysOfTheWeek'
import { 
  useAddHabitMutation,
  GetHabitsDocument,
} from '../generated/graphql'

const AddHabit: React.FC = () => {
  // const [name, setName] = useState('')
  const [schedule, setSchedule] = useState([])
  const [dayToggle, setDayToggle] = useState('day')

  const [habit, setHabit] = useState({
    name: '',
    schedule: [],
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
        <input type="text" id="name" value={habit.name} onChange={e => setHabit({...habit, name: e.target.value})} />
        <label htmlFor="dayToggle">every</label>
        <select value={dayToggle} id="dayToggle" onChange={e => setDayToggle(e.target.value)}>
          <option value="day">day</option>
          <option value="week">week</option>
        </select>
        {dayToggle === 'week' ? (
          <>
            <label htmlFor="daysOfWeek">on</label>
            <select id="daysOfWeek">
              {daysOfTheWeek.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </>
        ): null}
        <button>Submit</button>
      </form>
    </>
  )
}

export default AddHabit
