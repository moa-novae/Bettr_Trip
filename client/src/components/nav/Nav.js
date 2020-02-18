import React from 'react';
import './Nav.css';

export default function() {
  return (
    <nav>
      <h3>Logo</h3>
      <ul className="nav-links">
        <li>About</li>
        <li>Get Started</li>
        <li>Sign Up</li>
        <li>Log In</li>
      </ul>
    </nav>
  );
}