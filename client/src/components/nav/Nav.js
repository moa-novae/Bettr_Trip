import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <nav>
      <Link to='/'>
        <h3>Logo</h3>
      </Link>
      <ul className="nav-links">
        <Link to='/about'>
          <li>About</li>
        </Link>
        <Link to='/trips'>
          <li>Get Started</li>
        </Link>
        <Link to='/signup'>
          <li>Sign Up</li>
        </Link>
        <Link to='/login'>
          <li>Log In</li>
        </Link>
      </ul>
    </nav>
  );
}