import React from 'react';
import Image from 'react-bootstrap/Image';
import picMarker from "../../images/custom_marker.png";
import './CustomMarker.css';



const CustomMarker = (props) => {
    const { color, name, id } = props;
    return (
      <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer'}}
      title={name} >
        <Image src={picMarker} width="37px" />
      </div>
    );
  };

  export default CustomMarker;