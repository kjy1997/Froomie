import { Mongo } from 'meteor/mongo';

export const Tags = new Mongo.Collection('tags');

Tags.schema = new SimpleSchema({
    tagName: {type: String}
});