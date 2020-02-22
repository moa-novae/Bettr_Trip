import React from 'react';
import './Signup.css';
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




export default function() {
  const classes = useStyles();


  return (
    <div>
      <h1>Sign Up Page</h1>
      <Container maxWidth="sm">
        
        <form className="signup-form" noValidate autoComplete="off">
          <div class="input-field">
            <TextField required id="standard-required" label="Email" />
          </div>
          <div class="input-field">
            <TextField
              id="standard-password-input"
              label="Password *"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <div class="input-field">
            <TextField
              id="standard-password-input"
              label="Confirm Password *"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <div>
            <BootstrapButton
              variant="contained"
              color="primary"
              disableRipple
              className={classes.margin}
            >
            Submit
            </BootstrapButton>
          </div>
        </form>
      </Container>
    </div>
  );
}