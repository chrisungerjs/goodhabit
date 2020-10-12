import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { daysOfTheWeek } from '../util/daysOfTheWeek'
import { ADD_HABIT } from '../util/mutations'
import { GET_HABITS } from '../util/queries'

const AddHabit: React.FC = () => {
  const [name, setName] = useState('')
  const [dayToggle, setDayToggle] = useState('day')
  const [addHabit] = useMutation(ADD_HABIT)
  const handleAddHabit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await addHabit({
      variables: { name },
      refetchQueries: [{ query: GET_HABITS }],
    })
  }
  return (
    <>
      <form onSubmit={handleAddHabit}>
        <label htmlFor="name">I'm going to</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
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
