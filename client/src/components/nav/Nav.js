import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'

export default function() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">LOGO</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/trips">Get Started</Nav.Link>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
        <Nav.Link href="/login">Log In</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>


      </Nav>

    </Navbar>

    // <nav className="container-fullwidth">
    //   <Link to='/'>
    //     <h3>Logo</h3>
    //   </Link>
    //   <ul className="nav-links">
    //     <Link to='/about'>
    //       <li>About</li>
    //     </Link>
    //     <Link to='/trips'>
    //       <li>Get Started</li>
    //     </Link>
    //     <Link to='/signup'>
    //       <li>Sign Up</li>
    //     </Link>
    //     <Link to='/login'>
    //       <li>Log In</li>
    //     </Link>
    //   </ul>
    // </nav>
  );
}