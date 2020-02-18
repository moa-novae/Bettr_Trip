import React from 'react'
import { faBicycle, faCar, faWalking, faBus } from '@fortawesome/free-solid-svg-icons'

export default function (props) {
  const iconDisplay {
    Bicycle: faBicycle,
    Car: faCar,
    Walking: faWalking,
    Bus: faBus,
  }
  return (
    <FontAwesomeIcon icon={iconDisplay[props.travel.method]} />
  )
}