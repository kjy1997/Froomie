import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserTags from './UserTags.jsx';
import EditProfileModal from './EditProfileModal.jsx';
import { Users } from './api/users.js';
import { Image } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

import Navbar from './Navbar.jsx';

class UserProfile extends TrackerReact(Component) {

  constructor(props) {
    super(props);
    this.defaultZoom = 3;
    this.defaultCenter = { lat: 37, lng: -95 };
    this.state = {
      isModalOpen: false
    }
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
        "profile.age": obj.age,
        "profile.gender": obj.gender,
        "profile.tags": obj.tags,
        "profile.social": obj.social,
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
        "profile.place.preferGender": obj.preferGender
      }
    });
    this.geocodeAddress(obj.address);
  }

  handleLike(likes) {
    Users.update({ _id: this.props.user._id }, {
      $set: {
        "profile.profileLikes": likes + 1
      }
    })
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  geocodeAddress(address) {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {
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
    let self = this;

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: this.defaultZoom,
      center: this.defaultCenter
    });

    this.geocoder = new google.maps.Geocoder();
    this.geocodeAddress(this.props.user.profile.place.address);

    avatar.resumable.assignBrowse($(".fileBrowse"));

    avatar.resumable.on('fileAdded', function (file) {

      // Create a new file in the file collection to upload
      avatar.insert({
        _id: file.uniqueIdentifier,  // This is the ID resumable will use
        filename: file.fileName,
        contentType: file.file.type
      },
        function (err, _id) {  // Callback to .insert
          if (err) { return console.error("File creation failed!", err); }
          // Once the file exists on the server, start uploading
          avatar.resumable.upload();

          let avatarUrl = avatar.baseURL + "/" + _id;
          Meteor.users.update({ _id: Meteor.userId()}, { $set: { 'profile.avatar': avatarUrl } });
        }
      );
    });

  }


  renderImagePreview() {
    return <Image src={this.props.user.profile.avatar} circle className="avatar"/>
  }

  render() {
    let user = this.props.user;
    let address = user.profile.place.address;
    let profileLikes = user.profile.profileLikes;
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
      preferGender: user.profile.place.preferGender
    };

    return (
      <div className="profile-container">
        <EditProfileModal
          profile={user.profile}
          address={address}
          property={property}
          amenities={amenities}
          room={room}
          handleEdit={this.handleEdit.bind(this)}
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal.bind(this)}
        />
        <Navbar plain={false} /> 
        <div className="user-back">
          <div className="user-pic fileBrowse">
            {this.renderImagePreview()}
          </div>
        </div>
        <div className="info-container">
          <div className="user-info">
            <h2>{user.profile.firstName + " " + user.profile.lastName}</h2>
            {
              this.props.isOwn
                ? <button onClick={this.openModal.bind(this)}>Edit <i className="fa fa-pencil-square-o"></i></button>
                : <button onClick={this.handleLike.bind(this, profileLikes)}>Like <i className="fa fa-thumbs-up"></i> {profileLikes}</button>
            }
            <div className="about">
              <h4>About me</h4>
              <p>Age: {user.profile.age}</p>
              <p>Gender: {user.profile.gender}</p>
              <h4>Introduction</h4>
              <p>{user.profile.about}</p>
              <UserTags tags={user.profile.tags} />

              <div className="profileSocialGallery">
                <a href={"http://www.facebook.com"} target="_blank"><img className="profileSocial" src={(this.props.isUserPath ? "../" : "./") + "socialmedia/logo_facebook.jpg"} alt="logo_facebook" /></a>
                <a href={"http://www.twitter.com"} target="_blank"><img className="profileSocial" src={(this.props.isUserPath ? "../" : "./")+ "socialmedia/logo_twitter.jpg"} alt="logo_twitter" /></a>
                <a href={"http://www.github.com"} target="_blank"><img className="profileSocial" src={(this.props.isUserPath ? "../" : "./") + "socialmedia/logo_github.jpg"} alt="logo_github" /></a>
                <a href={"http://www.linkedin.com"} target="_blank"><img className="profileSocial" src={(this.props.isUserPath ? "../" : "./") + "socialmedia/logo_linkedin.jpg"} alt="logo_linkedin" /></a>
              </div>

              <a href={"http://www." + user.profile.social} target="_blank">My Social Media</a>

              <div className="line-split"></div>

              <h4>About my place</h4>
              <p>{address}</p>

              <div className="profileHousingInfo">
                <div className="housingColumn">
                  <strong>Property Type <br /><p>{property.propertyType ? property.propertyType : "N/A"}</p></strong>
                  <strong>Room Count <br /><p>{property.roomCount ? property.roomCount : 0}</p></strong>
                  <strong>Bathroom Count <br /><p>{property.roomCount ? property.roomCount : 0}</p></strong>
                </div>
                <div className="housingColumn">
                  <strong>Internet <br /><p>{amenities.internet === 'yes' ? "yes" : "no"}</p></strong>
                  <strong>Parking <br /><p>{amenities.parking === 'yes' ? "yes" : "no"}</p></strong>
                  <strong>A/C <br /><p>{amenities.ac === 'yes' ? "yes" : "no"}</p></strong>
                </div>
                <div className="housingColumn">
                  <strong>Rent <br /><p>${room.rent}</p></strong>
                  <strong>Deposit <br /><p>${room.deposit}</p></strong>
                  <strong>Room Type <br /><p>{room.roomType ? room.roomType : "N/A"}</p></strong>
                  <strong>Bathroom Type <br /><p>{room.bathroomType ? room.bathroomType : "N/A"}</p></strong>
                  <strong>Furnishing <br /><p>{room.furnishing ? room.furnishing : "N/A"}</p></strong>
                  <strong>Preferred Gender <br /><p>{room.preferGender ? room.preferGender : "N/A"}</p></strong>
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
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>

          <div class="comment-section">
            <Blaze template="commentsBox" id={this.props.user._id} />
          </div>

        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('avatar');

	return {

	};
}, UserProfile);