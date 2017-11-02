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
            ? <UserProfile user={user} isOwn={this.props.isOwn} />
            : <UserProfileNoPlace user={user} isOwn={this.props.isOwn} />
        }
      </div>
    );
  }

}

export default createContainer((route) => {
  // check if user is logged in and is accessing own page
  if (Meteor.user() && (route.match.path === '/profilemain' || route.match.url === '/user/' + Meteor.user().username))
    return { 
      user: Meteor.user(),
      isOwn: true
    };
  
  // accessing another user's page
  let name = route.match.params.username;
  return {
    user: Meteor.users.findOne({username: name}),
    isOwn: false
  };
}, UserProfileMain);



