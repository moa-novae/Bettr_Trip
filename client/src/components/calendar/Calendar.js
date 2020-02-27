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

export default function(props) {
  const [switchValue, setSwitchValue] = useState(null);

  useEffect(() => {
    if (props.view === 'week') {
      setSwitchValue(false);
    } else {
      setSwitchValue(true);
    }
  }, []);

  useEffect(() => {
    if (switchValue) {
      props.setView('day');
    } else {
      props.setView('week');
    }

  }, [switchValue]);

  // console.log('props.daysArr',props.daysArr)

  const classes = useStyles()

  // const week = daysArr.map(e => <WeekItem day={e} setView={setView}/>) //creates a bunch of day overview

  return (
    <div className={classes.root}>
      <div>
        <Switch isOn={switchValue} handleToggle={() => setSwitchValue(!switchValue)} />
      </div>
      <div style={{ marginTop: props.view === 'week' ? '3.2em' : '0em' }}>

        {props.view === 'week' && props.weekViews}
      </div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {props.view === 'day' && <ReactDnd tripTime={props.tripTime} daysArr={props.daysArr} setUpdatedState={props.setUpdatedState} />}
      </MuiPickersUtilsProvider>
    </div>
  );
}