import React, { useState } from 'react';
import Task from './task.jsx'
import styled from 'styled-components'
import { Droppable } from "react-beautiful-dnd"
import Bin from '../bin'
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  `;
const Title = styled.h3`
  padding: 8px`;
const TaskList = styled.div`
padding: 8px`

export default function(props) {
  const {column} = props
  return (
    <>
    {column.title === "Day list" &&
        <Container>
          <Title> {props.column.title} </Title>
          <Droppable droppableId={props.column.id}>
            {(provided) => (
              <TaskList
                provided={provided}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.tasks.map((task, index) => {


                  if (task) {
                    return (
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        expanded={props.expanded}
                        setExpanded={props.setExpanded}
                        exit={props.exit}
                        setDayState={props.setDayState}
                        state={props.state} />
                    )
                  }
                })}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
    }
    {column.title === 'Bin' &&  
      <Bin
        bin={props.bin}
        deletePoint={props.deletePoint}
      />
    }
    </>
  )
}