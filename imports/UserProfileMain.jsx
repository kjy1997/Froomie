import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'react-meteor-data';

import UserProfile from './UserProfile.jsx';
import UserProfileNoPlace from './UserProfileNoPlace.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class UserProfileMain extends TrackerReact(Component) {

  render() {
    Meteor.subscribe('allUsers');

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
          hasPlace 
            ? <UserProfile user={user} />
            : <UserProfileNoPlace user={user} />
        }
      </div>
    );
  }

}

export default createContainer((route) => {
  // check if user is logged in and is accessing own page
  if (Meteor.user() && route.match.path === '/profilemain')
    return { user: Meteor.user() };
  
  let name = route.match.params.username;
  return {
    user: Meteor.users.findOne({username: name})
  };
}, UserProfileMain);



