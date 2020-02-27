import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineLogout } from 'react-icons/ai';



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

}));

export default function IconLabelButtons(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AiOutlineLogout />}
        onClick={props.logout}
      >
        Sign Out
      </Button>
    </div>
  );
}