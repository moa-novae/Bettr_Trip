import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { AiOutlineLogin } from 'react-icons/ai';



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const classes = useStyles();
  let history = useHistory();

  const redirect = () => {
    history.push('/login');
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AiOutlineLogin />}
        onClick={redirect}
      >
        Sign In
      </Button>
    </div>
  );
}