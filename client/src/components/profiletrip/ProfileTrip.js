import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';



const proxyurl = "https://cors-anywhere.herokuapp.com/";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '10px',
    maxWidth: 500,
    background: "#f1f1f1",
    '&:hover': {
      background  : '#e8f3fa'
    }
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
  const [imgURL, setImgURL] = useState("");
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

      const trip_id = data.id;

      // get first image based
      axios.get(`http://localhost:3001/api/trips/${trip_id}/points`)
      .then(res => {
        if (res.data.points.length === 0) {
          setImgURL(":( \nYou need to add a point! ")
        } else {
        const lat = res.data.points[0].latitude;
        const lng = res.data.points[0].longitude;

        axios.get(`${proxyurl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=tourist_attraction&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(res => {
          if (res.data.status === "ZERO_RESULTS") {
            setImgURL(":( \nNo pictures for this point! ");
          } else {
          const photo_ref = res.data.results[0].photos[0].photo_reference;

          const tripImage = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=128&photoreference=${photo_ref}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

          setImgURL(tripImage);
          }
        });}
      });
      });
  }, []);

  const toTrip = (id) => {
    history.push(`/trips/${id}`);
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item onClick={() => toTrip(singleTrip.id)} >
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt={imgURL}
              src={imgURL}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs={8} alignContent="center" container direction="column" spacing={2}>
            <Grid item xs onClick={() => toTrip(singleTrip.id)}>
              <Typography gutterBottom variant="subtitle1">
                {singleTrip.name}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {singleTrip.start_date}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                |
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {singleTrip.end_date}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} alignContent="center" direction='column' >
            <IconButton
              variant="contained"
              color="primary"
              enableRipple
              className={classes.margin}
              onClick={() => props.onDelete(singleTrip.id, props.index)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};