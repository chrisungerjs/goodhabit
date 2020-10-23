import {
  useDeleteHabitMutation,
  GetHabitsDocument,
  Habit,
} from '../generated/graphql'
import {
  Button,
  Card,
} from 'react-bootstrap'

interface CardBodyProps {
  habit: Habit,
}

const CardBody: React.FC<CardBodyProps> = ({ habit }) => {
  const [deleteHabit] = useDeleteHabitMutation()
  return (
    <>
      <Card.Body>
        <div>
          {JSON.stringify(habit)}
        </div>
        
        <Button
          variant="danger"
          onClick={async () => await deleteHabit({
            variables: { _id: habit._id },
            refetchQueries: [{ query: GetHabitsDocument }],
          })}
        >
          Remove
        </Button>
      </Card.Body>
    </>
  )
}

export default CardBody
