import React, { setState, useState, useEffect, params } from 'react';
import initialData from './initial-data';
import Column from './column.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { useParams } from 'react-router-dom'


export default function() {
  let { id } = useParams();
  useEffect(() => {
  
  })




  const [state, setDayState] = useState(initialData);
  const [expanded, setExpanded] = useState(true);
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
    setDayState(prev => newState)

  }

  

  useEffect(() => {
    for (let [key, value] of Object.entries(state.tasks)) {
      axios.put(`http://localhost:3001/api/trips/${id}/points/${key}`, {
        name: state.tasks[key].name,
        start_time: state.tasks[key].time.start,
        end_time: state.tasks[key].time.end,
        activity: state.tasks[key].activity
      })
    }
  }, [state])




  return (
    <div>
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeCapture={onBeforeCapture}>
        {state.columnOrder.map(columnId => { //currently only one column
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(taskId => state.tasks[taskId]) //individual stops are collected in array
          return <Column
            key={column.id}
            column={column}
            tasks={tasks}
            expanded={expanded}
            setExpanded={setExpanded}
            exit={exit}
            setDayState={setDayState}
            state={state}
          />
        })}
      </DragDropContext>
    </div>
  )
}