import {
  DragDropContext,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import HabitList from './HabitList'

const Today: React.FC = () => {  
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId && 
      destination.index === source.index
    ) return
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="main">
        {(provided) => (
          <main
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <HabitList />
            {provided.placeholder}
          </main>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Today
