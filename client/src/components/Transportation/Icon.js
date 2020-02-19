import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faCar, faWalking, faBus, faCircle } from '@fortawesome/free-solid-svg-icons'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import '../../../node_modules/font-awesome/css/font-awesome.css.map';

import Icon from '@material-ui/core/Icon';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';








export default function(props) {
  const iconDisplay = {
    Bicycle: <DirectionsBikeIcon />,
    Car: <DirectionsCarIcon />,
    Walking: <DirectionsWalkIcon />,
    Bus: <DirectionsBusIcon />,
  }
  return (
    <>
      <i onClick={() => {
        if (props.canSelectAsNew) {

          props.setDayState((prev) => {
            let newState = { ...prev }
            newState.tasks[props.task.id].travel.method = props.method
            return newState
          })
        }
        props.setShowIcons(!props.showIcons)
        props.setStart(true)


      }}>

        {iconDisplay[props.method]}
      </i>
    </>




  )
}