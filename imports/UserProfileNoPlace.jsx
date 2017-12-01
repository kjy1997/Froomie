import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserTags from './UserTags.jsx';
import EditProfileModalNoPlace from './EditProfileModalNoPlace.jsx';
import { Users } from './api/users.js';
import { Messages } from './api/messages.js';
import { Image, Button, Modal } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

import Navbar from './Navbar.jsx';

class UserProfileNoPlace extends TrackerReact(Component) {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      showModal: false
    }
  }

  handleContactSubmit(e) {
    e.preventDefault();
	
    let message = ReactDOM.findDOMNode(this.refs.contactForm).value;
	if(message) {
		let send = Meteor.user().username;	
		let recipient = this.props.user.username;
		
		Messages.insert({sender:send, to:recipient, body:message, unread:true});
		alert("Message sent!");
	}
	else{
		alert("No message written");
	}
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

  handleMatch(hasMatched) {
    if (hasMatched) {
      alert("You have already sent a match!");
      return;
    }
    let matches = Meteor.user().profile.matches;
    matches.push(this.props.user.username);
    Users.update(Meteor.userId(), {
      $set: {
        "profile.matches": matches
      }
    });
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
    let showTemp = JSON.parse(JSON.stringify(user));
    let hide = show.profile.hidden;

    show.profile.age    = (hide && hide.hideAge != "nh") ? "Hidden" : showTemp.profile.age;
    show.profile.gender = (hide && hide.hideGender != "nh") ? "Hidden" : showTemp.profile.gender;
    show.profile.social = (hide && hide.hideSocial != "nh") ? "Hidden" : showTemp.profile.social;
    show.profile.tags   = (hide && hide.hideTags != "nh") ? "Hidden" : showTemp.profile.tags;
    show.profile.budget = (hide && hide.hideBudget != "nh") ? "Hidden" : "$" + showTemp.profile.budget;
    show.profile.moveInDate = (hide && hide.hideMoveInDate != "nh") ? "Hidden" : showTemp.profile.moveInDate;
    show.profile.stayLength = (hide && hide.hideStayLength != "nh") ? "Hidden" : showTemp.profile.stayLength;

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

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }


  deleteAccount() {
    
    Meteor.users.remove({_id: Meteor.userId()});

  }

  render() {
    let user = this.props.user;
    let profileLikes = user.profile.profileLikes;
    let hasLiked = Meteor.user().profile.profilesLiked.indexOf(user.username) != -1;
    let hasMatched = Meteor.user().profile.matches.indexOf(user.username) != -1;
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
                  ? <button className="matchButton" onClick={this.handleMatch.bind(this, hasMatched)}>Match Sent</button>
                  : <button className="matchButton" onClick={this.handleMatch.bind(this, hasMatched)}>Send Match</button>
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

              <div className="profileHousingInfo">
                <div className="housingColumn housingSingle">
                  <strong>Budget<br /><p>{show.profile.budget}</p></strong>
                  <strong>Move In Date<br /><p>{show.profile.moveInDate}</p></strong>
                  <strong>Stay Length<br /><p>{show.profile.stayLength}</p></strong>
                </div>
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

        <div class="delete-class">
            <Button className="delete" type="submit" bsStyle="danger" onClick={this.open.bind(this)}>Delete Account</Button>
          </div>
          <div className="static-modal">
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete?
            </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close.bind(this)}>Close</Button>
                <Button bsStyle="danger" onClick={this.deleteAccount.bind(this)}>Delete</Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="comment-section">
            <Blaze template="commentsBox" id={this.props.user._id} />
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