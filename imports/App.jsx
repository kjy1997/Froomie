import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import SignUpWithPlace from './SignUpWithPlace.jsx';
import SignUpWithoutPlace from './SignUpWithoutPlace.jsx';
import Search from './Search.jsx';
import Home from './HomeLayout.jsx';
import Login from './Login.jsx';
import Registration from './Registration';
import UserProfileMain from './UserProfileMain.jsx';
import UpdateWithPlace from './UpdateWithPlace.jsx';
import UpdateWithoutPlace from './UpdateWithoutPlace.jsx';
import Profile from './Profile.jsx';

export default class App extends Component {

  render() {
    return (
       <Router>
       <div>
        <Route path="/home" component={Home}/>
        <Route path="/signupwithplace" component={SignUpWithPlace}/>
        <Route path="/signupwithoutplace" component={SignUpWithoutPlace}/>
        <Route path="/search" component={Search}/>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/profilemain" component={UserProfileMain} />
        <Route path="/updatewithplace" component={UpdateWithPlace} />
        <Route path="/updatewithoutplace" component={UpdateWithoutPlace} />
        </div>
       </Router>
    );
  }
}