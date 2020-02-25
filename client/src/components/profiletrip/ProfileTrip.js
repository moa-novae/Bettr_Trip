import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function(props) {
  let history = useHistory();
  const classes = useStyles();
  const [singleTrip, setSingleTrip] = useState({});
  let data = {};

  useEffect(() => {
    const trip_id = props.tripUser.id
    console.log(trip_id, 'trip_id inside profiletrip')
    axios.post(`http://localhost:3001/profile_trip`, { trip_id })
    .then(res => {
      console.log(res, 'resresres');
      console.log(data, "this is data");
      data = res.data.trip_data;
      console.log(data, "this is data now");

      setSingleTrip(data)
      })
  }, []);

  const toTrip = (id) => {
    history.push(`/trips/${id}`);
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs onClick={() => toTrip(singleTrip.id)} >

              <Typography gutterBottom variant="subtitle1">
                {singleTrip.name}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {singleTrip.start_date} ~ {singleTrip.end_date}
              </Typography>
              
            </Grid>
          </Grid>
          <Grid item>
            <button onClick={() => props.onDelete(singleTrip.id, props.index)} >
              <DeleteIcon />
            </button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};