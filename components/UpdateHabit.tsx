import { useState } from 'react'
import { daysOfTheWeek } from '../util/dateFunctions'
import { 
  useUpdateHabitMutation,
  GetHabitsDocument,
  Habit,
} from '../generated/graphql'
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap'

interface UpdateHabitProps {
  habitToUpdate: Habit,
  setIsUpdateHabit: any
}

const UpdateHabit: React.FC<UpdateHabitProps> = ({ habitToUpdate, setIsUpdateHabit }) => {
  const [habit, setHabit] = useState(habitToUpdate)
  const [updateHabit] = useUpdateHabitMutation()
  const handleUpdateHabit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await updateHabit({
        variables: { habit },
        refetchQueries: [{ query: GetHabitsDocument }],
      })
      setIsUpdateHabit(false)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <section style={{ padding: '0 .25rem' }}>
      <Form onSubmit={handleUpdateHabit}>
        <Form.Label>
          <h2 style={{ fontSize: '1.5rem' }}>edit habit:</h2>
        </Form.Label>
        <Form.Control
          type="text"
          value={habit.name}
          onChange={e => setHabit({...habit, name: e.target.value})}
        />
        {/* <Form.Control
          as="select"
          value={dayToggle}
          onChange={e => setDayToggle(e.target.value)}
        >
          <option value="day">every day</option>
          <option value="week">on specific days</option>
        </Form.Control> */}
        <br/>
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
        <Button
          type="submit"
          style={{ margin: '0 auto' }}
        >
          Update
        </Button>
        <br/>
        <br/>
      </Form>
    </section>
  )
}

export default UpdateHabit
