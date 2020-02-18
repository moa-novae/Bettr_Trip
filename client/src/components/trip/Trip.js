import React, {useReducer, useState} from 'react'
// import {DateRangeInput} from '@datepicker-react/styled'
import './Trip.css';

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return {...state, focusedInput: action.payload}
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
};

export default function() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
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
        {/* <DateRangeInput
          onDatesChange={data =>
            dispatch({ type: "dateChange", payload: data })
          }
          onFocusChange={focusedInput =>
            dispatch({ type: "focusChange", payload: focusedInput })
          }
          startDate={state.startDate} // Date or null
          endDate={state.endDate} // Date or null
          focusedInput={state.focusedInput} // START_DATE, END_DATE or null
        /> */}
      </form>
      <button confirm onClick={() => validate()}>Save</button>
    </section>
  );
}