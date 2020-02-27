import React, { useState, useEffect } from 'react';
import Task from './task.jsx'
import styled from 'styled-components'
import { Droppable } from "react-beautiful-dnd"
import Bin from '../bin'
import moment from 'moment'
import { useTransition, animated } from 'react-spring'
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  min-height: 10vh;
  overflow: auto;
  
  `;
const Title = styled.h3`
  padding: 8px;
  `;
const TaskList = styled.div`
padding: 8px;
`

const EmptyCard = styled.p`
size: 4em;
padding-top: 2em;
color: lightgrey;`

export default function(props) {
  const { column, state } = props
  const [tasks, setTasks] = useState(props.tasks)
  const taskTransitions = useTransition(tasks, task => task.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  useEffect(() => {
    setTasks(props.tasks)
  }, [props.tasks])
  return (
    <>
      {/* {console.log('column state', props.column.title)} */}
      {/* {console.log('column tasks', props.tasks)} */}
      {column.title !== "bin" &&
        <div className='card'>
          <div className='card-header' style={{ position: 'sticky', top: 0, margin: 0, opacity: 1, backgroundColor: 'lightblue', zIndex: 4, color: 'white' }}>

            <Title> {moment(props.column.title, 'YYYY-MM-DD').format('MMMM D')} </Title>
          </div>
          <Container>
            <Droppable droppableId={props.column.id} style={{ minHeight: '30vh' }}>
              {(provided) => (
                <TaskList
                  provided={provided}
                  ref={provided.innerRef}
                  style={{ minHeight: '10vh' }}
                  {...provided.droppableProps}
                >
                  {taskTransitions.map(({ item, props:{opacity}, key },index) =>


                    <animated.div key={key} style = { opacity } >

                    <Task
                      key={item.id}
                      columnId={column.id}
                      task={item}
                      index={index}
                      expanded={props.expanded}
                      setExpanded={props.setExpanded}
                      exit={props.exit}
                      setDayState={props.setDayState}
                      state={props.state}
                      setDelete={props.setDelete} />
                      
                          </animated.div>
              )}


              {props.tasks.length === 0 && <EmptyCard>Nothing Planned Yet</EmptyCard>}
              {provided.placeholder}
                </TaskList>
            )}
            </Droppable>
          </Container>
        </div>
      }

{
column.title === 'bin' &&
  <Bin
    bin={props.state.columns['bin'].taskIds.map(point => props.state.tasks[point])}
    column={column}
  />
}
    </>
  )
}