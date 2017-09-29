import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import SignUpWithPlace from './SignUpWithPlace.jsx';
import Home from './HomeLayout.jsx';
import Login from './Login.jsx';
import Registration from './Registration';
import UserProfile from './UserProfile.jsx';
import UserProfileNoPlace from './UserProfileNoPlace.jsx';

export default class App extends Component {

  render() {
    return (
       <Router>
       <div>
        <Route path="/home" component={Home}/>
        <Route path="/signupwithplace" component={SignUpWithPlace}/>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/profilenoplace" component={UserProfileNoPlace} />
        </div>
       </Router>
    );
  }
}