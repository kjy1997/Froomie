import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import '../imports/api/users.js';
import '../imports/api/tags.js';
import '../imports/api/places.js';
import '../imports/api/rooms.js';
import '../imports/uploadpic/upload.js';

Meteor.startup(() => {
    Meteor.publish('allUsers', function() {
        return Meteor.users.find();
    });
});
