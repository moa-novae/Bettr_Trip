import React, { setState, useState, useEffect, params } from 'react';
import initialData from './initial-data';
import Column from './column.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import MomentAdapter from '@date-io/moment'
import manageTime from './helper'
import './dayView.css'
const Moment = new MomentAdapter();
const { moment, humanize, isBefore } = Moment









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
  const [tripTime, setTripTime] = useState({})
  const [expanded, setExpanded] = useState(true);
  const [exit, setExit] = useState(true) //animation of collapse material ui
  const onBeforeCapture = start => {
    setExit(false) //disable animation so collapsed tab unmounts right away
    setExpanded(false) //collapses tab before drag starts
  }
  // console.log('trip time', props.tripTime)
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
        // console.log('newTasks in dropend', newState.tasks)
        return (manageTime(newState, source.index, destination.index))
      }

      //move between lists
      else {
        const startTaskIds = Array.from(start.taskIds)
        // console.log('start', startTaskIds)
        // console.log('source.index', source.index)
        startTaskIds.splice(source.index, 1)
        // console.log('finish', startTaskIds)
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
        return manageTime(newState, source.index, destination.index)
        //console.log(state.tasks)
      }
    })

  };
  // update state when daysArr updates

  useEffect(() => {

    if (props.tripTime) {
      console.log('i am receiving', moment(props.tripTime.start, 'X'),  moment(props.tripTime.end, 'X'))
      setTripTime({ start: moment(props.tripTime.start, 'X'), end: moment(props.tripTime.end, 'X') })
    }
  
    
    setDayState(prev => {
      let newState = { ...prev }
      
      // if (moment(tripTime.start).format('YYYY')) {
      //   // console.log('the trip goes from', moment(tripTime.start).format('YYYY-MM-DD'), 'to', moment(tripTime.end).format('YYYY-MM-DD'))
      //   for (let m = moment(tripTime.start); m.diff(tripTime.end) <= 0; m.add(1, 'days')) {
      //     // console.log('forloop test', m.format('YYYY-MM-DD'))
      //     newState.columns[m.format('YYYY-MM-DD')].taskIds = []
  
      //   }
      // }


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

        // console.log('after', newState.tasks)
        // }


        if (newState.tasks[point.id.toString()].time.start && newState.tasks[point.id.toString()].time.end) {
          // console.log('point.id', point.id)
          newState.columns['column-1'].taskIds.push(point.id.toString())
        }
        else {
          newState.columns['column-2'].taskIds.push(point.id.toString())
        }

      })
      // console.log('newState', newState)

      return newState
    })
  }, [props.daysArr])


  //delete locations





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
      console.log('newState', newState)
      return newState
    })
    // setDayState(prev => manageTime(prev))

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
    // setDayState(prev => {console.log('prev', prev);
    // return prev})

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