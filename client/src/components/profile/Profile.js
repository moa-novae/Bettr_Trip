import React, { useState, useEffect } from 'react';
import './Profile.css';
import ProfileTrip from '../profiletrip';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/ButtonBase';
import List from '@material-ui/core/List';



export default function(props) {
  const [tripData, setTripData] = useState([]);
  const [ren, setRen] = useState(true);
  let tripCompArr = [];

  const deleteTrip = (id, index) => {
    axios.delete(`http://localhost:3001/api/trips/${id}`)
    .then((res => {
      console.log(res, `<-- trip ${id} should be destroyed`);
      tripCompArr = [];
      let newTripData = tripData;
      newTripData.splice(index, 1);
      setTripData(newTripData);
      setRen(!ren);
    }))
  };

  useEffect(() => {
    const user_id = props.appState.user.id;
    axios.post(`http://localhost:3001/profile`, { user_id }, { withCredentials: true })
    .then(res => {
      const profile_trip = res.data.profile_trip;
      console.log(profile_trip, "sdfsdfsdf");
      for (let i in profile_trip) {
        tripCompArr.push(<ProfileTrip tripUser={profile_trip[i]} onDelete={deleteTrip} index={i} />)
      }
      // tripCompArr = profile_trip.map(tripUser => {
      //   console.log(tripUser, 'tripUser :)');
      //   return (<ProfileTrip tripUser={tripUser} onDelete={deleteTrip} />);
      // });
      setTripData(tripCompArr);
    })
  },[ ren ]);

  return (
    console.log(props) || <div>
      <h1>My Trips</h1>
      <Container maxWidth="sm">
        <List>
          {tripData}
        </List>
      </Container>
    </div>
  );
};