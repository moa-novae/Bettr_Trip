import React, { setState, useState, useEffect, params } from 'react';
import initialData from './initial-data';
import Column from './column.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { useParams } from 'react-router-dom'


export default function(props) {
  let { id } = useParams();
  console.log(props.daysArr)
  let initialState = {tasks:{}, columns:{'column-1': {taskIds: []}}};
  props.daysArr.map(point => {
    initialState.tasks[point.id.toString()] = {
      trip_id: point.trip_id,
      id: point.id,
      name: point.name,
      latitude: point.latitude,
      longitude: point.longitude,
      time:{start: point.start_time, end: point.end_time,},
      region: point.region,
      activity: point.activity,
      travel: {method: point.travel_method, duration: point.travel_duration}
    }

    initialState.columns['column-1'].taskIds.push(point.id)
    
  })
  initialState.columns['column-1'].id = 'column-1'
  initialState.columns['column-1'].title = 'Day list'
  initialState.columnOrder = ['column-1']
  
  

  




  const [state, setDayState] = useState(initialState);
  console.log(state, 'state')
  const [expanded, setExpanded] = useState(true);
  const [exit, setExit] = useState(true) //animation of collapse material ui
  const onBeforeCapture = start => {
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
      console.log('axios put', state.tasks[key].time.start, state.tasks[key].time.end, 'd:', key)
      axios.put(`http://localhost:3001/api/trips/${value.trip_id}/points/${key}`, {
        name: state.tasks[key].name,
        start_time: state.tasks[key].time.start,
        end_time: state.tasks[key].time.end,
        activity: state.tasks[key].activity
      }
      )
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