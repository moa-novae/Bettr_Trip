import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import './Weather.css';

const setIcon = function (icon) {
  let object = {
    icon: icon,
    size: 20,
    animate: true
  }
  return object
}



export default function Weather(props) {
  if (props.data.icon) {
    let iconName = props.data.icon.toUpperCase()
    let replacedName = iconName.replace(/-/g, "_")
    const iconObject = setIcon(replacedName)

    return (
      <div>
        <ReactAnimatedWeather
        className={"weather-icon"}
        icon={iconObject.icon}
        size={iconObject.size}
        animate={iconObject.animate} 
        /> 
        High: {props.data.high}°F 
    Low: {props.data.low}°F
  </div>
    )
  } else {
    return (
      <div className={"historical-data-view"}>
        High: {props.data.high}°F
        Low: {props.data.low}°F
      </div>
    )
  }
}