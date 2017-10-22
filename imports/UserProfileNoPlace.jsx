import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserTags from './UserTags.jsx';
import EditProfileModalNoPlace from './EditProfileModalNoPlace.jsx';

export default class UserProfileNoPlace extends Component {

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

    console.log(message);
  }

  handleEdit(obj) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile.firstName": obj.fname,
        "profile.lastName": obj.lname,
        "profile.about": obj.about,
        // stay
        "profile.budget": obj.budget,
        "profile.moveindate": obj.moveindate,
        "profile.lengthofstay": obj.lengthofstay
      }
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
          tags={this.state.tags}
          stay={stay}
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
          <h2>{user.profile.firstName + " " + user.profile.lastName}</h2>
          <button onClick={this.openModal.bind(this)}>Edit</button>
          <div className="about">
            <h4>About me</h4>
            <p>{this.state.about}</p>
            <UserTags tags={this.state.tags}/>  

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


