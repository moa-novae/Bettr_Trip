import React, { useEffect, useState } from 'react'

const Button = (props) => {
  return (
    <button
      className={"delete-point-button"}
      onClick={() => { props.deletePoint(props.id, props.latitude, props.longitude) }}
    >Delete
    </button>
  )
}

export default function (props) {
  return (
    <ul className={"bin-item"}>
      {props.name}
      {props.region}
      <Button latitude={props.latitude} longitude={props.longitude} id={props.id} deletePoint={props.deletePoint}/>
    </ul>
  )
}