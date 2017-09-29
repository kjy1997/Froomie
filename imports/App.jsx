import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import SignUpWithPlace from './SignUpWithPlace.jsx';
<<<<<<< HEAD
import UserProfile from './UserProfile.jsx';
import UserProfileNoPlace from './UserProfileNoPlace.jsx';
=======
import Home from './HomeLayout.jsx';
import Login from './Login.jsx';
import Registration from './Registration';
>>>>>>> ba9820d0f42f2c3423be567439291f02f7a8a529

export default class App extends Component {

  render() {
    return (
       <Router>
       <div>
        <Route path="/home" component={Home}/>
        <Route path="/signupwithplace" component={SignUpWithPlace}/>
<<<<<<< HEAD
        <Route path="/profile" component={UserProfile}/>
        <Route path="/profilenoplace" component={UserProfileNoPlace}/>
=======
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
>>>>>>> ba9820d0f42f2c3423be567439291f02f7a8a529
        </div>
       </Router>
    );
  }
}
