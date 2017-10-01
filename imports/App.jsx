import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import SignUpWithPlace from './SignUpWithPlace.jsx';
import SignUpWithoutPlace from './SignUpWithoutPlace.jsx';
import Home from './HomeLayout.jsx';
import Login from './Login.jsx';
import Registration from './Registration';

export default class App extends Component {

  render() {
    return (
       <Router>
       <div>
        <Route path="/home" component={Home}/>
        <Route path="/signupwithplace" component={SignUpWithPlace}/>
        <Route path="/signupwithoutplace" component={SignUpWithoutPlace}/>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        </div>
       </Router>
    );
  }
}
