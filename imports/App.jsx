import React, { Component } from 'react';
import Home from './HomeLayout.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import SignUpWithPlace from './SignUpWithPlace.jsx';

export default class App extends Component {

  render() {
    return (
       <Router>
       <div>
        <Route path="/home" component={Home}/>
        <Route path="/signupwithplace" component={SignUpWithPlace}/>
        </div>
       </Router>
    );
  }
}
