import React, { useEffect, useState } from 'react'

const Button = (props) => {
  return (
    <button
      className={"delete-point-button"}
      onClick={() => { console.log('delete button clicked in bin item'); props.deletePoint(props.id, props.lat, props.lng) }}
    >Delete
    </button>
  )
}

export default function (props) {
  return (
    <ul className={"bin-item"}>
      {props.name}
      {props.region}
      <Button lat={props.lat} lng={props.lng} id={props.id} deletePoint={props.deletePoint}/>
    </ul>
  )
}