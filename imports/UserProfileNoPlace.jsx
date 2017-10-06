import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import UserTags from './UserTags.jsx';
import EditProfileModalNoPlace from './EditProfileModalNoPlace.jsx';

export default class UserProfileNoPlace extends Component {
  constructor() {
    super();
    this.state = {
      // temp 
      about: "I'm passionate about animals and music. Loves travel and food",
      stay: {
        budget: 0,
        moveIn: "",
        stayLength: ""
      },
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
          name:   user.name
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
      stay: obj.stay
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
    let stay = this.state.stay;

    return (
      <div className="profile-container">
        <EditProfileModalNoPlace
          name={this.state.name} 
          about={this.state.about} 
          tags={this.state.tags}
          stay={this.state.stay}
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
            <p>{this.state.about}</p>
            <UserTags tags={this.state.tags}/>  

            <div className="profileHousingInfo">
              <div className="housingColumn housingSingle">
                <strong>Budget<br/><p>${stay.budget}</p></strong>
                <strong>Move In Date<br/><p>{stay.moveInDate ? stay.moveInDate : "N/A"}</p></strong>
                <strong>Stay Length<br/><p>{stay.stayLength ? stay.stayLength : "N/A"}</p></strong>
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

UserProfileNoPlace.propTypes = {
  id:     PropTypes.number,
  name:   PropTypes.string,
  about:   PropTypes.string
}



