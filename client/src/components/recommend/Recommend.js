import React, { useState, useRef, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import axios from "axios";
import { useSprings } from 'react-spring'
import './recommend.css'


const initalCoors = [[48.8566, 2.3522], [51.5074, 0.1278], [40.7128, 74.0060], [49.2827, 123.1207]]
const proxyurl = "https://cors-anywhere.herokuapp.com/"

const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default function(props) {
  const divRef = useRef()
  const [location, setLocation] = useState([])
  // const [springProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))

  const [springProps, set] = useSprings(location.length, i => ({ xys: [0, 0, 1] }))


  useEffect(() => {
    axios.get(`${proxyurl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${initalCoors[0][0]},${initalCoors[0][1]}&radius=1000&type=tourist_attraction&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then(res => {
        // console.log(res.data.results)
        let output = [];
        for (let i = 0; i < res.data.results.length; i++) {
          output.push(res.data.results[i].photos[0].photo_reference)
          // console.log(output)
          // output.push(res.data.results[i].photo[0].photo_reference)
        }
        setLocation(output)
        // console.log(output)
        console.log(res.data.results)
        console.log('made a location api call')
      })
  }, [initalCoors])
  return springProps.map(({ xys }, index) => {
    // console.log('springprops',springProps[index])
    return (



      // ref={divRef}

      <animated.div
        class="card"
        ref={divRef}
        onMouseOver={() => set(i => { if (i === index) return { xys: [0, 0, 1.2] } })}
        onMouseLeave={() => set(i => { if (i === index) return { xys: [0, 0, 1] } })}
        style={{ transform: xys.interpolate(trans), backgroundImage: `url(https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${location[index]}&key=${process.env.REACT_APP_GOOGLE_API_KEY})` }}
      />


    )
  }
  )
}