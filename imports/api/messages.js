import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

Messages.schema = new SimpleSchema({
	sender: {type: String},
	to: {type: String},
	body: {type: String},
	unread: {type: Boolean}
});

Messages.allow({
		insert: function(userId, doc) {
					return true;
		}
});