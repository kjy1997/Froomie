import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email';

import '../imports/api/users.js';
import '../imports/api/tags.js';
import '../imports/api/places.js';
import '../imports/api/rooms.js';
import '../imports/api/interests.js';
import '../imports/uploadpic/upload.js';
import {Messages} from '../imports/api/messages.js';


Meteor.startup(() => {
  Comments.config({
    rating: 'stars' // or null if no rating method should be used
  });
  Meteor.publish('allUsers', function () {
    return Meteor.users.find();
  });
  Meteor.publish('allMessages', function() {
	  return Messages.find();
  });
  Meteor.publish('allAvatars', function () {
    return Avatars.find();
  });
  Meteor.methods({
    'contact': function (from, to, content) {
      let emailOptions = {
        from: 'guochengwei170@gmail.com',
        to: to.emails[0].address,
        subject: 'Froomie Notification',
        html: `
        <p>Hi ${to.username}, ${from.username} just contacted you. Check out his/her profile <a href="http://localhost:3000/user/${from.username}">here</a><p>
        <p>Message: ${content}</p>
        `
      };
      Email.send(emailOptions);
    }
  });
  Meteor.users.allow({
    remove(userid) {
      return userid === Meteor.userId();
    }
  })
});
