import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import { Mongo } from 'meteor/mongo';

class UserProfile extends Component {
  static defaultProps = {
    // default U.S
    center: {lat: 37, lng: -95},
    zoom: 1
  }

  constructor() {
    super();
    this.state = {
      // temporary info - switch to mongodb
      data: "I'm passionate about animals and music. Loves travel and food",
      place: {},
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
            name:   user.name,
            email:  user.email,
            web:    user.website,
            place:  user.address,
            center:    {
              lat: Number(user.address.geo.lat),
              lng: Number(user.address.geo.lng)
            },
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
    var p = this.state.place;
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
            <p>{this.state.id} {p.street}, {p.city} {p.zipcode}, {p.suite}</p>
            <div className="map">
              <GoogleMapReact center={this.state.center} defaultZoom={this.props.zoom}>
              </GoogleMapReact>
            </div>
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

UserProfile.propTypes = {
  id:     PropTypes.number,
  name:   PropTypes.string,
  place:  PropTypes.object,
  geo:    PropTypes.object
}

export default UserProfile;



