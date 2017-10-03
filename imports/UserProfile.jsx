import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import ProfileMapMarker from './ProfileMapMarker.jsx';
import UserTags from './UserTags.jsx';
import EditProfileModal from './EditProfileModal.jsx';
import { Mongo } from 'meteor/mongo';

export default class UserProfile extends Component {
  static defaultProps = {
    // default U.S
    center: {lat: 37, lng: -95},
    zoom: 1
  }

  constructor() {
    super();
    this.state = {
      // temp
      data: "I'm passionate about animals and music. Loves travel and food",
      address: {},
      center: {},
      tags: [
        'Adventurous',
        'Extrovert',
        'Well-Organized',
        'Friendly',
        'Athletic',
        'Dynamic',
        'Reliable'
      ],
      isModalOpen: false
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
            address:  user.address,
            center:    {
              lat: Number(user.address.geo.lat),
              lng: Number(user.address.geo.lng)
            }
          }, function() {
          console.log(user);
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleEdit(obj) {
    this.setState({
      name: obj.name,
      data: obj.about,
      address: obj.address
    });
  }

  handleTagEdit(obj) {
    this.setState({
      tags: obj,
    })
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    var p = this.state.address;
    return (
      <div className="profile-container">
        <EditProfileModal 
          name={this.state.name} 
          about={this.state.data} 
          tags={this.state.tags}
          address={this.state.address}
          handleEdit={this.handleEdit.bind(this)}
          handleAddTag={this.handleTagEdit.bind(this)}
          handleRemoveTag={this.handleTagEdit.bind(this)}
          isOpen={this.state.isModalOpen} 
          onClose={this.closeModal.bind(this)}
        />
        <div className="header">
          Froomie!
        </div>
        <div className="user-back">
          <div className="user-pic"></div>
        </div>
        <div className="user-info">
          <h2>{this.state.name}</h2>
          <button onClick={this.openModal.bind(this)}>Edit</button>
          <div className="about">
            <h4>About me</h4>
            <p>{this.state.data}</p>
            <UserTags tags={this.state.tags}/>
            <div className="line-split"></div>
            <h4>About my place</h4>
            <p>{p.street}, {p.city} {p.zipcode}, {p.suite}</p>
            <div className="map">
              <GoogleMapReact 
                center={this.state.center} 
                defaultZoom={this.props.zoom}>
                <ProfileMapMarker
                  lat={this.state.center.lat}
                  lng={this.state.center.lng}
                  text={'My Place'}
                />
              </GoogleMapReact>
            </div>
          </div>
        </div>
        <div className="line-split"></div>
        <div className="contact">
          <h4>Contact Me</h4>
          <form onSubmit={this.handleSubmit}>
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
  data:   PropTypes.string,
  place:  PropTypes.object
}



