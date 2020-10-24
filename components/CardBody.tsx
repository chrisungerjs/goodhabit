import {
  Habit,
  GetHabitsDocument,
  useDeleteHabitMutation,
} from '../generated/graphql'
import {
  Card,
  Button,
} from 'react-bootstrap'
import {
  today,
  weekDateMap,
} from '../util/dateFunctions'
import UpdateHabit from './UpdateHabit'
import { useState } from 'react'

interface CardBodyProps {
  habit: Habit,
}

const CardBody: React.FC<CardBodyProps> = ({ habit }) => {
  const [deleteHabit] = useDeleteHabitMutation()
  const [isUpdateHabit, setIsUpdateHabit] = useState(false)
  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await deleteHabit({
      variables: { _id: habit._id },
      refetchQueries: [{ query: GetHabitsDocument }],
    })
  }
  return (
    <>
      <Card.Body>
        {isUpdateHabit ? (
          <UpdateHabit habitToUpdate={habit} setIsUpdateHabit={setIsUpdateHabit} />
        ) : (
          <>
            <section style={{
              padding: '.25rem',
              fontSize: '1rem',
            }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni fuga ad enim fugiat tenetur sit explicabo, mollitia ullam voluptates nobis
            </section>
            <section style={{
              padding: '.5rem',
            }}>
              {weekDateMap.map((date) => (
                <h4 key={date.dayOfTheWeek} style={{
                  color: habit.schedule[date.dayOfTheWeek].doesRepeat ? '#fff' : '#777',
                  textDecoration: date.dayOfTheWeek === today ? 'underline' : 'none',
                }}>
                  <span>
                    {date.dayOfTheWeek}
                  </span>
                  {habit.schedule[date.dayOfTheWeek].customName
                    ? <span>: {habit.schedule[date.dayOfTheWeek].customName}</span>
                    : null }
                  <span style ={{ color: 'teal' }}>
                    {habit.history.find((record) => record.date === date.date) ? <>&nbsp;&#10004;</> : null}
                  </span>
                </h4>
              ))}
            </section>
          </>
        )}
        <section style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 .25rem',
        }}>
          <Button
            variant="primary"
            onClick={() => setIsUpdateHabit(!isUpdateHabit)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={(e) => handleDelete(e)}
          >
            Remove
          </Button>
        </section>
      </Card.Body>
    </>
  )
}

export default CardBody
