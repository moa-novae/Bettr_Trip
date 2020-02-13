import React, { useState } from 'react';
import WeekItem from '../weekItem'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
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

const createDaysArr = function (num) {
  let output = []
  for (let i = 0; i < num; i++) {
    output.push(`Day ${i+1}`)
  }
  return output
}

export default function ControlledExpansionPanels() {
  const [view, setView] = useState('week')
  const classes = useStyles()
  const daysArr = createDaysArr(5)
  const week = daysArr.map(e => <WeekItem day={e} setView={setView}/>)
  return (
    <div className={classes.root}>

      {view === 'week' && week}
    </div>
  );
}
