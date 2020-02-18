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
          <MapWithASearchBox
            lat={41.9}
            lng={-87.624}
            googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
      
      </div>
    );
  }
}

export default Content;

