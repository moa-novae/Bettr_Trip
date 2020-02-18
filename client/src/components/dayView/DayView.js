import React, { useState } from 'react'
import initialData from './initial-data'
import Column from './column.jsx'
import { DragDropContext } from 'react-beautiful-dnd'

export default function() {
  const [state, setState] = useState(initialData)
  const [isDragging, setDrag] = useState (false)
  const [expanded, setExpanded] = React.useState(true);
  const [exit, setExit] = useState(true) //animation of collapse material ui
  const onBeforeCapture = start => {
    console.log('ehl')
    setExit(false) //disable animation so collapsed tab unmounts right away
    setExpanded(false) //collapses tab before drag starts
  }

  //manages logic when drag finishes
  const onDragEnd = result => {
    setExpanded(true)
    const { destination, source, draggableId } = result;
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    }
    setState(newState)

  }

  return (
    <div>
      <DragDropContext 
      onDragEnd={onDragEnd} 
      onBeforeCapture={onBeforeCapture}>
        {state.columnOrder.map(columnId => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(taskId => state.tasks[taskId])
          return <Column key={column.id} column={column} tasks={tasks} expanded={expanded} setExpanded={setExpanded} exit={exit}/>
        })}
      </DragDropContext>
    </div>
  )
}