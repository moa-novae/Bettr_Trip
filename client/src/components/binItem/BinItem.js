import React, { useEffect, useState } from 'react'

export default function (props) {
  return (
    <ul>
      {props.name}
      {props.region}
    </ul>
  )
}