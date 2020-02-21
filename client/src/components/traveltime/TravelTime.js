import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
import axios from 'axios';

const proxyurl = "https://cors-anywhere.herokuapp.com/";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


export default function MediaControlCard(props) {
  const WALK = "walking";
  const BIKE = "bicycling";
  const DRIVE = "driving";
  const TRANSIT = "transit";
  const classes = useStyles();
  const theme = useTheme();
  const [travel, setTravel] = useState("");
  const [method, setMethod] = useState(DRIVE);

  console.log(props.pointData, "<--- what is this? TravelTime???");

  // helper fn -----------------------------------------
  const start_coord = `${props.pointData[0].latitude},${props.pointData[0].longitude}`;
  const end_coord = `${props.pointData[1].latitude},${props.pointData[1].longitude}`;
  const traveling_method = `${props.pointData[1].travel_method}`;

  useEffect(() => {
    Promise.all([axios.get(`${proxyurl}https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${start_coord}&destinations=${end_coord}&mode=${method}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)])
    .then(all => {
      const travelData = all[0].data;
      console.log(travelData, "<--- travelData pls work!!!");
      let time = "";
      time = travelData.rows[0].elements[0].duration.text;
      setTravel(time);
    })
  }, [ method ]);


  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {travel}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="driving" onClick={() => setMethod(DRIVE)}>
            <DriveEtaIcon />
          </IconButton>
          <IconButton aria-label="transit" onClick={() => setMethod(TRANSIT)}>
            <DirectionsTransitIcon />
          </IconButton>
          <IconButton aria-label="bicycling" onClick={() => setMethod(BIKE)}>
            <DirectionsBikeIcon />
          </IconButton>
          <IconButton aria-label="walking" onClick={() => setMethod(WALK)}>
            <DirectionsWalkIcon />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
    </Card>
  );
}