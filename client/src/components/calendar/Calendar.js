import React, { useState, useEffect } from 'react';
import WeekItem from '../weekItem'
import DayItem from '../dayItem-legacy'
import ReactDnd from '../dayView'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";




// useEffect to load points data on change


const useStyles = makeStyles(theme => ({
  root: {
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

//returns an array filled with string 'day n' 
const createDaysArr = function (num) {
  let output = []
  for (let i = 0; i < num; i++) {
    output.push(`Day ${i+1}`)
  }
  return output
}

export default function ControlledExpansionPanels() {
  let { id } = useParams();

  useEffect(() => {
    let url = window.location.href;
    console.log(url, "<--- this is url");
    Promise.all([
    axios.get(`http://localhost:3001/api/trips/${id}/points`)
    ]).then(all => {
      const tripData = all[0].data;
      console.log(tripData, "<--- this is tripData");
    });
  }, []);

  const [view, setView] = useState('week') //view determins to show either week or day
  const classes = useStyles()
  const daysArr = createDaysArr(5)
  const week = daysArr.map(e => <WeekItem day={e} setView={setView}/>) //creates a bunch of day overview 
  const day = <ReactDnd />
  return (
    <div className={classes.root}>
      {view === 'week' && week}
      {view === 'day' && day}
    </div>
  );
}
