import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserTags from './UserTags.jsx';
import EditProfileModal from './EditProfileModal.jsx';
import { Users } from './api/users.js';

export default class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.defaultZoom = 3;
    this.defaultCenter = {lat: 37, lng: -95};
    this.state = {
      isModalOpen: false
    }

    // TEMPORARY 
    if (!props.user.profile.hasOwnProperty('tags'))
      props.user["profile"]["tags"] = [];
  }

  handleContactSubmit(e) {
    e.preventDefault();

    let message = ReactDOM.findDOMNode(this.refs.contactForm).value;

    alert(message);
  }

  handleEdit(obj) {
    Users.update(Meteor.userId(), {
      $set: {
        "profile.firstName": obj.fname,
        "profile.lastName": obj.lname,
        "profile.about": obj.about,
        "profile.tags": obj.tags,
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
    this.geocodeAddress(obj.address);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  geocodeAddress(address) {
    this.geocoder.geocode({'address': address}, function handleResults(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        this.map.setZoom(16);
        this.map.setCenter(results[0].geometry.location);
        this.marker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
      }
      else {
        console.log("Map Error: " + status);
        this.map.setZoom(this.defaultZoom);
        this.map.setCenter(this.defaultCenter);
        if (this.marker)
          this.marker.setMap(null);
      }
    }.bind(this));
  }

  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: this.defaultZoom,
      center: this.defaultCenter
    });

    this.geocoder = new google.maps.Geocoder();
    this.geocodeAddress(this.props.user.profile.place.address);
  }

  render() {
    let user = this.props.user;

    console.log(user);

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
          tags={user.profile.tags}
          address={address}
          property={property}
          amenities={amenities}
          room={room}
          handleEdit={this.handleEdit.bind(this)}
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
              <UserTags tags={user.profile.tags}/>
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

              <div id="map"></div>
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



