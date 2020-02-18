import React from 'react'
import Icon from './Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faCar, faWalking, faBus } from '@fortawesome/free-solid-svg-icons'

show

export default function(props) {

  return (
    <>

      <p>Duration: {props.travel.duration}</p>
      <p>Method: {props.travel.method}</p>
      <div className='transportaiton' onClick={() =>}>
        <Icon travel={props.travel} />
      </div>

    </>
  )
}