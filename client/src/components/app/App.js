import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import Content from '../content';
// import Content from '../content.js';
import Nav from '../nav';
import Home from '../home';
import About from '../about';
import Login from '../login';
import Trip from '../trip';
import Signup from '../signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


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

        <div className="App">
          <div className="main">




            <Nav />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/about' exact component={About} />
              <Route path='/trips' exact component={Trip} />
              <Route path='/login' exact component={Login} />
              <Route path='/signup' exact component={Signup} />
              <Route path='/trips/:id' component={Content} />
            </Switch>

          </div>



          {/* <Content /> */}


        </div>
      </Router>
    );
  }
}

export default App;
