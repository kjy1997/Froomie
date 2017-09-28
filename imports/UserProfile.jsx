import React, { Component } from 'react';

import { Mongo } from 'meteor/mongo';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      /* temporary info - switch to mongodb */
      name: "John Doe",
      data: "I'm passionate about animals and music. Loves travel and food",
      place: "123 Apple Lane"
    }
  }

  render() {
    return (
      <div className="profile-container">
        <div className="header">
          Froomie!
        </div>
        <div className="user-back">
          <div className="user-pic"></div>
        </div>
        <div className="user-info">
          <h2>{this.state.name}</h2>
          <div className="about">
            <h4>About me</h4>
            <p>{this.state.data}</p>
            <h4>About my place</h4>
            <p>{this.state.place}</p>
          </div>
        </div>
        <div className="contact">
          <h4>Contact Me</h4>
          <form>
            <textarea className="contact-subject"></textarea>
            <br/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default UserProfile;



