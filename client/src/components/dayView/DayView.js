import React, { setState, useState, useEffect, params } from 'react';
import initialData from './initial-data';
import Column from './column.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import MomentAdapter from '@date-io/moment'
import manageTime from './helper'
const Moment = new MomentAdapter();
const { moment, humanize } = Moment









export default function(props) {

  //generate inital state
  let initialState = { tasks: {}, columns: { 'column-1': { taskIds: [] } } };
  initialState.columns['column-1'].id = 'column-1'
  initialState.columns['column-1'].title = 'Day list'
  initialState.columns['column-2'] = { id: 'column-2', title: 'Bin', taskIds: [] }
  initialState.columnOrder = ['column-1', 'column-2']

  props.daysArr.map(point => {
    initialState.tasks[point.id.toString()] = {
      trip_id: point.trip_id,
      id: point.id,
      name: point.name,
      latitude: point.latitude,
      longitude: point.longitude,
      time: { start: point.start_time, end: point.end_time, },
      region: point.region,
      activity: point.activity,
      travel: { method: point.travel_method, duration: point.travel_duration }
    }
    if (point.start_time && point.end_time) {
      initialState.columns['column-1'].taskIds.push(point.id.toString())
    }
    else {
      initialState.columns['column-2'].taskIds.push(point.id.toString())
    }

  })


  const [deleteId, setDelete] = useState([]);
  const [state, setDayState] = useState(initialState);
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
    setDayState(prev => {

      const start = prev.columns[source.droppableId];
      const finish = prev.columns[destination.droppableId]
      if (start === finish) {


        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn = {
          ...start,
          taskIds: newTaskIds
        }
        const newState = {
          ...prev,
          columns: {
            ...prev.columns,
            [newColumn.id]: newColumn,
          },
        }
        console.log('newTasks in dropend', newState.tasks)
        return (manageTime(newState))
      }

      //move between lists
      else {
        const startTaskIds = Array.from(start.taskIds)
        console.log('start', startTaskIds)
        console.log('source.index', source.index)
        startTaskIds.splice(source.index, 1)
        console.log('finish', startTaskIds)
        const newStart = {
          ...start,
          taskIds: startTaskIds,
        }
        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
          ...finish,
          taskIds: finishTaskIds,
        };
        let newState = {
          ...prev,
          columns: {
            ...prev.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          },
        };
        newState.tasks[draggableId].time = { start: '2020-02-20 02:17:41', end: '2020-02-20 03:17:41' }
        newState.tasks[draggableId].travel = { method: 'driving', duration: 3 }
        return manageTime(newState)
        //console.log(state.tasks)
      }
    })

  };
  // update state when daysArr updates
  useEffect(() => {
    setDayState(prev => {
      let newState = { ...prev }
      newState.columns['column-1'].taskIds = [];
      newState.columns['column-2'].taskIds = [];
      props.daysArr.map(point => {

        newState.tasks[point.id.toString()] = {
          trip_id: point.trip_id,
          id: point.id,
          name: point.name,
          latitude: point.latitude,
          longitude: point.longitude,
          time: { start: point.start_time, end: point.end_time, },
          region: point.region,
          activity: point.activity,
          travel: { method: point.travel_method, duration: point.travel_duration }
        }
        if (point.start_time && point.end_time) {
          newState.columns['column-1'].taskIds.push(point.id.toString())
        }
        else {
          newState.columns['column-2'].taskIds.push(point.id.toString())
        }

      })
      return newState
    })
  }, [props.daysArr])

  //delete locations
  useEffect(() => {
    deleteId.forEach(id => {
      axios.delete(`http://localhost:3000/trips/1/points/${id}`)
      .then(setDayState(prev => {
        let newState = {...prev}
        delete newState.tasks[id]
        const idIndex = newState.columns['column-1'].taskIds.indexOf(id.toString())
        console.log('idIndex',idIndex)
        newState.columns['column-1'].taskIds.splice(idIndex, 1)
        console.log(newState.columns['column-1'].taskIds)
        setDelete([])
        return newState
        
      }))
    })
  },[deleteId])



  //update to database when state changes 
  useEffect(() => {

    props.setUpdatedState(prev => {
      let newState = { ...state }
      newState.bin = []
      for (let [key, value] of Object.entries(newState.tasks)) {
        newState.bin.push({
          name: value.name,
          id: value.id,
          regions: value.region,
          latitude: value.latitude,
          longitude: value.longitude,
          start_time: value.time.start,
          end_time: value.time.end,
          trip_id: value.trip_id,
          activity: value.activity,
          travel_method: value.travel.method,
          travel_duration: value.travel.duration,

        })
      }
      return newState

    })
    // setDayState(prev => manageTime(prev))
    console.log('before put', state)
    for (let id of state.columns['column-1'].taskIds) {
      axios.put(`http://localhost:3001/api/trips/${state.tasks[id].trip_id}/points/${id}`, {
        name: state.tasks[id].name,
        start_time: state.tasks[id].time.start,
        end_time: state.tasks[id].time.end,
        activity: state.tasks[id].activity,
        travel_method: state.tasks[id].travel.method,
        travel_duration: state.tasks[id].travel.duration
      }
      )
    }
  }, [state])

  return (
    <div className='detailed-view'>

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
            setDelete={setDelete}

          />
        })}
      </DragDropContext>
    </div>
  )
}