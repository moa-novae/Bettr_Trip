import React, { useEffect, useState, setState, useRef } from 'react'
import Icon from './Icon'
import { animated, useSprings, useTransition, useChain } from 'react-spring'
import './icon.scss'
import zIndex from '@material-ui/core/styles/zIndex'

export default function(props) {

  const transportMethods = ['Bicycle', 'Walking', 'Bus', 'Car']
  //relocates selected to 0 index

  transportMethods.splice(transportMethods.indexOf(props.travel.method), 1)

  transportMethods.splice(0, 0, props.travel.method)


  const [showIcons, setShowIcons] = useState(false) // 0 => show only selected, 1 => show all
  const [unmountIcons, setUnmountIcons] = useState(true) // true => only show selected icon upon animation end
  const [start, setStart] = useState(false)
  const [finish, setFinish] = useState(false)
  
  //const springsRef = useRef();
  const [springProps, set] = useSprings(transportMethods.length, index => ({

    x: showIcons === 0 ? 0 : 40 * index,
    from: { x: 0 },

  }))

  // const unselectedIcons = transportMethods.splice(0, 1)
  // const transitionRef = useRef();
  // const transitions = useTransition(unselectedIcons, item => unselectedIcons.indexOf(item), {
  //   ref: transitionRef,
  //   from: {opaciy: 0},
  //   enter: { opacity: 1},
  //   leave: { opacity: 0},
  // })

  //useChain([springRef, transitionRef])
  useEffect(() => {
    set(index => ({
      to: {x: !showIcons ? 0 : 40 * index},
      from: { x:  !showIcons? 40 * index : 0 },
      onStart: () => {
        if (showIcons) {
          if (start) setUnmountIcons(false);
        }
      },
      onRest: () => {
        console.log('onRest')
        
        if (!showIcons) {

          setFinish(true)
          if (start) {
            if (finish) { setUnmountIcons(true); }
          }
        }
        setStart(false)
      }
    }))
  }, [showIcons])

  return (
    <>
      <p>Duration: {props.travel.duration}</p>
      <p>Method: {props.travel.method}</p>
      <div className="icon-container">

        {springProps.map(({ x }, i) => {
          return (

            <animated.div
              key={i}
              style={{
                left: x,
                zIndex: 10 - x,
              }}>

              {(i === 0 || !unmountIcons) &&
                <Icon method={transportMethods[i]}
                  setShowIcons={setShowIcons}
                  showIcons={showIcons}
                  setDayState={props.setDayState}
                  task={props.task}
                  canSelectAsNew={(!unmountIcons)}
                  setStart={setStart}

                />}
            </animated.div>
          )
        })}
      </div>

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