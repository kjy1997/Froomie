import React, { Component } from 'react';

import { Mongo } from 'meteor/mongo';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      /* temporary info - switch to mongodb */
      name: "John Doe",
      data: "I'm passionate about animals and music. Loves travel and food"
    }
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          Froomie!
        </div>
        <div className="user-back">
          <div className="user-pic"></div>
        </div>
        <div className="user-info">
          <h3>{this.state.name}</h3>
          <p>{this.state.data}</p>
          <div className="about">
            <p>About me</p>
            <p>About my place</p>
          </div>
        </div>
        <div className="contact">
          <p>Contact Me</p>
          <form>
            <input type="text"/>
            <br/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default UserProfile;