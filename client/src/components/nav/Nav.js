import React, { useEffect, useState } from 'react';
import './Nav.css';
import SigninButton from '../signinbutton';
import SignoutButton from '../signoutbutton';
import UserButton from '../userbutton';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import axios from 'axios';



export default function(props) {

  const handleLogoutClick = () => {
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
    .then(res => {
      console.log(res, 'res after logout');
      props.handleLogout();
    }).catch(err => {
      console.log('logout error: ', err);
    });
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to='/'>LOGO</Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to='/about'>
          <NavItem>About</NavItem>
        </LinkContainer>
        <LinkContainer to='/trips'>
          <NavItem>Get Started</NavItem>
        </LinkContainer>
        <LinkContainer to='/signup'>
          <NavItem>Sign Up</NavItem>
        </LinkContainer>
      </Nav>
      {(() => {
        switch (props.loggedInStatus) {
          case 'LOGGED_IN':
            return [
            <UserButton />, 
            <SignoutButton logout={handleLogoutClick} />
            ];
          case 'NOT_LOGGED_IN':
            return <SigninButton />;
          default:
            return null;
        }
      })()}
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