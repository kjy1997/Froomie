import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'react-meteor-data';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmptyPage extends TrackerReact(Component) {

  handleRedirect() {
    window.location.replace("/home");
  }
    
  render() {
    return (
        <div className="emptyPage">
            <div className="emptyPageReturn">
            <h1>404</h1>
            <p>Page Not Found!</p>
            <button onClick={this.handleRedirect.bind(this)}>Home</button>
          </div>
        </div> 
    );
  }
    
}