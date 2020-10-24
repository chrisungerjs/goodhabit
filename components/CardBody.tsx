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
  daysOfTheWeek,
} from '../util/dateFunctions'

interface CardBodyProps {
  habit: Habit,
}

const CardBody: React.FC<CardBodyProps> = ({ habit }) => {
  const [deleteHabit] = useDeleteHabitMutation()
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
        {daysOfTheWeek.map((day: string) => (
          <h4 key={day} style={{
            color: habit.schedule[day].doesRepeat ? '#fff' : '#777',
            textDecoration: day === today ? 'underline' : 'none',
          }}>
            <span>
              {day}
            </span>
            {habit.schedule[day].customName
              ? <span>: {habit.schedule[day].customName}</span>
              : null }
          </h4>
        ))}
        <Button
          variant="danger"
          onClick={(e) => handleDelete(e)}
        >
          Remove
        </Button>
      </Card.Body>
    </>
  )
}

export default CardBody
