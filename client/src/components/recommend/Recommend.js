import React, {useState, useRef} from 'react'
import { useSpring, animated } from 'react-spring'
import './recommend.css'
// const[imgXY, setImgXY] = useState({imgX: 0, imgY: 0})
const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`


export default function(props) {
  const divRef = useRef()
  const [springProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  return (
    <div className='cards' ref={divRef}>
      <animated.div
        class="card"
        onMouseOver={() => set({xys: [0, 0, 1.2]})}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: springProps.xys.interpolate(trans) }}
      />
    </div>
  )
}