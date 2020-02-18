import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faCar, faWalking, faBus } from '@fortawesome/free-solid-svg-icons'

export default function (props) {
  const iconDisplay = {
    Bicycle: faBicycle,
    Car: faCar,
    Walking: faWalking,
    Bus: faBus,
  }
  return (
    <div className='icon'>
      <i onClick={() => console.log('click')}>

      <FontAwesomeIcon icon={iconDisplay[props.travel.method]} />
      </i>
    </div>
  )
}