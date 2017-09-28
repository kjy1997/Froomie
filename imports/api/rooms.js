import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

Rooms.schema = new SimpleSchema({
    rent: {type: Number},
    deposit: {type: Number},
    roomType: {type: String},
    furnished: {type: Boolean},
    bathroom: {type: String}
});