import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

Messages.schema = new SimpleSchema({
	date: {type: Date},
	from: {type: String},
	to: {type: String},
	subject: {type: String},
	body: {type: String},
	unread: {type: Boolean}
});