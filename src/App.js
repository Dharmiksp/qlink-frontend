import React, { Component } from 'react';
import Signup from './Containers/signup/signup';
import Login from './Containers/login/login';
import Admin from './Containers/admin';
import Page from './Containers/page/page';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return(
      <Router> 
        {/* <Route path="/" component={Signup} exact />
        <Route path="/login" component={Login} exact /> */}
        <Route path="/admin" component={Admin} exact />
        <Route path="/qlink/:username" component={Page} exact />
      </Router> 
      // <Admin />    
    )
  }
}

export default App;