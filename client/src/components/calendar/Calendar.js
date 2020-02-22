import React, { useState, useEffect } from 'react';
import WeekItem from '../weekItem'
import ReactDnd from '../dayView'
import Alert from '../alert'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers'; //for time picking material ui
import Switch from '../switch';
import MomentUtils from '@date-io/moment';

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

const singleFilter = dayObj => {
  return dayObj.start_time !== null;
}

export default function ControlledExpansionPanels() {
  let { id } = useParams();
  let daysArr = [];
  const [weekViews, setWeeks] = useState([]);
  const [dayState, setDay] = useState([]);
  const [switchValue, setSwitchValue] = useState(false);

  useEffect(() => {
    Promise.all([
    axios.get(`http://localhost:3001/api/trips/${id}/points`)
    ]).then(all => {
      const tripData = all[0].data;
      // setPoints(tripData.points);
      daysArr = tripData.points.filter(singleFilter);
      console.log(daysArr, "This is just daysArr!!!");
      setDay([...daysArr])
    }).then(() => {
      let week = [];
      if (daysArr.length === 0) {
        week.push(<Alert />);
      } else {
        // for acculuating points data
        let pointDataArr = [];

        for (let i = 0; i < daysArr.length; i++) {
          if (i === 0) {
            pointDataArr.push(daysArr[i])
          } else if (i === daysArr.length - 1) {
            if (daysArr[i].start_time.slice(8, 10) !== daysArr[i - 1].start_time.slice(8, 10)) {
              console.log(pointDataArr, "<--- pointDataArr!!!!");
              week.push(<WeekItem pointData={pointDataArr} setView={setSwitchValue} />);
              pointDataArr = [];
              pointDataArr.push(daysArr[i]);
              week.push(<WeekItem pointData={pointDataArr} setView={setSwitchValue} />);
            } else {
              console.log(pointDataArr, "<--- pointDataArr!!!!");
              pointDataArr.push(daysArr[i]);
              week.push(<WeekItem pointData={pointDataArr} setView={setSwitchValue} />);
            }
          } else {
            if (daysArr[i].start_time.slice(8, 10) !== daysArr[i - 1].start_time.slice(8, 10)) {
              console.log(pointDataArr, "<--- pointDataArr!!!!");
              week.push(<WeekItem pointData={pointDataArr} setView={setSwitchValue} />);
              pointDataArr = [];
              pointDataArr.push(daysArr[i]);
            } else {
              pointDataArr.push(daysArr[i]);
            }
          }
        }
      }
    console.log(week, "this is week")
    setWeeks(week);
    });
  }, []);

  
  const classes = useStyles();

  console.log(daysArr, "<--- dayArr"); // should be nothing b/c axios has not resolved yet!
  // const week = daysArr.map(e => <WeekItem day={e} setView={setView}/>) //creates a bunch of day overview 
  
  return (
    <div className={classes.root}>
      <div>
        <Switch isOn={switchValue} handleToggle={() => setSwitchValue(!switchValue)} />
      </div>
      {switchValue === false && weekViews}
      <MuiPickersUtilsProvider utils={MomentUtils}>
      {switchValue === true && <ReactDnd daysArr={dayState}/>}
      </MuiPickersUtilsProvider>
    </div>
  );
}