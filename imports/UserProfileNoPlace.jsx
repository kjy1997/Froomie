import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserTags from './UserTags.jsx';
import EditProfileModalNoPlace from './EditProfileModalNoPlace.jsx';
import { Users } from './api/users.js';

export default class UserProfileNoPlace extends Component {

  constructor(props) {
    super(props);
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
        // stay
        "profile.budget": obj.budget,
        "profile.moveindate": obj.moveindate,
        "profile.lengthofstay": obj.lengthofstay
      }
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

    let stay = {
      budget: user.profile.budget,
      moveindate: user.profile.moveindate,
      lengthofstay: user.profile.lengthofstay
    }

    return (
      <div className="profile-container">
        <EditProfileModalNoPlace
          fname={user.profile.firstName} 
          lname={user.profile.lastName}
          about={user.profile.about} 
          tags={user.profile.tags}
          stay={stay}
          handleEdit={this.handleEdit.bind(this)}
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
          <h2>{user.profile.firstName + " " + user.profile.lastName}</h2>
          <button onClick={this.openModal.bind(this)}>Edit</button>
          <div className="about">
            <h4>About me</h4>
            <p>{user.profile.about}</p>
            <UserTags tags={user.profile.tags}/>  

            <div className="profileHousingInfo">
              <div className="housingColumn housingSingle">
                <strong>Budget<br/><p>${stay.budget}</p></strong>
                <strong>Move In Date<br/><p>{stay.moveindate}</p></strong>
                <strong>Stay Length<br/><p>{stay.lengthofstay}</p></strong>
              </div>
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


