import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import CardTravelIcon from '@material-ui/icons/CardTravel';
import './UserButton.css';



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  }, 
  icon: {
    color: '#ffebcd',
    width: 40,
    height: 40
  }
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();
  let history = useHistory();

  const redirect = () => {
    history.push('/profile');
  };

  return (
    <div>
      <Button
        variant="text"
        color="primary"
        size="large"
        className={classes.button}
        endIcon={<CardTravelIcon className={classes.icon} style={{ color: 'rbg(255, 235, 205)' }} fontSize='large' />}
        onClick={redirect}
      >
      <div className="button-text">
        <div>Welcome Back! </div>
        <div>{props.userName}</div>
      </div>
      </Button>
    </div>
  );
}