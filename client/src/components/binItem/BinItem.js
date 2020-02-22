import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Button = (props) => {
  return (
    <button
      className={"delete-point-button"}
      onClick={() => { props.deletePoint(props.id, props.latitude, props.longitude) }}
    >Delete
    </button>
  )
}

export default function(props) {
  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <ul className={"bin-item"}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          >
          {props.name}
          {props.region}
          <Button latitude={props.latitude} longitude={props.longitude} id={props.id} deletePoint={props.deletePoint} />
        </ul>
      )}
    </Draggable>
  )
}