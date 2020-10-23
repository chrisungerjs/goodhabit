import {
  Accordion,
  Card,
  Button,
} from 'react-bootstrap'
import { Habit } from '../generated/graphql'
import CardBody from './CardBody'
import { today } from '../util/dateFunctions'
import { Draggable } from 'react-beautiful-dnd'

interface HabitCardProps {
  habit: Habit,
  habitStatusMap: any,
  handleChecked: any,
  index: number,
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, habitStatusMap, handleChecked, index }) => {
  return (
    <Draggable
      draggableId={habit._id}
      index={index}
    >
      {(provided) => (
        <Accordion
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            className="border-info m-1"
            key={habit._id}
          >
            <Card.Header style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Accordion.Toggle
                as={Button}
                eventKey={habit._id}
                size="sm"
              >
                &#x25BC;
              </Accordion.Toggle>
              <span
                style={{
                  fontSize: '1.15rem',
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
                  defaultChecked={habitStatusMap[habit._id]?.isComplete || false}
                  onChange={(e) => handleChecked(e, habit)}
                />
              </span>
            </Card.Header>
            <Accordion.Collapse eventKey={habit._id}>
              <CardBody habit={habit} />
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )}

    </Draggable>
  )
}

export default HabitCard
