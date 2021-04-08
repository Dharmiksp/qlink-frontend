import React, { Component } from 'react';
import Signup from './Containers/signup/signup';
import Login from './Containers/login/login';
import Admin from './Containers/admin';
import Page from './Containers/page/Page';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return(
      <Router>
        <Switch>
        <Route path="/" component={Signup} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/admin/:id" component={Admin} exact/>
        <Route path="/qlink/:username" component={Page} exact/>
        </Switch>
      </Router>
    )
  }
}

export default App;
