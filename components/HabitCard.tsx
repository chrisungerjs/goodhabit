import {
  Accordion,
  Card,
  Button,
} from 'react-bootstrap'
import { 
  GetHabitsDocument,
  Habit,
  useDeleteHabitMutation
} from '../generated/graphql'

interface HabitCardProps {
  today: string,
  habit: Habit,
  habitStatusMap: any,
  handleChecked: any,
}

const HabitCard: React.FC<HabitCardProps> = ({ today, habit, habitStatusMap, handleChecked }) => {
  const [deleteHabit] = useDeleteHabitMutation()
  return (
    <Accordion>
      <Accordion.Toggle as={Card} eventKey={habit._id}
        className="border-warning m-2"
        key={habit._id}
        style={{
        textDecoration: habitStatusMap[habit._id]?.isComplete ? 'line-through' : 'none',
        color: habitStatusMap[habit._id]?.isComplete ? '#777' : 'inherit',
        }}
      >
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
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={habit._id}>
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
      </Accordion.Collapse>
    </Accordion>
  )
}

export default HabitCard
