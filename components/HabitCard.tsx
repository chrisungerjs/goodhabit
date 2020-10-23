import {
  Accordion,
  Card,
  Button,
} from 'react-bootstrap'
import { 
  GetHabitsDocument,
  Habit,
  useDeleteHabitMutation,
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
    <>
      <Accordion>
        <Card
          className="border-success"
          key={habit._id}
        >
          <Card.Header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Accordion.Toggle as={Button} eventKey={habit._id}>&darr;</Accordion.Toggle>
            <span
              style={{
                textDecoration: habitStatusMap[habit._id]?.isComplete ? 'line-through' : 'none',
                color: habitStatusMap[habit._id]?.isComplete ? '#777' : 'inherit',
              }}
            >
              {habit.name}
              {habit.schedule[today].customName 
                ? <span>: {habit.schedule[today].customName}</span>
                : null
              }
            </span>
            <span>
              <input
                style={{ }}
                type="checkbox"
                defaultChecked={habitStatusMap[habit._id].isComplete}
                onChange={(e) => handleChecked(e, habit)}
              />
            </span>
          </Card.Header>
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
        </Card>
      </Accordion>
    </>
  )
}

export default HabitCard
