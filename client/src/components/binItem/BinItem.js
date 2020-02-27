import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Card } from 'react-bootstrap'
import './BinItem.css'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



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
          <Card>

          <div className={"bin-item"}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card style={{ width: '10rem', borderRadius: '10px'}} className={"card-bin"} >
              <Card.Body className={"card-body-bin"} >
                <Card.Title className={"card-title"}>

                  {props.name}
                </Card.Title>
                <Card.Subtitle className={"card-subtitle"}>

                  {props.region}
                </Card.Subtitle>

                <IconButton lat={props.lat} lng={props.lng} id={props.id} deletePoint={props.deletePoint} >
                  <DeleteIcon className={"card-delete-icon"} />
                </IconButton>
              </Card.Body>
            </Card>
          </div>
          </Card>
        )}
      </Draggable>
    </>
  )
}