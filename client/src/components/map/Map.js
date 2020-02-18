// //can compare this compose with original google map render that doenst use compose
// //can switch from compose - potentially give you more control over state/API calls

// //otherwise: see if can set state within component did mount 


// //for the buttons: what if i have a component within maps that passes down the data grabbed from the api and renders a form for each

import React, { useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import _ from 'lodash';
import axios from 'axios';


const refs = {}; //google map element 
const onSearchBoxMounted = (ref) => {
  refs.searchBox = ref;
}
const onMapMounted = (ref) => {
  refs.map = ref;
}

const Button = (props) => {
  return (
    <button
      className={"saveButton"}
      onClick={() => { console.log('button clicked'); props.saveLocation() }}
    >Save
    </button>
  )
}
const MapWithASearchBox = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    center={props.center}
    ref={onMapMounted}
  >
    <SearchBox
      ref={onSearchBoxMounted}
      defaultZoom={15}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
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
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    <Button saveLocation={() => props.saveLocation()} />
  </GoogleMap>
))

export default () => {
  // const [location, setLocation] = useState({});
  const [state, setState] = useState({
    bounds: null,
    center: { lat: -34.397, lng: 150.644 },
    markers: [],
    location: {},
    bin: {}
  })

  const saveLocation = () => {
    const location = state.location
    console.log('save button clicked')
    const url = window.location.href
    axios.post(`trips/${url}`, {
      name: location.name.placeName,
      region: location.name.region,
      lat: location.coordinates.lat,
      lng: location.coordinates.lng
    })
      .then(() => {
        setState({
          bin: {
            name: location.name.placeName,
            region: location.name.region,
            lat: location.coordinates.lat,
            lng: location.coordinates.lng
          }
        })
      })
  }

  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces(); //gets place of thing searched 
    const bounds = new window.google.maps.LatLngBounds(); //gets boundaries for that place

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    })

    if (places.length === 0) {
      return;
    }

    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
    }));

    const nextCenter = _.get(nextMarkers, '0.position', state.center);
    console.log({ state, nextCenter, nextMarkers })
    console.log({ bounds })
    console.log(places)
    setState({
      center: nextCenter,
      markers: nextMarkers,
      location: {
        name: { placeName: places[0].address_components[0].long_name, region: (places[0].address_components[2]? places[0].address_components[2].long_name : null) },
        coordinates: { lat: bounds.Ya.i, lng: bounds.Ta.g }
      }
    })
  }

  return (<div>
    <MapWithASearchBox
      saveLocation={saveLocation}
      lat={41.9}
      lng={-87.624}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      onPlacesChanged={onPlacesChanged}
      center={state.center}
    />
  </div>)
}
