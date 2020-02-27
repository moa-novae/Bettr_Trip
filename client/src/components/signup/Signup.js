import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
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
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPS, setConfirmPS] = useState("");
  const [name, setName] = useState("");

  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);

  const [errorText1, setErrorText1] = useState("");
  const [errorText2, setErrorText2] = useState("");
  const [errorText3, setErrorText3] = useState("");
  const [errorText5, setErrorText5] = useState("");

  const helperText1 = "email cannot be blank";
  const helperText2 = "password cannot be blank";
  const helperText3 = "confirm password has to match";
  const helperText4 = "email has to include \"@\"";
  const helperText5 = "name cannot be blank";



  const validate = () => {
    if (name === "") {
      setError4(true);
      setErrorText5(helperText5);
      return;
    }
    if (email === "") {
      setError1(true);
      setErrorText1(helperText1);
      return;
    }
    if (!email.includes('@')) {
      setError1(true);
      setErrorText1(helperText4);
      return;
    }
    if (password === "") {
      setError2(true);
      setErrorText2(helperText2);
      return;
    }
    if (password !== confirmPS) {
      setError3(true);
      setErrorText3(helperText3);
      return;
    }

    setError1(false);
    setError2(false);
    setError3(false);
    setError4(false);
    setErrorText1("");
    setErrorText2("");
    setErrorText3("");
    setErrorText5("");

    save(email, password, confirmPS, name);
  };

  const save = (email, password, password_confirmation, name) => {
    const user = { email, password, password_confirmation, name };
    axios.post(`http://localhost:3001/users`, { user }, { withCredentials: true })
    .then(res => {
      console.log(res, "<--- res after creating a new user");
      if (res.data.status === 'created') {
        props.handleLogin(res.data.user);
        props.history.push('/');
      }
    }).catch(err => {
      console.log("registration error", err);
    });
  };



  return (
    <div className="background-image" >
      <h1>Sign Up Page</h1>
      <Container maxWidth="sm">
        
        <form className="signup-form" noValidate autoComplete="off" onSubmit={event => event.preventDefault()} >
        <div class="input-field">
            <TextField
              required 
              error={error4}
              id="standard-required"
              label="Name"
              value={name}
              onChange={e => {setName(e.target.value); setError4(false); setErrorText5("");}}
              type="text"
              helperText={errorText5}
            />
          </div>
          <div class="input-field">
            <TextField
              required 
              error={error1}
              id="standard-required"
              label="Email"
              value={email}
              onChange={e => {setEmail(e.target.value); setError1(false); setErrorText1("");}}
              type="email"
              helperText={errorText1}
            />
          </div>
          <div class="input-field">
            <TextField
              required
              error={error2}
              id="standard-password-input"
              label="Password"
              value={password}
              onChange={e => {setPassword(e.target.value); setError2(false); setErrorText2("");}}
              type="password"
              helperText={errorText2}
              autoComplete="current-password"
            />
          </div>
          <div class="input-field">
            <TextField
              required
              error={error3}
              id="standard-password-input"
              label="Confirm Password"
              value={confirmPS}
              onChange={e => {setConfirmPS(e.target.value); setError3(false); setErrorText3("");}}
              type="password"
              helperText={errorText3}
              autoComplete="current-password"
            />
          </div>
          <div>
            <BootstrapButton
              variant="contained"
              color="primary"
              disableRipple
              className={classes.margin}
              onClick={() => validate()}
            >
            Submit
            </BootstrapButton>
          </div>
        </form>
      </Container>
    </div>
  );
}