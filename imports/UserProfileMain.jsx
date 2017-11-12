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

    if (user) {
      hasPlace = user.profile.hasOwnProperty('place');

      // Profile likes - check if profile is new
      if (!user.profile.hasOwnProperty('profileLikes')) {
        console.log("new account");
        user.profile.profileLikes = 0;
      }

      console.log(user);
    }
    else {
      console.log("User is null");
      return null;
    }

    return (
      <div>
        {
          hasPlace 
            ? <UserProfile isUserPath={this.props.isUserPath} user={user} isOwn={this.props.isOwn} />
            : <UserProfileNoPlace isUserPath={this.props.isUserPath} user={user} isOwn={this.props.isOwn} />
        }
      </div>
    );
  }

}

export default createContainer((route) => {
  // check if user is logged in and is accessing own page
  if (Meteor.user())
    if (route.match.path === '/profilemain')
      return {
        isUserPath: false,
        user: Meteor.user(),
        isOwn: true
      };
    else if (route.match.url === '/user/' + Meteor.user().username)
      return {
        isUserPath: true,
        user: Meteor.user(),
        isOwn: true
      };
  // accessing another user's page
  let name = route.match.params.username;
  return {
    isUserPath: true,
    user: Meteor.users.findOne({username: name}),
    isOwn: false
  };
}, UserProfileMain);



