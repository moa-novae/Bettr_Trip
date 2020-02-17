import React from 'react'
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
export default function (props) {
  return (
    <div style={style}>
      duration: {props.duration}
      method: {props.method}
    </div>
  )
}