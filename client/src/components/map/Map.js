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
        // textOverflow: `ellipses`,
      }}
    />
  )
}
const MapWithASearchBox = withScriptjs(withGoogleMap((props) =>
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
    <Button saveLocation={() => props.saveLocation()} />
    {(props.markers ? props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} title={marker.title} />
    ) : console.log('no marker'))}
  </GoogleMap>
))

export default (props) => {

  return (<div>
    <MapWithASearchBox
      saveLocation={props.saveLocation}
      lat={41.9}
      lng={-87.624}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      onPlacesChanged={props.onPlacesChanged}
      center={props.center}
      markers={props.markers}
      onSearchBoxMounted={props.onSearchBoxMounted}
      onMapMounted={props.onMapMounted}
    />
  </div>)
}
