import React, { useState, useRef, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import axios from "axios";
import { useSprings } from 'react-spring'
import './recommend.css'

const proxyurl = "https://cors-anywhere.herokuapp.com/"

const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`



export default function(props) {
  const divRef = useRef()
  const [location, setLocation] = useState([])
  // const [springProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))

  const [springProps, set] = useSprings(location.length, i => ({ xys: [0, 0, 1] }))


  useEffect(() => {
    if (!props.currentState.location.coordinates) {
      console.log(props.currentState, "no coordinates for currentState");
    } else {
      axios.get(`${proxyurl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${props.currentState.location.coordinates.lat},${props.currentState.location.coordinates.lng}&radius=1000&type=tourist_attraction&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(res => {
          let output = [];
          for (let i = 0; i < res.data.results.length; i++) {
            let nearByLocation = {};
            nearByLocation["photo_reference"] = res.data.results[i].photos[0].photo_reference;
            nearByLocation["location"] = res.data.results[i].geometry.location;
            console.log(nearByLocation);

            output.push(nearByLocation);
          }
          setLocation(output)

          console.log(props.currentState, "ALL THE STATE");
        });
    }
  }, [props.currentState]);

  return springProps.map(({ xys }, index) => {
    console.log('springprops',springProps[index])
    return (
      // ref={divRef}
      <animated.div
        class="recommend-card"
        ref={divRef}
        onMouseOver={() => set(i => { if (i === index) return { xys: [0, 0, 1.2] } })}
        onMouseLeave={() => set(i => { if (i === index) return { xys: [0, 0, 1] } })}
        onClick={() => props.addPointToMap(location[index].location)}
        style={{ transform: xys.interpolate(trans), backgroundImage: `url(https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${location[index].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY})` }}
      />
    )
  }
  )
}