import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import './infobox.css'

export default function(props) {
  const [info, setInfo] = useState([])
  const transitions = useTransition(info, null, {
    from: { opacity: 0 },
    enter: { opacity: 0.8 },
    leave: { opacity: 0 },
  })
  useEffect(() => {
    if(props.showLocation) {setInfo([props.showLocation])}
    else(setInfo([]))
  }, [props.showLocation])
  return transitions.map(({ item, props }) => (
    <animated.div style={props} className='more-info'
    >
      
    <div><p>{item.name}</p></div>
    </animated.div>
  )
  )
}