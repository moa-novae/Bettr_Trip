import React, { useState } from 'react'
import './Trip.css';
import DatePicker from '../datepicker/DatePicker';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    margin: '10px',
    lineHeight: 1.5,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);


export default function(props) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [date, setDate] = useState({});
  const [errorText, setErrorText] = useState("");
  let history = useHistory();
  const classes = useStyles();

  const helperText = "trip name cannot be blank";



  const validate = () => {
    if (name === "") {
      setError(true);
      setErrorText(helperText);
      return;
    }
    setError(false);
    setErrorText("");

    const trip = {
      name: name, 
      start_date: date.value.start._i, 
      end_date: date.value.end._i, 
      user_id: props.appState.user.id
    };

    axios
      .post('http://localhost:3001/api/trips', trip)
      .then(response => {
        props.handleTrip(response.data);
        let tripID = response.data.trip_id;
        history.push(`trips/${tripID}`);
      });
  };

  return (
    <section className="trip-form-container">
      <Container maxWidth="sm">
        <h1>Start your trip here!</h1>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <div class="input-field">
            <TextField
              required
              error={error}
              id="standard-required"
              label="Trip Name"
              value={name}
              onChange={e => {
                setName(e.target.value);
                setErrorText("");
                setError(false);
              }}
              type="text"
              helperText={errorText}
            />
          </div>
          <DatePicker onSelect={setDate} />
        </form>
        <div>
          <BootstrapButton
            variant="contained"
            color="primary"
            enableRipple
            className={classes.margin}
            onClick={() => validate()}
          >
            Save
          </BootstrapButton>
        </div>
      </Container>
    </section>
  );
}