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
import MomentAdapter from '@date-io/moment'
import { Button } from 'react-bootstrap'
import { useSpring, animated } from 'react-spring'
const Moment = new MomentAdapter();
const { moment, humanize } = Moment

const refs = {}; //google map element 
const onSearchBoxMounted = (ref) => {
  refs.searchBox = ref;
}
const onMapMounted = (ref) => {
  refs.map = ref;
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

export default function Content(props) {
  const [tripTime, setTripTime] = useState();
  const [recommendToggle, setRecommendToggle] = useState(false)
  const [suggestMarkerState, setSuggestMarkerState] = useState({});
  const [savedState, setSavedState] = useState({})
  const [suggested, setSuggested] = useState(false);
  const [state, setState] = useState({
    bounds: null,
    center: { lat: 34.455523, lng: 3.857350 }, //center - using set time out to set center causes it to have an error - but doesnt affect functionality- for now will pass default center to state also but will have to change if want to pass center from landing page
    markers: [],
    location: {},
    bin: [],
    markerLibrary: [],
    weekViews: [],
    daysFiltered: []
  })

  const [updatedState, setUpdatedState] = useState({})
  const [view, setView] = useState('day')

  let { id } = useParams();

  console.log('updated state', updatedState)

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
        }));
        setSuggested(false);
        // setUpdatedState(state => ({ ...state, bin: [...state.bin, binObject] }))
        setSavedState(state => ({saved: binObject}))
      })
  }

  
  //manages logic when place is searched 
  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces(); //gets place of thing searched
    console.log(places[0], "This is places from onPlacesChanged");
    const bounds = new window.google.maps.LatLngBounds(); //gets boundaries for that place
    if (places[0].geometry) {

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
        bounds: bounds,
        center: nextCenter,
        markers: [...state.markers, nextMarkers],
        location: {
          name: {
            placeName: places[0].name, 
            region: (places[0].address_components[2] ? places[0].address_components[2].long_name : null)
          },
          coordinates: {
            lat: places[0].geometry.location.lat(), 
            lng: places[0].geometry.location.lng()
          }
        }
      }))
    }
  }
  // useEffect(() => {
  
  // },[updatedState])


  // manages logic when place is searched and bound is changed
  const onBoundsChanged = () => {
    setState(state => ({
      ...state, 
      bounds: refs.map.getBounds(),
      center: refs.map.getCenter()
    }))
  }

  //loads data and sets state when page rendered
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/api/trips/${id}/points/`)
        const tripResponse = await axios.get(`http://localhost:3001/api/trips/${id}`)
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
        // setUpdatedState(state => ({ ...state, bin: [...state.bin, ...binArray] }))
        const tripStart = new Date(tripResponse.data.trip.start_date).getTime() /1000 + 86400
        const tripEnd = new Date(tripResponse.data.trip.end_date).getTime() / 1000 + 86400
        setTripTime({start: tripStart, end: tripEnd})
        console.log('trip data', tripStart, tripEnd)
        const daysInTrip = (tripEnd - tripStart) / (3600 * 24)
        const binFilter = binArray.filter(item => item.start_time !== null)
        if (binArray[0]) { //if theres a point in the database - set that center 
          setState(state => ({
            ...state,
            bin: [...binArray],
            markerLibrary: [...markerArray], //sets new markers data into marker library to later be turned into markers 
            center: { lat: binArray[0].latitude, lng: binArray[0].longitude },
            daysFiltered: [...binFilter]
          }))
        } else {
          setState(state => ({
            ...state,
            bin: [...binArray],
            markerLibrary: [...markerArray], //sets new markers data into marker library to later be turned into markers 
            daysFiltered: [...binFilter]
          }))
        }
        // }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [view])

  useEffect(() => {
    async function fetchData() {
      try {
        const tripResponse = await axios.get(`http://localhost:3001/api/trips/${id}`)
        const week = [];
        const tripStart = new Date(tripResponse.data.trip.start_date).getTime() / 1000
        const tripEnd = new Date(tripResponse.data.trip.end_date).getTime() / 1000
        const daysInTrip = (tripEnd - tripStart) / (3600 * 24)
        const sorted = updatedState.bin.sort(compare);
        console.log('SORTED!!!!!', sorted)
        for (let i = 0; i <= daysInTrip; i++) {
          let newDate = moment(tripResponse.data.trip.start_date, "YYYY-MM-DD").add(i, "days")
          let formatedDate = newDate.format("dddd, MMMM Do YYYY") 
          week.push(<WeekItem key={i} formatedDate={formatedDate} date={newDate} weatherState={updatedState} pointData={sorted} setView={setView} />)
        }
        setState(state => ({
          ...state,
          weekViews: week,
          markerLibrary: updatedState.bin
        }))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [updatedState])

  useEffect(() => {
    setTimeout(function () {
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
    }, 2000)

  }, [state.markerLibrary])

  const addPointToMap = (locationObj) => {

    const suggestMarker = new window.google.maps.Marker({
      position: locationObj,
    });
    setSuggested(true);
    setSuggestMarkerState(suggestMarker);
  };

  const springProp = useSpring(({ left: recommendToggle ? '0vh' : '-84vh' }))
  return (
    <div className="content">

      <div className="calendar-container">
        <Calendar tripTime={tripTime} daysArr={state.bin} view={view} setView={setView} weatherState={updatedState} weekViews={state.weekViews} setUpdatedState={setUpdatedState} tripData={props.appState.trip} />
      </div>
      <div className="map-container">
        <MapWithASearchBox
          onBoundsChanged={onBoundsChanged}
          bounds={state.bounds}
          saveLocation={saveLocation}
          onPlacesChanged={onPlacesChanged}
          center={state.center}
          markers={state.markers}
          suggestMarker={suggestMarkerState}
          suggestedState={suggested}
          onSearchBoxMounted={onSearchBoxMounted}
          onMapMounted={onMapMounted}
          updatedState={(updatedState.bin ? updatedState : "not rendered yet")}
        />
      </div>
      <animated.div className="recommend" style={springProp}>


        <Button className='expand-recommend' variant="Info" onClick={() => setRecommendToggle(prev => !prev)}>Recommend </Button>
        <Recommend currentState={state} addPointToMap={addPointToMap} />

      </animated.div>

    </div>
  );
}



