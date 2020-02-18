import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import { animated, useSprings, interpolate, useSpring } from 'react-spring'

export default function(props) {
  const transportMethods = ['Bicycle', 'Walking', 'Bus', 'Car']
  //relocates selected to 0 index
  transportMethods.splice(transportMethods.indexOf(props.travel.method), 1)
  transportMethods.splice(0, 0, props.travel.method)

  const [showIcons, setShowIcons] = useState(1)

  const [springProps, set] = useSpring(() => ({transform: showIcons === 0 ?`translate3d(0%, 0, 0)` : `translate3d(10%, 0, 0)`}))
  
  useEffect(() => {
    console.log("Was this called???")
    console.log("This is showicons: ", showIcons)
    console.log( showIcons === 1 ?`translate3d(0%, 0, 0)` : `translate3d(10%, 0, 0)`)
    set({transform: showIcons === 0 ?`translate3d(0%, 0, 0)` : `translate3d(10%, 0, 0)`} )
  }, [showIcons])
  console.log(springProps)
  return (
    <>
      <p>Duration: {props.travel.duration}</p>
      <p>Method: {props.travel.method}</p>
      <animated.div style={springProps}>
        
        <Icon travel={props.travel} />
      </animated.div>
      <button onClick={()=>setShowIcons( showIcons === 0 ? 1 : 0)
      }>
        {showIcons}
      </button>
      
    </>
  )

  // const [springProps, set] = useSprings(transportMethods.length, index => ({x: 0}))
  // const runThis = () => {
  //   console.log('hi')
  //   return springProps.map(({ x }, i) => (
  //     <animated.div key={i} style={{x: `${x}px`}}>
  //       <Icon travel={transportMethods[i]} />
  //     </animated.div>
  //   ))
  // }

  // if (showIcons){
  //   set(index => (to(index)))
  // }
  // return (
  //   <>
  //     <p>Duration: {props.travel.duration}</p>
  //     <p>Method: {props.travel.method}</p>
  //     <Icon travel={props.travel} setShowIcons={setShowIcons} />
  //     {runThis}
  //   </>
  // )
}