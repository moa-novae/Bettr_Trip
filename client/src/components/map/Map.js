// //can compare this compose with original google map render that doenst use compose
// //can switch from compose - potentially give you more control over state/API calls

// //otherwise: see if can set state within component did mount 


// //for the buttons: what if i have a component within maps that passes down the data grabbed from the api and renders a form for each

import React, { useEffect, useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import _ from 'lodash';
import axios from 'axios';
import { componentDidMount } from 'react-google-maps/lib/utils/MapChildHelper';



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
const Bin = (props) => {
  return (
    <div
      className={"Bin"}
    >Bin
    </div>
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
        textOverflow: `ellipses`,
      }}
    />
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
      <Input />
    </SearchBox>
    <Button saveLocation={() => props.saveLocation()} />
    <Bin />
    {(props.markers ? props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} title={marker.title} />
    ) : console.log('no marker'))}
  </GoogleMap>
))

export default () => {
  const [state, setState] = useState({
    bounds: null,
    center: { lat: -34.397, lng: 150.644 },
    markers: [],
    location: {},
    bin: [],
    markerLibrary: []
  })

  const saveLocation = () => {
    const location = state.location
    const markerPosition = { lat: location.coordinates.lat, lng: location.coordinates.lng }
    const marker = new window.google.maps.Marker({
      position: markerPosition,
      title: location.name.placeName
    })
    const binObject = {
      name: location.name.placeName,
      region: (location.name.region ? location.name.region : null),
      lat: location.coordinates.lat,
      lng: location.coordinates.lng
    }
    setState({
      markers: [...state.markers, marker],
      bin: [...state.bin, binObject]
    })
    axios.post("http://localhost:3001/points/create", {
      name: location.name.placeName,
      // region: (location.name.region ? location.name.region : null),
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng
    })
      .then(response => {
        console.log(response)
      })
  }

  // const deleteMarker = () => {

  // }

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
    setState({
      center: nextCenter,
      markers: [...state.markers, nextMarkers],
      location: {
        name: { placeName: places[0].address_components[0].long_name, region: (places[0].address_components[2] ? places[0].address_components[2].long_name : null) },
        coordinates: { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() }
      }
    })
    console.log({ state })
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/points/index')
        const markerArray = [];
        const binArray = [];
        for (let point of response.data.points) {
          //add marker to database
          let markerPosition = { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) }
          let newMarker = { position: markerPosition, title: point.name }
          markerArray.push(newMarker)
          //add bin object to database
          // let binObject = 
        }
        setState({
          bounds: null,
          center: { lat: -34.397, lng: 150.644 },
          markers: [...state.markers],
          location: {},
          bin: [...state.bin,],
          markerLibrary: [...markerArray]
        })

      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])

  setTimeout(function () {
    if (state.markerLibrary) {
      console.log('HERE', state.markerLibrary)
      const markerArray = [];
      for (let marker of state.markerLibrary) {
        const newMarker = new window.google.maps.Marker({
          position: marker.position,
          title: marker.title
          // position: {lat: 22, lng: 22},
        });
        markerArray.push(newMarker)
      }
      setState({ markers: [...state.markers, ...markerArray] })
    }
  }, 1000)


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
      markers={state.markers}
      bin={state.bin}
    />
  </div>)
}
