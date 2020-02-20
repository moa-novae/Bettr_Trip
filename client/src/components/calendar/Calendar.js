import React, { useState, useEffect } from 'react';
import WeekItem from '../weekItem'
import ReactDnd from '../dayView'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams } from "react-router-dom";

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

export default function ControlledExpansionPanels() {
  const [view, setView] = useState('week') //view determins to show either week or day
  let { id } = useParams();
  let daysArr = [];
  const [weekViews, setWeeks] = useState([]);

  useEffect(() => {
    Promise.all([
    axios.get(`http://localhost:3001/api/trips/${id}/points`)
    ]).then(all => {
      const tripData = all[0].data;
      // setPoints(tripData.points);
      daysArr = tripData.points;
      console.log(daysArr, "This is just daysArr!!!");
    }).then(() => {
    console.log(daysArr[0].start_time + "wowowowowow");

    // for acculuating points data
    let pointDataArr = [];

    let week = [];
    for (let i = 0; i < daysArr.length; i++) {
      if (i === 0) {
        pointDataArr.push(daysArr[i])
      } else if (i === daysArr.length - 1) {
        if (daysArr[i].start_time.slice(8, 10) !== daysArr[i - 1].start_time.slice(8, 10)) {
          console.log(pointDataArr, "<--- pointDataArr!!!!");
          week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
          pointDataArr = [];
          pointDataArr.push(daysArr[i]);
          week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
        } else {
          console.log(pointDataArr, "<--- pointDataArr!!!!");
          pointDataArr.push(daysArr[i]);
          week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
        }
      } else {
        if (daysArr[i].start_time.slice(8, 10) !== daysArr[i - 1].start_time.slice(8, 10)) {
          console.log(pointDataArr, "<--- pointDataArr!!!!");
          week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
          pointDataArr = [];
          pointDataArr.push(daysArr[i]);
        } else {
          pointDataArr.push(daysArr[i]);
        }
      }
    }
    console.log(week, "this is week")
    setWeeks(week);
    });
  }, []);

  
  const classes = useStyles()
  console.log(daysArr, "<--- dayArr"); // should be nothing b/c axios has not resolved yet!
  // const week = daysArr.map(e => <WeekItem day={e} setView={setView}/>) //creates a bunch of day overview 
  const day = <ReactDnd />
  return (
    <div className={classes.root}>
      {view === 'week' && weekViews}
      {view === 'day' && day}
    </div>
  );
}













    // daysArr.forEach(point => {
    //   if (!dayAccumulator[`${point.start_time.getMonth() + 1}/${point.start_time.getDate()}`]) {
    //     dayAccumulator[`${point.start_time.getMonth() + 1}/${point.start_time.getDate()}`] = [point];
    //   } else {
    //     dayAccumulator[`${point.start_time.getMonth() + 1}/${point.start_time.getDate()}`].push(point);
    //   }