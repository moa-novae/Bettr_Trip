import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import { animated, useSprings, interpolate, useSpring } from 'react-spring'
import './icon.scss'

export default function(props) {
  const transportMethods = ['Bicycle', 'Walking', 'Bus', 'Car']
  //relocates selected to 0 index
  transportMethods.splice(transportMethods.indexOf(props.travel.method), 1)
  transportMethods.splice(0, 0, props.travel.method)

  const [showIcons, setShowIcons] = useState(0)

  const [springProps, set] = useSprings(transportMethods.length, index => ({
    x: showIcons === 0 ? 0 : 40 * index,
    from: { x: 0 }
  }))
  useEffect(() => {
    set(index => ({
      x: showIcons === 0 ? 0 : 40 * index,
      from: { x: 0 }
    }))
  }, [showIcons])

  return (
    <>
      <p>Duration: {props.travel.duration}</p>
      <p>Method: {props.travel.method}</p>
      <div className="icon-container">

        {springProps.map(({ x }, i) => (

          <animated.div
            key={i}
            style={{
              
              position: 'absolute',
              left: x
            }}>

            <Icon method={transportMethods[i]} />
          </animated.div>
        ))}
      </div>
      <button onClick={() => setShowIcons(showIcons === 0 ? 1 : 0)
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