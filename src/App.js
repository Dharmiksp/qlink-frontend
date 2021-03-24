import React, { Component } from 'react';
import Signup from './Containers/signup/signup';
import Login from './Containers/login/login';
import Aux from './hoc/Aux';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return(
     <Login />
    )
  }
}

export default App;