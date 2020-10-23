import {
  Accordion,
  Card,
  Button,
} from 'react-bootstrap'
import { Habit } from '../generated/graphql'
import CardBody from './CardBody'
import { today } from '../util/dateFunctions'

interface HabitCardProps {
  habit: Habit,
  habitStatusMap: any,
  handleChecked: any,
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, habitStatusMap, handleChecked }) => {
  return (
    <>
      <Accordion>
        <Card
          className="border-warning m-1"
          key={habit._id}
        >
          <Card.Header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Accordion.Toggle as={Button} eventKey={habit._id}>-</Accordion.Toggle>
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
            <CardBody habit={habit} />
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  )
}

export default HabitCard
