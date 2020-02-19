import React, { useEffect, useState, setState, useRef } from 'react'
import Icon from './Icon'
import { animated, useSprings, useTransition, useChain, useSpring } from 'react-spring'
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
  const [springProps, set] = useSpring(() => ({

    to: { x: !showIcons ? 0 : 40 },
    from: { x: !showIcons ? 40 : 0 },

  }))

  const { task, setDayState } = props

  // const unselectedIcons = transportMethods.splice(0, 1)
  // const transitionRef = useRef();
  console.log('transport', transportMethods)
  const method = transportMethods.map((child, i) => {
    return [child, i]
  })







  const transitions = useTransition(
    transportMethods[0],
    item => item,
    {
      from: { opacity: 0, x: 10 },
      leave: ({ opacity: 0, x: 0 }),
      enter: ({ opacity: 1, x: 40}),
    })
  const transitions1 = useTransition(
    transportMethods[1],
    item => item,
    {
      from: { opacity: 0, x: 0 },
      leave: ({ opacity: 0, x: 0 }),
      enter: ({ opacity: 1, x: 200 }),
    })
  const transitions2 = useTransition(
    transportMethods[2],
    item => item,
    {
      from: { opacity: 0, x: 0 },
      leave: ({ opacity: 0, x: 0 }),
      enter: ({ opacity: 1, x: 200 }),
    })
  const transitions3 = useTransition(
    transportMethods[3],
    item => item,
    {
      from: { opacity: 0, x: 0 },
      leave: ({ opacity: 0, x: 0 }),
      enter: ({ opacity: 1, x: 200 }),
    })
  const trans = [transitions, transitions1, transitions2, transitions3]
  console.log(method[1], 'method')
  //useChain([springRef, transitionRef])
  // useEffect(() => {
  //   set(({
  //     to: {x: !showIcons ? 0 : 40 * index},
  //     from: { x:  !showIcons? 40 * index : 0 },

  //   }))
  // }, [showIcons])

  return (
    <>
      <p>Duration: {props.travel.duration}</p>
      <p>Method: {props.travel.method}</p>
      <div className="icon-container">
        {
          trans.map(e =>

            e.map(({ item, props, key }, index) => {
              return (

                <animated.div
                  key={key}
                  style={{
                    ...props, 
                    transform: props.x.interpolate((x) => `translate3d(${x}px,0,0)`)
                  }}>

                  {(transportMethods.indexOf(item) === 0 || showIcons) &&
                    <Icon method={item}
                      setShowIcons={setShowIcons}
                      showIcons={showIcons}
                      setDayState={setDayState}
                      task={task}
                      canSelectAsNew={(!unmountIcons)}
                      setStart={setStart}

                    />}
                </animated.div>
              )
            })
          )
        }
        {/* {console.log('finish loop')} */}
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