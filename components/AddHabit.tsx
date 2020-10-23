import { useState } from 'react'
import { daysOfTheWeek } from '../util/dateFunctions'
import { 
  useAddHabitMutation,
  GetHabitsDocument,
} from '../generated/graphql'
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap'

const AddHabit: React.FC<{ setIsAddHabit: any }> = ({ setIsAddHabit }) => {
  const initialHabit = {
    name: '',
    schedule: daysOfTheWeek.reduce((a, b) => (
      a[b] = {
        doesRepeat: true,
        customName: '',
      }, a
    ), {}),
    history: [],
  }
  const [dayToggle, setDayToggle] = useState('day')
  const [habit, setHabit] = useState(initialHabit)
  const [addHabit] = useAddHabitMutation()
  const handleAddHabit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await addHabit({
        variables: { habit },
        refetchQueries: [{ query: GetHabitsDocument }],
      })
      setHabit(initialHabit)
      setIsAddHabit(false)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <section style={{ padding: '0 .25rem' }}>
      <Form onSubmit={handleAddHabit}>
        <Form.Label>
          <h2 style={{ fontSize: '1.5rem' }}>add a new habit:</h2>
        </Form.Label>
        <Form.Control
          type="text"
          value={habit.name}
          onChange={e => setHabit({...habit, name: e.target.value})}
        />
        <Form.Control
          as="select"
          value={dayToggle}
          onChange={e => setDayToggle(e.target.value)}
        >
          <option value="day">every day</option>
          <option value="week">on specific days</option>
        </Form.Control>
        <br/>
        {dayToggle === 'week' ? (
          <>
            {daysOfTheWeek.map(day => (
              <Row key={day}>
                <Col xs={1}>
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
                          },
                        },
                      }))
                    }}
                  />
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    placeholder={day}
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
                        },
                      }))
                    }}
                  />
                </Col>
              </Row>
            ))}
          </>
        ): null}
        <Button
          type="submit"
          style={{ margin: '0 auto' }}
        >
          Submit
        </Button>
        <br/>
        <br/>
      </Form>
    </section>
  )
}

export default AddHabit
