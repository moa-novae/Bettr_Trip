import React, { Component } from 'react';
import './Content.css';
import MapWithASearchBox from '../map'
import Calendar from '../calendar'

class Content extends Component {
  render() {
    return (
      <div className="content">

        <div className="calendar-container">
          <Calendar />
        </div>
        <div className="map-container">
          <MapWithASearchBox />
        </div>
      
      </div>
    );
  }
}

export default Content;

