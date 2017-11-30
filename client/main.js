import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Bootstrap from '../client/css/bootstrap/bootstrap.css';
import '../imports/uploadpic/upload.js';

import App from '../imports/App.jsx';

Meteor.startup(() => {
  Meteor.subscribe('avatar', Meteor.userId());

  Comments.ui.config({
    template: 'bootstrap', // or ionic, semantic-ui
    generateAvatar: function (user, isAnonymous) {
      if (user.profile.avatar) {
        return user.profile.avatar;
      }
    }
  });
  Comments.config({
    rating: 'stars' // or null if no rating method should be used
  });
  render(<App />, document.getElementById('main-app'));
});
