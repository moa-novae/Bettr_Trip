import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import WeekItemTask from '../weekItemTask';
import TravelTime from '../traveltime';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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

//creates array of dummy task
// function createTask (arr) {
//   let output = [];
//   for (let i = 0; i < num; i++) {
//     output.push(`Place ${i + 1}`)
//   }
//   return output
// }

export default function weekItem(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const formatTime = timeString => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const days = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
    const time = new Date(timeString);
    const dayIndex = time.getDay();
    const dayName = days[dayIndex];
    const monthIndex = time.getMonth();
    const monthName = months[monthIndex];
    const date = time.getDate();
    return `${dayName} ${monthName} ${date}`;
  }

  const addTravelTime = pointData => {
    let listArr = [];
    for (let i = 0; i < pointData.length; i++) {
      if (i === pointData.length - 1) {
        listArr.push(<WeekItemTask pointData={pointData[i]} setView={props.setView}/>)
      } else {
        listArr.push(<WeekItemTask pointData={pointData[i]} setView={props.setView}/>);
        listArr.push(<TravelTime pointData={[ pointData[i], pointData[i + 1] ]}/>);
      }
    }
    return listArr;
  };

  return (
    //this is mostly material UI copy pasta
    <React.Fragment>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{formatTime(props.pointData[0].start_time)}</Typography>
          <Typography className={classes.secondaryHeading}>I show general info</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div className={classes.demo}>
            <List>
              {addTravelTime(props.pointData)}
              {props.pointData.map(p => <WeekItemTask pointData={p} setView={props.setView}/>)}                        
            </List>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  )
}




