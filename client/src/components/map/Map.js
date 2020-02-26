import React, { useEffect, useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import _ from 'lodash';
import axios from 'axios';
import { componentDidMount } from 'react-google-maps/lib/utils/MapChildHelper';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Bin from '../bin'

const Button = (props) => {
  return (
    <button
      className={"saveButton"}
      onClick={() => { console.log('button clicked'); props.saveLocation() }}
    >Save
    </button>
  )
}

const Input = () => {
  return (
    <input
      type="text"
      placeholder="Customized your placeholder"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        marginTop: `27px`,
        padding: `0 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
      }}
    />
  )
}

function compare(a, b) {
  const time1 = a.start_time
  const time2 = b.start_time
  const time1Linux = new Date(time1).getTime()
  const time2Linux = new Date(time2).getTime()

  let comparison = 0;
  if (time1Linux > time2Linux) {
    comparison = 1;
  } else if (time1Linux < time2Linux) {
    comparison = -1;
  }
  return comparison
}
const MapWithASearchBox = withScriptjs(withGoogleMap((props) => {
    
    console.log("Props.directions", props.directions)
    
    return (
      <GoogleMap
        defaultZoom={10}
        center={props.center}
        ref={props.onMapMounted}
      >
        <SearchBox
          ref={props.onSearchBoxMounted}
          defaultZoom={15}
          controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <Input />
        </SearchBox>
        {/* {(props.direcitons ? props.directions.directions.map((item, index) =>
          <DirectionsRenderer key={index} direction={item} />
        ) : console.log('no directions'))} */}
        {/* {(props.directions.directions ?  <DirectionsRenderer directions={props.directions.directions} /> : console.log('no directions'))} */}

        {((props.directions.directions.directions && props.directions.directions.directions.length > 0) && 
          props.directions.directions.directions.map((item) => <DirectionsRenderer directions={item}/>)
        )}
        <Button saveLocation={() => props.saveLocation()} />
        {(props.markers ? props.markers.map((marker, index) =>
          <Marker key={index} position={marker.position} title={marker.title} />
        ) : console.log('no marker'))}
      </GoogleMap>
    )
  }
))

export default (props) => {
  const [directions, setDirections] = useState({directions: []});
  const [loaded, setLoaded] = useState("false")
  const google = window.google
  const directionsArray = [];
  useEffect(() => {
    setTimeout(function () {
      setLoaded("true")
      if (props.updatedState.bin && props.updatedState.bin.length > 0 && loaded === "true") {
        const directionsService = new google.maps.DirectionsService()
        const updatedBin = props.updatedState.bin
        const sorted = updatedBin.sort(compare)
        console.log('sorted array', sorted)
        for (let i = 0; i < sorted.length - 1; i++) {
          if (sorted[i].latitude === sorted[i+1].latitude && sorted[i].longitude === sorted[i+1].longitude) {
            i++
          } else {
          let travelMethod = sorted[i].travel_method.toUpperCase()
          if (travelMethod === "CAR") {
            travelMethod = "DRIVING"
          }
          if (travelMethod === "DRIVING") {
            travelMethod = google.maps.TravelMode.DRIVING
          } else if (travelMethod === "BICYCLING") {
            travelMethod = google.maps.TravelMode.BICYCLING
          } else if (travelMethod === "WALKING") {
            travelMethod = google.maps.TravelMode.WALKING
          } else if (travelMethod === "TRANSIT") {
            travelMethod = google.maps.TravelMode.TRANSIT
          }
          console.log('travel method', travelMethod)
          directionsService.route({
            origin: { lat: sorted[i].latitude, lng: sorted[i].longitude },
            destination: { lat: sorted[i+1].latitude, lng: sorted[i+1].longitude },
            travelMode: travelMethod,
            avoidFerries: true,
            provideRouteAlternatives: false
          },
            (result, status) => {
              console.log('response', { result }, status)
              if (status === google.maps.DirectionsStatus.OK) {
                directions.directions.push(result)
                setDirections(state => ({ ...state, directions: directions }))
                console.log({ directionsArray })
              } else {
                console.error(`error fetching directions ${result} ${status}`)
              }
            })
        }
      }
    }
    }, 3000)
  }, [props.updatedState, loaded])

  return (<>
    <MapWithASearchBox
      saveLocation={props.saveLocation}
      lat={41.9}
      lng={-87.624}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      onPlacesChanged={props.onPlacesChanged}
      center={props.center}
      markers={props.markers}
      onSearchBoxMounted={props.onSearchBoxMounted}
      onMapMounted={props.onMapMounted}
      directions={directions}
      // directionsArray={directionsArray}
    />
  </>)
}
