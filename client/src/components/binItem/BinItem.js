import React, { useEffect, useState } from 'react'

const Button = (props) => {
  return (
    <button
      className={"delete-point-button"}
      onClick={() => { console.log('button clicked'); props.deletePoint(props.lat, props.lng) }}
    >Delete
    </button>
  )
}

export default function (props) {
  return (
    <ul className={"bin-item"}>
      {props.name}
      {props.region}
      <Button deletePoint={props.deletePoint}/>
    </ul>
  )
}