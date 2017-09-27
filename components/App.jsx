import React, { Component } from 'react';

import UserProfile from './UserProfile.jsx';

export default class App extends Component {
  render() {
    return (
        <div className="container">
          <UserProfile />
        </div>
    );
  }
}