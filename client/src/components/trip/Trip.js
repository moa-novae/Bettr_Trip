import React, { useState } from 'react'
import './Trip.css';
import DatePicker from '../datepicker/DatePicker';
import axios from 'axios'
import { useHistory } from "react-router-dom";

export default function(props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState({});
  let history = useHistory();



  const validate = () => {
    if (name === "") {
      setError("Trip name cannot be blank");
      return;
    }
    setError("");
    console.log(props.appState.user.id, "USER_IDDDDDD");
    const trip = {
      name: name, 
      start_date: date.value.start._i, 
      end_date: date.value.end._i, 
      user_id: props.appState.user.id
    };

    axios
      .post('http://localhost:3001/api/trips', trip)
      .then(response => {
        console.log(response, "<---look at me!");
        console.log(response.data.trip_id, "<---look at me again!");
        let tripID = response.data.trip_id;
        history.push(`trips/${tripID}`);
      });
  };

  return (
    <section className="trip-form-container">
      <h3>Start your trip here!</h3>
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="trip-form-trip-name"
          name="name"
          type="text"
          placeholder="Give your trip a name"
          onChange={event => setName(event.target.value)}
          value={name}
        />
        <section className="trip_form_validation">{error}</section>
        <DatePicker onSelect={setDate}/>
      </form>
      <button confirm onClick={() => validate()}>Save</button>
    </section>
  );
}