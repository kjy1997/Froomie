import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserProfileNoPlace extends Component {
  constructor() {
    super();
    this.state = {
      // temp 
      data: "I'm passionate about animals and music. Loves travel and food",
    }
  }

  // temporary fake json data
  getUserData() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/users',
      dataType: 'json',
      cache: false,
      success: function(data) {
        var user = data[1];
        this.setState(
          {
            id:     user.id,
            name:   user.name
          }, function() {
          console.log(user);
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  componentDidMount() {
    this.getUserData();
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

UserProfileNoPlace.propTypes = {
  id:     PropTypes.number,
  name:   PropTypes.string,
  data:   PropTypes.string
}



