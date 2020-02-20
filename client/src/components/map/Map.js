import React, { useEffect, useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
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
// const Bin = (props) => {
//   const binItems = props.bin.map(function(item, index) {
//     <BinItem key={index}
//     name={item.name}
//     region={(item.region? item.region : null)}
//     />

//   })
//   return (
//     <div
//       className={"Bin"}
//     >Bin
//     </div>
//   )
// }
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
    {/* <Bin bin={props.bin}/> */}
    {(props.markers ? props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} title={marker.title} />
    ) : console.log('no marker'))}
  </GoogleMap>
))

export default () => {
  const [state, setState] = useState({
    bounds: null,
    center: {},
    markers: [],
    location: {},
    bin: [],
    markerLibrary: []
  })
  let { id } = useParams();


  const saveLocation = () => {
    const location = state.location
    const markerPosition = { lat: location.coordinates.lat, lng: location.coordinates.lng }
    const marker = new window.google.maps.Marker({ //creates new marker using google api 
      position: markerPosition,
      title: location.name.placeName
    })
    const binObject = {
      name: location.name.placeName,
      region: (location.name.region ? location.name.region : null),
      lat: location.coordinates.lat,
      lng: location.coordinates.lng
    }
    console.log('BIN OBJ', binObject)
    setState(state => ({
      ...state,
      markers: [...state.markers, marker],
      bin: [...state.bin, binObject]
    }))
    axios.post(`http://localhost:3001/api/trips/${id}/points`, {
      name: location.name.placeName,
      trip_id: id,
      region: (location.name.region ? location.name.region : null),
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng
    })
      .then(response => {
        console.log(response)
        console.log('STATE POST', state)
      })
  }

  // const deleteMarker = () => {

  // }
  //manages logic when place is searched 
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
    setState(state => ({
      ...state,
      center: nextCenter,
      markers: [...state.markers, nextMarkers],
      location: {
        name: { placeName: places[0].address_components[0].long_name, region: (places[0].address_components[2] ? places[0].address_components[2].long_name : null) },
        coordinates: { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() }
      }
    }))
    console.log({ state })
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/api/trips/${id}/points/`)
        const markerArray = [];
        const binArray = [];
        for (let point of response.data.points) {
          //add marker to database
          let markerPosition = { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) }
          let newMarker = { position: markerPosition, title: point.name }
          markerArray.push(newMarker)
          //add bin object to database
          const binObject = {
            name: point.name,
            region: (point.region ? point.region : null),
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude)
          }
          binArray.push(binObject);
        }
        setState(state => ({
          ...state,
          bounds: null,
          center: { lat: -34.397, lng: 150.644 }, //set center from parent by passing props into this default function
          markers: [...state.markers],
          location: {},
          bin: [...binArray],
          markerLibrary: [...markerArray]
        }))

      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    setTimeout(function () {
      if (state.markerLibrary) {
        console.log('HERE', state.markerLibrary)
        const markerArray = [];
        for (let marker of state.markerLibrary) {
          const newMarker = new window.google.maps.Marker({
            position: marker.position,
            title: marker.title
          });
          markerArray.push(newMarker)
        }
        setState(state => ({ ...state, markers: [...state.markers, ...markerArray] }))
      }
    }, 1000)
  }, [state.markerLibrary])


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
