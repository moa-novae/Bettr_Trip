import React, { useState, useEffect, Component } from 'react';
import './Content.css';
import MapWithASearchBox from '../map'
import Calendar from '../calendar'
import Recommend from '../recommend'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';
import Alert from '../alert'
import WeekItem from '../weekItem'

const refs = {}; //google map element 
const onSearchBoxMounted = (ref) => {
  refs.searchBox = ref;
}
const onMapMounted = (ref) => {
  refs.map = ref;
}

export default function Content() {
  const [state, setState] = useState({
    bounds: null,
    center: { lat: -34.397, lng: 150.644 }, //center - using set time out to set center causes it to have an error - but doesnt affect functionality- for now will pass default center to state also but will have to change if want to pass center from landing page 
    markers: [],
    location: {},
    bin: [],
    markerLibrary: [],
    weekViews: []
  })

  const [updatedState, setUpdatedState] = useState({})
  const [view, setView] = useState('day')

  let { id } = useParams();

  //function called when save button clicked
  const saveLocation = () => {
    const location = state.location
    const markerPosition = { lat: location.coordinates.lat, lng: location.coordinates.lng }
    const marker = new window.google.maps.Marker({ //creates new marker using google api 
      position: markerPosition,
      title: location.name.placeName
    })
    axios.post(`http://localhost:3001/api/trips/${id}/points`, {
      name: location.name.placeName,
      trip_id: id,
      region: (location.name.region ? location.name.region : null),
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng
    })
      .then(response => {
        console.log(response.data)
        const data = response.data
        const binObject = {
          name: location.name.placeName,
          id: parseFloat(data.point.id),
          region: (location.name.region ? location.name.region : null),
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
          start_time: data.point.start_time,
          end_time: data.point.end_time,
          created_at: data.point.created_at,
          updated_at: data.point.updated_at,
          trip_id: parseFloat(data.point.trip_id),
          activity: data.point.activity,
          travel_method: data.point.travel_method,
          travel_duration: data.point.travel_duration
        }
        setState(state => ({
          ...state,
          markers: [...state.markers, marker],
          bin: [...state.bin, binObject]
        }))
      })
  }

  const deletePoint = function(pointId, lat, lng) {
    //axios delete with lat and long to find point in database 
    //then filter bin and markers to find those objects and remove them from state
    axios.delete(`http://localhost:3001/api/trips/${id}/points/${pointId}`)
      .then(() => {
        const binArray = state.bin.filter(item => item.id !== pointId)
        const markerArray = state.markerLibrary.filter(item => (item.position.latitude !== lat && item.position.longitude !== lng))
        setState(state => ({
          ...state,
          markers: markerArray,
          bin: binArray
        }))
      })
  }

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
  }

  //loads data and sets state when page rendered
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
            id: parseFloat(point.id),
            region: (point.region ? point.region : null),
            latitude: parseFloat(point.latitude),
            longitude: parseFloat(point.longitude),
            start_time: point.start_time,
            end_time: point.end_time,
            created_at: point.created_at,
            updated_at: point.updated_at,
            trip_id: parseFloat(point.trip_id),
            activity: point.activity,
            travel_method: point.travel_method,
            travel_duration: point.travel_duration
          }
          binArray.push(binObject);
        }
        // setState(state => ({
        //   ...state,
        //   bounds: null,
        //   center: { lat: -34.397, lng: 150.644 }, //set center from parent by passing props into this default function
        //   markers: [...state.markers],
        //   location: {},
        //   bin: [...binArray],
        //   markerLibrary: [...markerArray] //sets new markers data into marker library to later be turned into markers 
        // }))
        let week = [];
        if (!binArray || binArray.length === 0) {
          week.push(<Alert />);
        } else {
          const binFilter = binArray.filter(item => item.start_time !== null)
          // for acculuating points data
          let pointDataArr = [];
          for (let i = 0; i < binFilter.length; i++) {
            if (i === 0) {
              pointDataArr.push(binFilter[i])
            } else if (i === binFilter.length - 1) {
              if (binFilter[i].start_time.slice(8, 10) !== binFilter[i - 1].start_time.slice(8, 10)) {
                // console.log(pointDataArr, "<--- pointDataArr!!!!");
                week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
                pointDataArr = [];
                pointDataArr.push(binFilter[i]);
                week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
              } else {
                // console.log(pointDataArr, "<--- pointDataArr!!!!");
                pointDataArr.push(binFilter[i]);
                week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
              }
            } else {
              if (binFilter[i].start_time.slice(8, 10) !== binFilter[i - 1].start_time.slice(8, 10)) {
                // console.log(pointDataArr, "<--- pointDataArr!!!!");
                week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
                pointDataArr = [];
                pointDataArr.push(binFilter[i]);
              } else {
                pointDataArr.push(binFilter[i]);
              }
            }
          }
        }
        //console.log('marker lib', markerArray)
        // setWeeks(week);
        setState(state => ({
          ...state,
          bounds: null,
          center: { lat: -34.397, lng: 150.644 }, //set center from parent by passing props into this default function
          location: {},
          bin: [...binArray],
          markerLibrary: [...markerArray], //sets new markers data into marker library to later be turned into markers 
          weekViews: week
        }))

      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    setTimeout(function() {
      const markerArray = [];
      if (state.markerLibrary) {
        if (window.google) {
          for (let marker of state.markerLibrary) {
            const newMarker = new window.google.maps.Marker({
              position: marker.position,
              title: marker.title
            });
            markerArray.push(newMarker)
          }
        }
        setState(state => ({ ...state, markers: [...state.markers, ...markerArray] }))
      }
    }, 100)

  }, [state.markerLibrary])

  return (
    <div className="content">

      <div className="calendar-container">
        <Calendar daysArr={state.bin} view={view} setView={setView} weekViews={state.weekViews} setUpdatedState={setUpdatedState}/>
      </div>
      <div className="map-container">
        <MapWithASearchBox
          saveLocation={saveLocation}
          onPlacesChanged={onPlacesChanged}
          center={state.center}
          markers={state.markers}
          onSearchBoxMounted={onSearchBoxMounted}
          onMapMounted={onMapMounted}
        />
      </div>
      <div className="recommend">
        <Recommend />
      </div>

    </div>
  );
}



