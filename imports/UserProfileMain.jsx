import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'react-meteor-data';

import UserProfile from './UserProfile.jsx';
import UserProfileNoPlace from './UserProfileNoPlace.jsx';

class UserProfileMain extends Component {

  render() {
    let user = this.props.user;
    let hasPlace;

    if (user)
      hasPlace = user.profile.hasOwnProperty('place');
    else {
      console.log("User is null");
      return null;
    }

    return (
      <div>
        {
          hasPlace ?
          <UserProfile user={user} />
          :
          <UserProfileNoPlace user={user} />
        }
      </div>
    );
  }

}

export default createContainer(() => {
  return {
    user: Meteor.user()
  };
}, UserProfileMain);



