import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import CardTravelIcon from '@material-ui/icons/CardTravel';



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
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
        variant="contained"
        color="primary"
        size="medium"
        className={classes.button}
        endIcon={<CardTravelIcon />}
        onClick={redirect}
      >
        <div>Welcome Back!</div>
        <div>James</div>
      </Button>
    </div>
  );
}