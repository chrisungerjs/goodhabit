import { useDebugValue, useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { useUpdateHabitMutation } from '../generated/graphql'
import {
  GetHabitsDocument,
  Habit,
  useGetHabitsQuery,
  useUpdateHistoryMutation,
} from '../generated/graphql'
import {
  archiveDate,
  today,
} from '../util/dateFunctions'
import HabitCard from './HabitCard'
import omitDeep from 'omit-deep-lodash'

const Today: React.FC = () => {
  const [updateHabit] = useUpdateHabitMutation()
  const { data } = useGetHabitsQuery()
  const [updateHistory] = useUpdateHistoryMutation()
  const [orderMap, setOrderMap] = useState(data.habits.map((habit) => habit._id))
  const todayDate = archiveDate(new Date())
  const [habitStatusMap, setHabitStatusMap] = useState(
    data.habits.reduce((a, b) => (
      a[b._id] = {
        isComplete:
          b.history?.length && b.history[b.history.length - 1].date === todayDate
          ? true
          : false
      }, a
    ), {})
  )
  const handleChecked = async (e: React.ChangeEvent<HTMLInputElement>, habit: Habit) => {
    e.stopPropagation()
    setHabitStatusMap({
      ...habitStatusMap,
      [habit._id] : { isComplete: e.target.checked }
    })
    const historyInput = { date: todayDate }
    updateHistory({
      variables: { _id: habit._id, historyInput },
      refetchQueries: [{ query: GetHabitsDocument }],
    })
  }
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId && 
      destination.index === source.index
    ) return
    const newMap = [...orderMap]
    newMap.splice(source.index, 1)
    newMap.splice(destination.index, 0, draggableId)
    setOrderMap(newMap)
    newMap.forEach((_id: string, index: number) => {
      const updatedHabit = {
        ...data.habits.find((habit) => habit._id === _id),
        index: index,
      }
      const habit = omitDeep(updatedHabit, '__typename')
      handleUpdateHabit(habit)
    })
  }
  const handleUpdateHabit = async (habit: any) => {
    await updateHabit({
      variables: { habit },
      refetchQueries: [{ query: GetHabitsDocument }],
    })
  }
  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      <Droppable droppableId="main">
        {(provided) => (
          <main
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
              {data?.habits && habitStatusMap ? (
                <>
                  {[...data.habits]
                    .filter((habit: Habit) => habit.schedule[today].doesRepeat)
                    .sort((a, b) => orderMap.indexOf(a._id) - orderMap.indexOf(b._id))
                    .map((habit: Habit, index: number) => (
                      <HabitCard
                        key={habit._id}
                        habit={habit}
                        habitStatusMap={habitStatusMap}
                        handleChecked={handleChecked}
                        index={index}
                      />
                    )
                  )}
                </>
              ) : null}
            {provided.placeholder}
          </main>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Today
