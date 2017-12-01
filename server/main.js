import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import '../imports/api/users.js';
import '../imports/api/tags.js';
import '../imports/api/places.js';
import '../imports/api/rooms.js';
import '../imports/uploadpic/upload.js';
import {Messages} from '../imports/api/messages.js';


Meteor.startup(() => {
  Comments.config({
    rating: 'stars' // or null if no rating method should be used
  });
  Meteor.publish('allUsers', function() {
    return Meteor.users.find();
  });
  Meteor.publish('allMessages', function() {
	return Messages.find();
  });
});
