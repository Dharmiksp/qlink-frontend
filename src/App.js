import React, { Component } from 'react';
import Signup from './Containers/signup/signup';
import Login from './Containers/login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return(
      <Router> 
        <Route path="/" component={Signup} exact />
        <Route path="/login" component={Login} exact />
      </Router>
     
    )
  }
}

export default App;