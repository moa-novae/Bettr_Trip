import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import './BinItem.css'

const Button = (props) => {
  return (
    <button
      className={"delete-point-button"}
      onClick={() => {
        axios.delete(`http://localhost:3001/api/trips/1/points/${props.id}`)
          .then(props.setDayState(prev => {
            let newState = { ...prev }
            delete newState.tasks[props.id]
            const idIndex = newState.columns['bin'].taskIds.indexOf(props.id.toString())
            newState.columns['bin'].taskIds.splice(idIndex, 1)
            return newState

          }))
      }}
    >Delete
    </button>
  )
}

export default function(props) {
  return (
    <>
      <Draggable draggableId={props.id.toString()} index={props.index}>
        {(provided, snapshot) => (
          <Card>

          <div className={"bin-item"}
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

                <Button id={props.id} setDayState={props.setDayState} />
              </Card.Body>
            </Card>
          </div>
          </Card>
        )}
      </Draggable>
    </>
  )
}