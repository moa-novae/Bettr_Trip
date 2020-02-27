import React, { useState, useRef, useEffect } from 'react'
import { useSpring, animated, useTransition } from 'react-spring'
import axios from "axios";
import { Button } from 'react-bootstrap'
import { useSprings } from 'react-spring'
import './recommend.css'
import InfoBox from '../infoBox'

const proxyurl = "https://cors-anywhere.herokuapp.com/"

const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`



export default function(props) {
  const divRef = useRef()
  const [location, setLocation] = useState([])
  // const [springProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  const [locationInfo, setLocationInfo] = useState([])
  const [showLocation, setShowLocation] = useState([])
  const [springProps, set] = useSprings(location.length, i => ({ xys: [0, 0, 1] }))


  useEffect(() => {
    if (!props.currentState.location.coordinates) {
      console.log(props.currentState, "no coordinates for currentState");
    } else {
      axios.get(`${proxyurl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${props.currentState.location.coordinates.lat},${props.currentState.location.coordinates.lng}&radius=1000&type=tourist_attraction&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(res => {
          let output = [];
          let locationInfoArr = [];
          for (let i = 0; i < res.data.results.length; i++) {
            let nearByLocation = {};

            if (res.data.results[i].photos) {
              nearByLocation["photo_reference"] = res.data.results[i].photos[0].photo_reference;
              console.log(nearByLocation.photo_reference, "AAAAAAA");
              nearByLocation["location"] = res.data.results[i].geometry.location;
              locationInfoArr.push({ name: res.data.results[i].name, vicinity: res.data.results[i].vicinity })

              output.push(nearByLocation);
            }
          }
          setLocation(output)
          setLocationInfo(locationInfoArr)

        });
    }
  }, [props.currentState]);

  return (<>

    {
      springProps.map(({ xys }, index) => {
        return (
          <animated.div
            class="recommend-card"
            ref={divRef}
            onMouseOver={() => set(i => { if (i === index) return { xys: [0, 0, 1.2] } })}
            onMouseLeave={() => set(i => { if (i === index) return { xys: [0, 0, 1] } })}
            onClick={() => {
              props.addPointToMap(location[index].location);
              setShowLocation(prev => {
                let newState = { ...prev };
                if (!newState[index.toString()]) {
                  newState[index.toString()] = locationInfo[index]
                }
                else {
                  delete newState[index.toString()]
                }
                return newState
              })
            }}
            style={{ transform: xys.interpolate(trans), backgroundImage: `url(https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${location[index].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY})` }}
          >

            <InfoBox showLocation={showLocation[index]} />

          </animated.div>
        )
      }
      )
    }
  </>
  )
}