import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserTags from './UserTags.jsx';
import EditProfileModalNoPlace from './EditProfileModalNoPlace.jsx';
import { Users } from './api/users.js';
import { Image } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

import Navbar from './Navbar.jsx';

class UserProfileNoPlace extends TrackerReact(Component) {

  constructor(props) {
    super(props);
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
        // stay
        "profile.budget": obj.budget,
        "profile.moveInDate": obj.moveInDate,
        "profile.stayLength": obj.stayLength,
        // hidden
        "profile.hidden": obj.hidden
      }
    });
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

  componentDidMount() {
    let self = this;

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
        }
      );
    });
  }

  renderImagePreview(useravatar) {
    if (useravatar)
      return <Image src={avatar.baseURL + "/md5/" + useravatar.md5} circle className="avatar"/>
  }

  // handles hidden user info (display only)
  handleHidden(user) {
    // deep copy to prevent reference modification
    let show = JSON.parse(JSON.stringify(user));
    let hide = show.profile.hidden;

    show.profile.age = hide.hideAge ? "Hidden" : show.profile.age;
    show.profile.gender = hide.hideGender ? "Hidden" : show.profile.gender;
    show.profile.social = hide.hideSocial ? "Hidden" : show.profile.social;
    show.profile.tags = hide.hideTags ? "Hidden" : show.profile.tags;
    show.profile.budget = hide.hideBudget ? "Hidden" : "$" + show.profile.budget;
    show.profile.moveInDate = hide.hideMoveInDate ? "Hidden" : show.profile.moveInDate;
    show.profile.stayLength = hide.hideStayLength ? "Hidden" : show.profile.stayLength;

    return show;
  }

  render() {
    let user = this.props.user;
    let profileLikes = user.profile.profileLikes;
    let stay = {
      budget: user.profile.budget,
      moveInDate: user.profile.moveInDate,
      stayLength: user.profile.stayLength
    };
    let hidden = {
      hideAge: user.profile.hidden.hideAge,
      hideGender: user.profile.hidden.hideGender,
      hideSocial: user.profile.hidden.hideSocial,
      hideTags: user.profile.hidden.hideTags,
      hideBudget: user.profile.hidden.hideBudget,
      hideMoveInDate: user.profile.hidden.hideMoveInDate,
      hideStayLength: user.profile.hidden.hideStayLength
    };
    let show = this.handleHidden(user);

    return (
      <div className="profile-container">
        <EditProfileModalNoPlace
          profile={user.profile}
          stay={stay}
          handleEdit={this.handleEdit.bind(this)}
          isOpen={this.state.isModalOpen} 
          onClose={this.closeModal.bind(this)}
        />
        <Navbar plain={false} />
        
        <div className="user-back">
        <div className="user-pic fileBrowse">
            {this.renderImagePreview(Session.get('avatar'))}
          </div>
        </div>
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
              : <button className="likeButton" onClick={this.handleLike.bind(this, profileLikes)}>Like <i className="fa fa-thumbs-up"></i> {profileLikes}</button>
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

            <div className="profileHousingInfo">
              <div className="housingColumn housingSingle">
                <strong>Budget<br /><p>{show.profile.budget}</p></strong>
                <strong>Move In Date<br /><p>{show.profile.moveInDate}</p></strong>
                <strong>Stay Length<br /><p>{show.profile.stayLength}</p></strong>
              </div>
            </div>  
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
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('avatar', setUserAvatar());
  function setUserAvatar() {
    let useravatar = avatar.findOne({ "metadata.owner": Meteor.userId() }, { sort: { uploadDate: -1 } });
    Session.set('avatar', useravatar);
  }
	return {

	};
}, UserProfileNoPlace);