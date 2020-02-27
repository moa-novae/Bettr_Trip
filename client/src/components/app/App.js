import React, { Component } from 'react';
import axios from "axios";
import './App.scss';
import Content from '../content';
import Nav from '../nav';
import Home from '../home';
import About from '../about';
import Login from '../login';
import Trip from '../trip';
import Signup from '../signup';
import Profile from '../profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}, 
      trip: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleTrip = this.handleTrip.bind(this);
  }

  checkLoginStatus() {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
    .then(res => {
      console.log("logged in? ", res);
      console.log("userrrrrr", res.data.user);
      if (res.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
        this.setState({
          loggedInStatus: 'LOGGED_IN',
          user: res.data.user
        })
      } else if (!res.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
        this.setState({
          loggedInStatus: 'NOT_LOGGED_IN', 
          user: {}
        })
      }
    }).catch(err => {
      console.log('check login error: ', err);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN', 
      user: {}
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data
    });
  }

  handleTrip(data) {
    this.setState({
      ...this.state, 
      trip: data
    });
    console.log(this.state, "current staaate");
  }

  render() {
    return (
      <Router>

        <div className="App">
        <div className="main">

        


            <Nav handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} appState={this.state} />

            <AnimatePresence exitBeforeEnter>
            <Switch>
              <Route path='/' exact render={props => (<Home {...props} loggedInStatus={this.state.loggedInStatus}/>)} />
              <Route path='/about' exact render={props => (<About {...props} loggedInStatus={this.state.loggedInStatus}/>)} />
              <Route path='/trips' exact render={props => (<Trip {...props} loggedInStatus={this.state.loggedInStatus} appState={this.state} handleTrip={this.handleTrip} />)} />
              <Route path='/login' exact render={props => (<Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>)} />
              <Route path='/signup' exact render={props => (<Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>)} />
              <Route path='/trips/:id' render={props => (<Content {...props} loggedInStatus={this.state.loggedInStatus} appState={this.state} />)} />
              <Route path='/profile' exact render={props => (<Profile {...props} loggedInStatus={this.state.loggedInStatus} appState={this.state} handleTrip={this.handleTrip} />)} />
            </Switch>
            </AnimatePresence>

        </div>
            


            {/* <Content /> */}
     

        </div>
      </Router>
    );
  }
}

export default App;
