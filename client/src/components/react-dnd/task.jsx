import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
marin-bottom: 8px;
`;

export default function(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        
        
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.location}
        </Container>
      )}
    </Draggable>
  )
}