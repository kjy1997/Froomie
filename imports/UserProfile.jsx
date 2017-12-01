import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserTags from './UserTags.jsx';
import EditProfileModal from './EditProfileModal.jsx';
import { Users } from './api/users.js';
import { Image } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Interests } from './api/interests.js';

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
        "profile.email": obj.email,
        "profile.about": obj.about,
        "profile.age": obj.age,
        "profile.gender": obj.gender,
        "profile.tags": obj.tags,
        "profile.social": obj.social,
        // property
        "profile.place.address": obj.address,
        "profile.place.property": obj.property,
        "profile.place.roomCount": obj.roomCount,
        "profile.place.bathroomCount": obj.bathroomCount,
        // amenities
        "profile.place.internet": obj.internet,
        "profile.place.parking": obj.parking,
        "profile.place.ac": obj.ac,
        // room
        "profile.place.rent": obj.rent,
        "profile.place.deposit": obj.deposit,
        "profile.place.roomType": obj.roomType,
        "profile.place.bathroomType": obj.bathroomType,
        "profile.place.furnishing": obj.furnishing,
        "profile.place.preferGender": obj.preferGender,
        // hidden
        "profile.visibility": obj.visibility,
        "profile.hidden": obj.hidden
      }
    });
    this.geocodeAddress(obj.address);
  }

  handleLike(likes, hasLiked) {
    let val = hasLiked ? -1 : 1;

    let profilesLiked = Meteor.user().profile.profilesLiked;
    // disliking
    if (hasLiked) {
      profilesLiked.splice(profilesLiked.indexOf(this.props.user.username), 1);
    }
    // liking
    else {
      profilesLiked.push(this.props.user.username);
    }
    
    Users.update(Meteor.userId(), {
      $set: {
        "profile.profilesLiked": profilesLiked
      }
    });

    hasLiked = !hasLiked;

    Users.update({ _id: this.props.user._id }, {
      $set: {
        "profile.profileLikes": likes + val
      }
    });
  }

  handleInterest(hasMatched) {
    if (hasMatched) {
      alert("You have already sent a match!");
      return;
    }
    let matches = Meteor.user().profile.matches;
    matches.push(this.props.user.username);
    // allow user to access your profile
    Users.update(Meteor.userId(), {
      $set: {
        "profile.matches": matches
      }
    });
    // send user your interest
    Users.update({ _id: this.props.user._id }, {
      $addToSet: {
        "profile.interests": Meteor.user().username
      }
    })
    alert("We notified " + this.props.user.username + " about your interest!");
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

  // handles hidden user info (display only)
  handleHidden(user) {
    // deep copy to prevent reference modification
    let show = JSON.parse(JSON.stringify(user));
    let showTemp = JSON.parse(JSON.stringify(user));
    let hide = show.profile.hidden;

    show.profile.age    = (hide && hide.hideAge != "nh") ? "Hidden" : showTemp.profile.age;
    show.profile.gender = (hide && hide.hideGender != "nh") ? "Hidden" : showTemp.profile.gender;
    show.profile.social = (hide && hide.hideSocial != "nh") ? "Hidden" : showTemp.profile.social;
    show.profile.tags   = (hide && hide.hideTags != "nh") ? "Hidden" : showTemp.profile.tags;
    show.profile.place.address  = (hide && hide.hideAddress != "nh") ? "Hidden" : showTemp.profile.place.address;
    show.profile.place.rent     = (hide && hide.hideRent != "nh") ? "Hidden" : "$" + showTemp.profile.place.rent;
    show.profile.place.deposit  = (hide && hide.hideDeposit != "nh") ? "Hidden" : "$" + showTemp.profile.place.deposit;

    let isMatch = this.props.user.profile.matches.indexOf(Meteor.user().username) != -1;
    if (isMatch) {
      show.profile.age = (hide && (hide.hideAge === "mh" || hide.hideAge === "nh")) ? showTemp.profile.age : "Hidden";
      show.profile.gender = (hide && (hide.hideGender === "mh" || hide.hideGender === "nh")) ? showTemp.profile.gender : "Hidden";
      show.profile.social = (hide && (hide.hideSocial === "mh" || hide.hideSocial === "nh")) ? showTemp.profile.social : "Hidden";
      show.profile.tags = (hide && (hide.hideTags === "mh" || hide.hideTags === "nh")) ? showTemp.profile.tags : "Hidden";
      show.profile.place.address = (hide && (hide.hideAddress === "mh" || hide.hideAddress === "nh")) ? showTemp.profile.place.address : "Hidden";
      show.profile.place.rent = (hide && (hide.hideRent === "mh" || hide.hideRent === "nh")) ? "$" + showTemp.profile.place.rent : "Hidden";
      show.profile.place.deposit = (hide && (hide.hideDeposit === "mh" || hide.hideDeposit === "nh")) ? "$" + showTemp.profile.place.deposit : "Hidden";
    }

    return show;
  }

  render() {
    let user = this.props.user;
    let address = user.profile.place.address;
    let profileLikes = user.profile.profileLikes;
    let hasLiked = Meteor.user().profile.profilesLiked.indexOf(user.username) != -1;
    let hasMatched = Meteor.user().profile.matches.indexOf(user.username) != -1;
    let property = {
      propertyType: user.profile.place.property,
      roomCount: user.profile.place.roomCount,
      bathroomCount: user.profile.place.bathroomCount,
    };
    let amenities = {
      internet: user.profile.place.internet,
      parking: user.profile.place.parking,
      ac: user.profile.place.ac
    };
    let room = {
      rent: user.profile.place.rent,
      deposit: user.profile.place.deposit,
      roomType: user.profile.place.roomType,
      bathroomType: user.profile.place.bathroomType,
      furnishing: user.profile.place.furnishing,
      preferGender: user.profile.place.preferGender
    };
    let hidden = {
      hideAge: (user.profile.hidden) ? user.profile.hidden.hideAge : null,
      hideGender: (user.profile.hidden) ? user.profile.hidden.hideGender : null,
      hideSocial: (user.profile.hidden) ? user.profile.hidden.hideSocial : null,
      hideTags: (user.profile.hidden) ? user.profile.hidden.hideTags : null,
      hideAddress: (user.profile.hidden) ? user.profile.hidden.hideAddress : null,
      hideRent: (user.profile.hidden) ? user.profile.hidden.hideRent : null,
      hideDeposit: (user.profile.hidden) ? user.profile.hidden.hideDeposit : null
    };
    let show = this.handleHidden(user);

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
                : null
            }
            {
              this.props.isOwn
                ? <div className="likesDisplay"><i className="fa fa-thumbs-up"></i> {profileLikes}</div>
                : null
            }
            {
              !this.props.isOwn 
                ? hasLiked
                  ? <button className="likeButton" onClick={this.handleLike.bind(this, profileLikes, hasLiked)}>Dislike <i className="fa fa-thumbs-up"></i> {profileLikes}</button>
                  : <button className="likeButton" onClick={this.handleLike.bind(this, profileLikes, hasLiked)}>Like <i className="fa fa-thumbs-up"></i> {profileLikes}</button>
                : null
            }
            <br />
            {
              !this.props.isOwn
                ? hasMatched
                  ? <button className="matchButton" onClick={this.handleInterest.bind(this, hasMatched)}>Match Sent</button>
                  : <button className="matchButton" onClick={this.handleInterest.bind(this, hasMatched)}>Send Match</button>
                : null
            }
            <div className="about">
              <h4>About me</h4>
              <p>Age: {show.profile.age}</p>
              <p>Gender: {show.profile.gender}</p>
              <h4>Introduction</h4>
              <p>{user.profile.about}</p>
              <UserTags tags={show.profile.tags} />

              <div className="profileSocialGallery">
                <a href={"http://www.facebook.com"} target="_blank"><img className="profileSocial" src={(this.props.isUserPath ? "../" : "./") + "socialmedia/logo_facebook.jpg"} alt="logo_facebook" /></a>
                <a href={"http://www.twitter.com"} target="_blank"><img className="profileSocial" src={(this.props.isUserPath ? "../" : "./")+ "socialmedia/logo_twitter.jpg"} alt="logo_twitter" /></a>
                <a href={"http://www.github.com"} target="_blank"><img className="profileSocial" src={(this.props.isUserPath ? "../" : "./") + "socialmedia/logo_github.jpg"} alt="logo_github" /></a>
                <a href={"http://www.linkedin.com"} target="_blank"><img className="profileSocial" src={(this.props.isUserPath ? "../" : "./") + "socialmedia/logo_linkedin.jpg"} alt="logo_linkedin" /></a>
              </div>

              <span className="socialSpan"><a href={"http://www." + user.profile.social} target="_blank">My Social Media</a></span>

              <h4>About my place</h4>
              <p>{show.profile.place.address}</p>

              <div className="profileHousingInfo">
                <div className="housingColumn">
                  <strong>Property Type <br /><p>{property.propertyType ? property.propertyType : "N/A"}</p></strong>
                  <strong>Room Count <br /><p>{property.roomCount ? property.roomCount : 0}</p></strong>
                  <strong>Bathroom Count <br /><p>{property.bathroomCount ? property.bathroomCount : 0}</p></strong>
                </div>
                <div className="housingColumn">
                  <strong>Internet <br /><p>{amenities.internet === 'yes' ? "yes" : "no"}</p></strong>
                  <strong>Parking <br /><p>{amenities.parking === 'yes' ? "yes" : "no"}</p></strong>
                  <strong>A/C <br /><p>{amenities.ac === 'yes' ? "yes" : "no"}</p></strong>
                </div>
                <div className="housingColumn">
                  <strong>Rent <br /><p>{show.profile.place.rent}</p></strong>
                  <strong>Deposit <br /><p>{show.profile.place.deposit}</p></strong>
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

          <div className="comment-section">
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