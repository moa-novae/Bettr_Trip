import React, { useEffect, useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import _ from 'lodash';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import { componentDidMount } from 'react-google-maps/lib/utils/MapChildHelper';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Bin from '../bin'
import './Map.css';




const Input = (props) => {
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
      // value={props.}
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
  return (
    <GoogleMap
      defaultZoom={2}
      center={props.center}
      ref={props.onMapMounted}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
      <Input suggestedState={props.suggestedState} suggestedLocation={props.suggestMarker.position} />
      </SearchBox>
       {((props.directions.directionsArray && props.directions.directionsArray.length > 0) &&
        props.directions.directionsArray.map((item) => <DirectionsRenderer directions={item} />)
      )}
      <div className="saveButton-div" >
        <Button className={"saveButton"} onClick={() => props.saveLocation() }>Save</Button>
      </div>
      {(props.markers ? props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} title={marker.title} />
      ) : console.log('no marker'))}

      {props.suggestedState? (<Marker position={props.suggestMarker.position} />) : console.log('no suggested marker')}

    </GoogleMap>
  )
}
))

export default (props) => {
  const [directions, setDirections] = useState({ directionsArray: [] });
  const [loaded, setLoaded] = useState("false")
  const google = window.google
  useEffect(() => {
    setTimeout(function () {
      setLoaded("true")
      if (props.updatedState.bin && props.updatedState.bin.length > 0 && loaded === "true") {
          const directionsService = new google.maps.DirectionsService()
          const updatedBin = props.updatedState.bin.filter(item => item.start_time !== null)
          const sorted = updatedBin.sort(compare)
          for (let i = 0; i < sorted.length - 1; i++) {
            if (sorted[i].latitude === sorted[i + 1].latitude && sorted[i].longitude === sorted[i + 1].longitude) {
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
              directionsService.route({
                origin: { lat: sorted[i].latitude, lng: sorted[i].longitude },
                destination: { lat: sorted[i + 1].latitude, lng: sorted[i + 1].longitude },
                travelMode: travelMethod,
                avoidFerries: true,
                provideRouteAlternatives: false
              },
                (result, status) => {
                  if (status === google.maps.DirectionsStatus.OK) {
                    directions.directionsArray.push(result)
                    let array = directions.directionsArray
                    setDirections(state => ({ ...state, directions: array }))
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
      suggestMarker={props.suggestMarker}
      suggestedState={props.suggestedState}
    />
  </>)
}










// const MapWithASearchBox = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap
//     defaultZoom={10}
//     center={props.center}
//     ref={props.onMapMounted}
//   >
//     <SearchBox
//       ref={props.onSearchBoxMounted}
//       defaultZoom={15}
//       controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
//       onPlacesChanged={props.onPlacesChanged}
//     >
//       <Input suggestedState={props.suggestedState} suggestedLocation={props.suggestMarker.position} />
//     </SearchBox>
//     <Button saveLocation={() => props.saveLocation()} />

//     {(props.markers ? props.markers.map((marker, index) =>
//       <Marker key={index} position={marker.position} title={marker.title} />
//     ) : console.log('no marker'))}

//     {props.suggestedState? (<Marker position={props.suggestMarker.position} />) : console.log('no suggested marker')}

//   </GoogleMap>
// ));