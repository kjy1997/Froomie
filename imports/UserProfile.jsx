import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import ProfileMapMarker from './ProfileMapMarker.jsx';
import UserTags from './UserTags.jsx';
import EditProfileModal from './EditProfileModal.jsx';

export default class UserProfile extends Component {

  static defaultProps = {
    // default U.S
    center: {lat: 37, lng: -95},
    zoom: 1
  }

  constructor() {
    super();
    this.state = {
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

  handleContactSubmit(e) {
    e.preventDefault();

    let message = ReactDOM.findDOMNode(this.refs.contactForm).value;

    alert(message);
  }

  handleEdit(obj) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile.firstName": obj.fname,
        "profile.lastName": obj.lname,
        "profile.about": obj.about,
        // property
        "profile.place.address": obj.address,
        "profile.place.property": obj.property,
        // amenities
        "profile.place.internet": obj.internet,
        "profile.place.parking": obj.parking,
        "profile.place.ac": obj.ac,
        // room
        "profile.place.rent": obj.rent,
        "profile.place.deposit": obj.deposit,
        "profile.place.roomtype": obj.roomType,
        "profile.place.bathroomType": obj.bathroomType,
        "profile.place.furnishing": obj.furnishing,
        "profile.place.preferGender": obj.genderPref
      }
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

  render() {
    let user = this.props.user;

    let address = user.profile.place.address;
    let property = {
      propertyType: user.profile.place.property,
      roomCount: user.profile.place.rooms,
      bathroomCount: user.profile.place.bathroom,
    };
    let amenities = {
      internet: user.profile.place.internet,
      parking: user.profile.place.parking,
      ac: user.profile.place.ac
    };
    let room = {
      rent: user.profile.place.rent,
      deposit: user.profile.place.deposit,
      roomType: user.profile.place.roomtype,
      bathroomType: user.profile.place.bathroomType,
      furnishing: user.profile.place.furnishing,
      genderPref: user.profile.place.preferGender
    };
  
    return (
      <div className="profile-container">
        <EditProfileModal 
          fname={user.profile.firstName} 
          lname={user.profile.lastName}
          about={user.profile.about} 
          tags={this.state.tags}
          address={address}
          property={property}
          amenities={amenities}
          room={room}
          handleEdit={this.handleEdit.bind(this)}
          handleTagEdit={this.handleTagEdit.bind(this)}
          isOpen={this.state.isModalOpen} 
          onClose={this.closeModal.bind(this)}
        />
        <div className="header">
          <h1>Froomie!</h1>
        </div>
        <div className="user-back">
          <div className="user-pic"></div>
        </div>
        <div className="info-container">
          <div className="user-info">
            <h2>{user.profile.firstName + " " + user.profile.lastName}</h2>
            <button onClick={this.openModal.bind(this)}>Edit</button>
            <div className="about">
              <h4>About me</h4>
              <p>{user.profile.about}</p>
              <UserTags tags={this.state.tags}/>
              <div className="line-split"></div>

              <h4>About my place</h4>
              <p>{address}</p>

              <div className="profileHousingInfo">
                <div className="housingColumn">
                  <strong>Property Type <br/><p>{property.propertyType ? property.propertyType : "N/A"}</p></strong>
                  <strong>Room Count <br/><p>{property.roomCount ? property.roomCount : 0}</p></strong>
                  <strong>Bathroom Count <br/><p>{property.roomCount ? property.roomCount : 0}</p></strong>
                </div>
                <div className="housingColumn">
                  <strong>Internet <br/><p>{amenities.internet === 'yes' ? "yes" : "no"}</p></strong>
                  <strong>Parking <br/><p>{amenities.parking === 'yes' ? "yes" : "no"}</p></strong>
                  <strong>A/C <br/><p>{amenities.ac === 'yes' ? "yes" : "no"}</p></strong>
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
                  center={this.props.center} 
                  defaultZoom={this.props.zoom}>
                  <ProfileMapMarker
                    lat={this.props.center.lat}
                    lng={this.props.center.lng}
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
      </div>
    );
  }
}



