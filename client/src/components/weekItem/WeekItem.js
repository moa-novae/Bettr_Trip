import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import WeekItemTask from '../weekItemTask';
import TravelTime from '../traveltime';
import axios from 'axios';
import Weather from '../weather';

// import Skycons from 'react-skycons'


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
  console.log('point data week item', props.pointData)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [weather, setWeather] = useState({})

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
        listArr.push(<WeekItemTask pointData={pointData[i]} setView={props.setView} />)
      } else {
        listArr.push(<WeekItemTask pointData={pointData[i]} setView={props.setView} />);
        listArr.push(<TravelTime pointData={[pointData[i], pointData[i + 1]]} />);
      }
    }
    return listArr;
  };

  const coordOfFirst = { latitude: props.pointData[0].latitude, longitude: props.pointData[0].longitude }
  const startTimeOfFirst = props.pointData[0].start_time
  const today = Date.now() / 1000
  const startTimeLinux = new Date(startTimeOfFirst).getTime() / 1000
  
    useEffect(() => {
    async function fetchData() {
      try {
        //if start time is less than 7 days in the future - make forecast request
        //if start time is grater than 7 days - make historical request 
        if (startTimeLinux - today < 604800 && startTimeLinux - today >= 0) { //1 week in seconds is 604800
          const weekWeatherResponse = await axios.post(`http://localhost:3001/weather/new`, {
            latitude: coordOfFirst.latitude.toFixed(3),
            longitude: coordOfFirst.longitude.toFixed(3)
          })
          const weekWeather = JSON.parse(weekWeatherResponse.data.data)
          const weekSelectDays = weekWeather.daily.data.filter(item => item.time > startTimeLinux)
          setWeather(state => ({icon: weekSelectDays[0].icon, high: weekSelectDays[0].temperatureHigh, low: weekSelectDays[0].temperatureLow}))
         } else if (startTimeLinux - today > 604800) {
          const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
            latitude: coordOfFirst.latitude.toFixed(3),
            longitude: coordOfFirst.longitude.toFixed(3),
            time: startTimeLinux
          })
          const historicalWeather = JSON.parse(historicalWeatherResponse.data.data)
          setWeather(state => ({high: historicalWeather.daily.data[0].temperatureHigh, low: historicalWeather.daily.data[0].temperatureLow}))
        } else {
          console.log('date in past')
        }

      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])


  return (
    //this is mostly material UI copy pasta
    <React.Fragment>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
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
              {/* {props.pointData.map(p => <WeekItemTask pointData={p} setView={props.setView}/>)}                         */}
            </List>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {(weather.high ? <Weather data={weather} /> : console.log('weather null'))}
    </React.Fragment>
  )
}




