import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { daysOfTheWeek } from '../../util/daysOfTheWeek'

const ADD_HABIT = gql`
  mutation AddHabit($name: String!) {
    addHabit(name: $name) {
      _id
      name
    }
  }
`
const AddHabit: React.FC = () => {
  const [name, setName] = useState('')
  const [dayToggle, setDayToggle] = useState('day')
  const [addHabit, { data }] = useMutation(ADD_HABIT)
  const handleAddHabit = async (e) => {
    e.preventDefault()
    await addHabit({ variables: { name } })
    const newHabit = data.addHabit
    console.log(newHabit)
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
                <option value={day}>{day}</option>
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
