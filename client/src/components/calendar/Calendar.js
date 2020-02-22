import React, { useState, useEffect } from 'react';
import WeekItem from '../weekItem'
import ReactDnd from '../dayView'
import Alert from '../alert'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers'; //for time picking material ui

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
  const classes = useStyles()
  // const week = daysArr.map(e => <WeekItem day={e} setView={setView}/>) //creates a bunch of day overview 
  
  return (
    <div className={classes.root}>
      {props.view === 'week' && props.weekViews}
      <MuiPickersUtilsProvider utils={MomentUtils}>
      {props.view === 'day' && <ReactDnd daysArr={props.daysArr}/>}
      </MuiPickersUtilsProvider>
    </div>
  );
}













    // daysArr.forEach(point => {
    //   if (!dayAccumulator[`${point.start_time.getMonth() + 1}/${point.start_time.getDate()}`]) {
    //     dayAccumulator[`${point.start_time.getMonth() + 1}/${point.start_time.getDate()}`] = [point];
    //   } else {
    //     dayAccumulator[`${point.start_time.getMonth() + 1}/${point.start_time.getDate()}`].push(point);
    //   }