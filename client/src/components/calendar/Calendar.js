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

export default function ControlledExpansionPanels(props) {
  const [view, setView] = useState('week') //view determins to show either week or day
  let { id } = useParams();
  let daysArr = [];
  const [weekViews, setWeeks] = useState([]);
  const [dayState, setDay] = useState([]);
  useEffect(() => {
    Promise.all([
    axios.get(`http://localhost:3001/api/trips/${id}/points`)
    ]).then(all => {
      const tripData = all[0].data;
      // setPoints(tripData.points);
      daysArr = tripData.points;
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
              // console.log(pointDataArr, "<--- pointDataArr!!!!");
              week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
              pointDataArr = [];
              pointDataArr.push(daysArr[i]);
              week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
            } else {
              // console.log(pointDataArr, "<--- pointDataArr!!!!");
              pointDataArr.push(daysArr[i]);
              week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
            }
          } else {
            if (daysArr[i].start_time.slice(8, 10) !== daysArr[i - 1].start_time.slice(8, 10)) {
              // console.log(pointDataArr, "<--- pointDataArr!!!!");
              week.push(<WeekItem pointData={pointDataArr} setView={setView} />);
              pointDataArr = [];
              pointDataArr.push(daysArr[i]);
            } else {
              pointDataArr.push(daysArr[i]);
            }
          }
        }
      }
    // console.log(week, "this is week")
    setWeeks(week);
    
    });
  }, []);

  
  const classes = useStyles()
  // console.log(daysArr, "<--- dayArr"); // should be nothing b/c axios has not resolved yet!
  // const week = daysArr.map(e => <WeekItem day={e} setView={setView}/>) //creates a bunch of day overview 
  // console.log('bin cal', props.bin)
  return (
    <div className={classes.root}>
      {props.view === 'week' && props.weekViews}
      <MuiPickersUtilsProvider utils={MomentUtils}>
      {props.view === 'day' && <ReactDnd daysArr={props.daysArr} bin={props.bin} deletePoint={props.deletePoint}/>}
      </MuiPickersUtilsProvider>
      
    </div>
  );
}