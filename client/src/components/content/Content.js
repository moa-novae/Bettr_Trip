import React, { Component } from 'react';
import './Content.css';
import MapWithASearchBox from '../map'

class Content extends Component {
  render() {
    return (
      <div className="map-container">
   <MapWithASearchBox />
      </div>

    );
  }
}

export default Content;

