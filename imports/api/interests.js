import { Mongo } from 'meteor/mongo';

export const Interests = new Mongo.Collection('interests');

Interests.schema = new SimpleSchema({
    username: {type: String},
    interests: {type: [String]}
});

Interests.allow({
    insert() { return true },
    update() { return true},
    remove() { return true}
})