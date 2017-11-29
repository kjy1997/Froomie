import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EmptyPage extends Component {

  handleRedirect() {
    window.location.replace("/home");
  }
    
  render() {
    return (
        <div className="emptyPage">
            <div className="emptyPageReturn">
            <h1>404</h1>
            <p>Page Not Found!</p>
            <button onClick={this.handleRedirect}>Home</button>
          </div>
        </div> 
    );
  }
    
}