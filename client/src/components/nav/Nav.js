import React, { useEffect, useState } from 'react';
import './Nav.css';
import SigninButton from '../signinbutton';
import SignoutButton from '../signoutbutton';
import UserButton from '../userbutton';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Logo from "../../images/trip_planner_logo.png"




export default function(props) {
  let history = useHistory();

  const handleLogoutClick = () => {
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
      .then(res => {
        console.log(res, 'res after logout');
        props.handleLogout();
        history.push('/');
      }).catch(err => {
        console.log('logout error: ', err);
      });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Link to='/'>
          <Image src={Logo} fluid width="90px" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="nav-option" href="/trips">Get Started</Nav.Link>
          <Nav.Link className="nav-option" href="/about">About Us</Nav.Link>
          <Nav.Link className="nav-option" href="/signup">Sign Up</Nav.Link>
        </Nav>
        {(() => {
            switch (props.loggedInStatus) {
              case 'LOGGED_IN':
                return (
                  <>
                    <Nav >
                      <UserButton userName={props.appState.user.name} />
                    </Nav>
                    <Nav >
                      <SignoutButton logout={handleLogoutClick} />
                    </Nav>
                  </>
                );
              case 'NOT_LOGGED_IN':
                return (
                  <Nav >
                    <SigninButton />
                  </Nav>);
              default:
                return null;
            }
        })()}
      </Navbar.Collapse>
    </Navbar>
  );
}