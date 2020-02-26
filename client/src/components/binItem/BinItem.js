import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Card } from 'react-bootstrap'
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
          // <Card>

          <ul className={"bin-item"}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card style={{ width: '10rem' }}>
              <Card.Body>
                <Card.Title>

                  {props.name}
                </Card.Title>
                <Card.Subtitle>

                  {props.region}
                </Card.Subtitle>

                <Button lat={props.lat} lng={props.lng} id={props.id} deletePoint={props.deletePoint} />
              </Card.Body>
            </Card>
          </ul>
          // </Card>
        )}
      </Draggable>
    </>
  )
}