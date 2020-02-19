import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <div>
      <h3>This is Home</h3>
      <div>
        <h5>We are Logo! Plan your next trip with ease!</h5>
      </div>
      <div>
        <Link to='/trips'>
          <button className='home-start-button'>Start Here!</button>
        </Link>
      </div>
    </div>
  );
}