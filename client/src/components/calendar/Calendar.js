import React, { useState } from 'react';
import WeekItem from '../weekItem'
import DayItem from '../dayItem-legacy'
import ReactDnd from '../dayView'
import { makeStyles } from '@material-ui/core/styles';
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
