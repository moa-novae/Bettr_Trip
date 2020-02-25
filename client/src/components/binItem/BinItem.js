import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import './BinItem.css'

const Button = (props) => {
  return (
    <button
      className={"delete-point-button"}
      onClick={() => { props.deletePoint(props.id, props.lat, props.lng) }}
    >Delete
    </button>
  )
}

export default function(props) {
  return (
    <>
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <ul className={"bin-item"}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          >
          {props.name}
          {props.region}
        </ul>
      )}
    </Draggable>
      <Button lat={props.lat} lng={props.lng} id={props.id} deletePoint={props.deletePoint} />
      </>
  )
}