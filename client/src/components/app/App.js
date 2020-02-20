import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Content from '../content';
import Nav from '../nav';
import About from '../about';
import Login from '../login';
import Trip from '../trip';
import Signup from '../signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'; //for time picking material ui
import MomentUtils from '@date-io/moment';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data) // The entire response from the Rails API

        console.log(response.data.message) // Just the message
        this.setState({
          message: response.data.message
        });
      })
  }

  render() {
    return (
      <Router>
        <Nav />
        <Route path='/about' component={About} />
        <Route path='/trips' component={Trip} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <div className="App">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Content />
          </MuiPickersUtilsProvider>
        </div>
      </Router>
    );
  }
}

export default App;
