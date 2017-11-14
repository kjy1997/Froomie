import { Mongo } from 'meteor/mongo';

export const Users = Meteor.users;

Users.schema = new SimpleSchema({
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    age: {type: Number},
    gender: {type: String},
    email: {type: String},
    likes: {type: [Number]},
    dislikes: {type: [Number]},
    about: {type: String},
    profilePicture: {type: String},
    socialMediaLinks: {type: [Object]},
});

Users.allow({
    update: function(userId, doc, fieldNames, modifier) {
        return true;
    }
});