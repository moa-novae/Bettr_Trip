import React, {useState} from 'react'
import './Trip.css';
import DatePicker from '../datepicker/DatePicker';

export default function() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (name === "") {
      setError("Trip name cannot be blank");
      return;
    }
    setError("");
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
        <DatePicker />
      </form>
      <button confirm onClick={() => validate()}>Save</button>
    </section>
  );
}