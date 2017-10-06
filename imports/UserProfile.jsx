import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { Button } from 'react-bootstrap';

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
      about: "I'm passionate about animals and music. Loves travel and food",
      address: {},
      property: {
        propertyType: "",
        roomCount: 0,
        bathroomCount: 0
      },
      amenities: {
        internet: false,
        parking: false,
        ac: false
      },
      room: {
        rent: 0,
        deposit: 0,
        roomType: "",
        bathroomType: "",
        furnishing: "",
        genderPref: ""
      },
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

  // temporary fake json data - switch to MongoDB collections
  getUserData() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/users',
      dataType: 'json',
      cache: false,
      success: function(data) {
        var user = data[1];
        this.setState({
            id:     user.id,
            name:   user.name,
            address:  user.address,
            center:    {
              lat: Number(user.address.geo.lat),
              lng: Number(user.address.geo.lng)
            }
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  handleContactSubmit(e) {
    e.preventDefault();

    let message = ReactDOM.findDOMNode(this.refs.contactForm).value;

    console.log(message);
  }

  handleEdit(obj) {
    this.setState({
      name: obj.name,
      about: obj.about,
      address: obj.address,
      property: obj.property,
      amenities: obj.amenities,
      room: obj.room
    });
  }

  handleTagEdit(obj) {
    this.setState({
      tags: obj,
    });
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
    let address = this.state.address;
    let property = this.state.property;
    let amenities = this.state.amenities;
    let room = this.state.room;

    return (
      <div className="profile-container">
        <EditProfileModal 
          name={this.state.name} 
          about={this.state.about} 
          tags={this.state.tags}
          address={this.state.address}
          property={this.state.property}
          amenities={this.state.amenities}
          room={this.state.room}
          handleEdit={this.handleEdit.bind(this)}
          handleTagEdit={this.handleTagEdit.bind(this)}
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
            <p>{this.state.about}</p>
            <UserTags tags={this.state.tags}/>
            <div className="line-split"></div>

            <h4>About my place</h4>
            <p>{address.street}, {address.city} {address.zipcode}, {address.suite}</p>

            <div className="profileHousingInfo">
              <div className="housingColumn">
                <strong>Property Type <br/><p>{property.propertyType ? property.propertyType : "N/A"}</p></strong>
                <strong>Room Count <br/><p>{property.roomCount}</p></strong>
                <strong>Bathroom Count <br/><p>{property.bathroomCount}</p></strong>
              </div>
              <div className="housingColumn">
                <strong>Internet <br/><p>{amenities.internet ? "yes" : "no"}</p></strong>
                <strong>Parking <br/><p>{amenities.parking ? "yes" : "no"}</p></strong>
                <strong>A/C <br/><p>{amenities.ac ? "yes" : "no"}</p></strong>
              </div>
              <div className="housingColumn">
                <strong>Rent <br/><p>${room.rent}</p></strong>
                <strong>Deposit <br/><p>${room.deposit}</p></strong>
                <strong>Room Type <br/><p>{room.roomType ? room.roomType : "N/A"}</p></strong>
                <strong>Bathroom Type <br/><p>{room.bathroomType ? room.bathroomType : "N/A"}</p></strong>
                <strong>Furnishing <br/><p>{room.furnishing ? room.furnishing : "N/A"}</p></strong>
                <strong>Preferred Gender <br/><p>{room.genderPref ? room.genderPref : "N/A"}</p></strong>
              </div>
            </div>

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
          <form onSubmit={this.handleContactSubmit.bind(this)}>
            <textarea className="contact-subject" ref="contactForm"></textarea>
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
  about:   PropTypes.string,
  address:  PropTypes.object
}



