import React, { Component } from 'react';
import './Content.css';
import MapWithASearchBox from '../map'
import Calendar from '../calendar'

class Content extends Component {
  render() {
    return (
      <div className="map-container">
        {/* <MapWithASearchBox /> */}
        <Calendar />
      </div>

    );
  }
}

export default Content;

